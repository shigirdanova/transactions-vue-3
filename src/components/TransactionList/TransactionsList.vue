<template>
  <div class="container">
    <h2 class="title">Your Transactions</h2>
    <TransactionFilter />
    <p v-if="!store.transactions.length">No transactions to display.</p>
    <ul v-else>
      <li
        v-for="(transaction, index) in store.transactions"
        :key="index"
        :class="getClass(transaction)"
      >
        <strong>{{ transaction.description }}</strong
        >: {{ formatCurrency(transaction.amount) }}
        <br />
        <small>{{ new Date(transaction.date).toLocaleString() }}</small>
      </li>
    </ul>
    <button class="button" @click="startTransactions">
      Start Transactions
    </button>
    <p v-if="store.errorMessage" class="error">{{ store.errorMessage }}</p>
    <p class="balance">Current Balance: {{ store.userBalance }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import TransactionFilter from "../TransactionFilter/TransactionFilter.vue";
import { useTransactionStore } from "../../store/transactionStore";

export default defineComponent({
  components: {
    TransactionFilter,
  },
  setup() {
    const store = useTransactionStore();

    onMounted(() => {
      store.loadTransactions();
    });

    const { startTransactions } = store;

    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    };

    const getClass = (transaction: {
      success: boolean;
      amount: number;
    }): Record<string, boolean> => ({
      successful: transaction.success && transaction.amount > 0,
      unsuccessful: !transaction.success,
      expense: transaction.success && transaction.amount < 0,
    });

    return {
      store,
      getClass,
      startTransactions,
      formatCurrency,
    };
  },
});
</script>

<style scoped src="./TransactionList.css"></style>
