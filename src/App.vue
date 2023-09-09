<template>
  <header>{{ console.log(this) }}</header>
  <main>
    <section>
      <div>
        <h2>Expense</h2>
        <AddExpense
          :addNewExpense="addNewExpense"
          :arrayCurrencies="arrayCurrencies(currencies)"
          :methodsPayment="methodsPayment"
          :typeOfExpense="typeOfExpense"
        />
      </div>
      <section>
        <ExpensesList :expenses="expenses" :editExpense="editExpense" />
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Currencies, Wallet } from "./types/Wallet";
import AddExpense from "./components/AddExpense.vue";
import ExpensesList from "./components/ExpensesList.vue";

export default defineComponent({
  name: "App",
  components: { AddExpense, ExpensesList },
  data() {
    const currencies = ref<Currencies>({
      USDBRL: {
        code: "USD",
        codein: "BRL",
        name: "Dólar Americano/Real Brasileiro",
        ask: "4.9892",
      },
      EURBRL: {
        code: "EUR",
        codein: "BRL",
        name: "Euro/Real Brasileiro",
        ask: "5.3351",
      },
      BTCBRL: {
        code: "BTC",
        codein: "BRL",
        name: "Bitcoin/Real Brasileiro",
        ask: "129449",
      },
    });
    const methodsPayment = ref<string[]>(["credit card", "debit card", "cash"]);
    const typeOfExpense = ref<string[]>(["health", "food", "leisure"]);
    const expenses = ref<Wallet[]>([]);
    return { currencies, methodsPayment, typeOfExpense, expenses };
  },
  methods: {
    arrayCurrencies(data: Currencies): string[] {
      return Object.keys(data).map((currency) => currency.slice(0, 3));
    },
    idGenerator() {
      return this.expenses.length.toString();
    },
    addNewExpense(expense: Wallet) {
      this.expenses = [
        ...this.expenses,
        { ...expense, id: this.idGenerator() },
      ];
    },
    editExpense(expenseId: string) {
      return this.expenses.find(({ id }) => id === expenseId);
    },
  },
});
</script>

<style>
form {
  width: auto;
}
.expense-details {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: max-content;
}
</style>
