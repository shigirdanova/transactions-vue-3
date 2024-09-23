<template>
  <div class="filter-container">
    <div>
      <label for="filter-type">Filter by:</label>
      <select id="filter-type" v-model="filterType" @change="applyFilter">
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
        <option value="failed">Failed</option>
      </select>
    </div>
    <div>
      <label for="sort-order">Sort by date:</label>
      <select id="sort-order" v-model="sortOrder" @change="applySort">
        <option value="asc">Oldest to Newest</option>
        <option value="desc">Newest to Oldest</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTransactionStore } from "../../store/transactionStore";

export default defineComponent({
  setup() {
    const store = useTransactionStore();
    const filterType = ref("all");
    const sortOrder = ref("asc");

    const applyFilter = () => {
      store.filterTransactions(filterType.value);
    };

    const applySort = () => {
      store.sortTransactionsByDate(sortOrder.value);
    };

    return {
      filterType,
      sortOrder,
      applyFilter,
      applySort,
    };
  },
});
</script>

<style scoped src="./TransactionFilter.css"></style>
