import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchTransactions, processTransaction } from '../services/transactionService';
import { Transaction } from '../services/types';

export const useTransactionStore = defineStore('transactionStore', () => {
  const userBalance = ref(1000);
  const transactions = ref<Transaction[]>([]);
  const filteredTransactions = ref<Transaction[]>([]);
  const originalBalance = ref(0);
  const errorMessage = ref('');

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      transactions.value = data;
      filteredTransactions.value = [...data];
    } catch (error) {
      errorMessage.value = 'Failed to load transactions!';
    }
  };

  const startTransactions = async () => {
    originalBalance.value = userBalance.value;
    errorMessage.value = '';
    try {
      for (const transaction of filteredTransactions.value) {
        await processTransaction(transaction);
        userBalance.value += transaction.amount;
      }
    } catch {
      errorMessage.value = 'Transaction failed! Reverting all transactions...';
      rollbackTransactions();
    }
  };

  const rollbackTransactions = () => {
    userBalance.value = originalBalance.value;
  };

  const filterTransactions = (filterType: string) => {
    console.log('Filtering with type:', filterType); // Лог для отладки
    if (filterType === 'income') {
      filteredTransactions.value = transactions.value.filter(t => t.amount > 0);
    } else if (filterType === 'expense') {
      filteredTransactions.value = transactions.value.filter(t => t.amount < 0);
    } else if (filterType === 'failed') {
      filteredTransactions.value = transactions.value.filter(t => !t.success);
    } else {
      filteredTransactions.value = [...transactions.value]; 
    }
    console.log('Filtered Transactions:', filteredTransactions.value); // Лог отфильтрованных данных
  };

  const sortTransactionsByDate = (order: string) => {
    filteredTransactions.value.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  return {
    userBalance,
    transactions: computed(() => filteredTransactions.value),
    errorMessage,
    loadTransactions,
    startTransactions,
    filterTransactions,
    sortTransactionsByDate,
    rollbackTransactions,
  };
});