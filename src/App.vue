<template>
  <div id="app">
    <TransactionList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TransactionList from "./components/TransactionList/TransactionsList.vue";

export default defineComponent({
  components: {
    TransactionList,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 24px;
}
</style>
