<template>
  <main>
    <section>
      <div>
        <h2>Expense</h2>
        <AddExpense
          :addNewExpense="addNewExpense"
          :arrayCurrencies="arrayCurrencies(currencies)"
          :deleteExpense="deleteExpense"
          :editExpense="dataToEdit"
          :methodsPayment="methodsPayment"
          :typeOfExpense="typeOfExpense"
          :cleanEdit="cleanEdit"
        />
      </div>
      <section>
        <ExpensesList
          :expenses="expenses"
          :editExpense="editExpense"
          :deleteExpense="deleteExpense"
        />
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
    const dataToEdit = ref<Wallet>();
    return { currencies, methodsPayment, typeOfExpense, expenses, dataToEdit };
  },
  methods: {
    arrayCurrencies(data: Currencies): string[] {
      return Object.keys(data).map((currency) => currency.slice(0, 3));
    },
    idGenerator() {
      return this.expenses.length.toString();
    },
    addNewExpense(expense: Wallet) {
      if (expense.id === "") {
        this.expenses = [
          ...this.expenses,
          { ...expense, id: this.idGenerator() },
        ];
      } else {
        this.expenses = [
          ...this.expenses.filter(({ id }) => id !== expense.id),
          expense,
        ];
      }
    },
    editExpense(expenseId: string) {
      const data = this.expenses.find(({ id }) => id === expenseId);
      if (data) this.dataToEdit = data;
    },
    deleteExpense(expenseId: string) {
      this.expenses = this.expenses.filter(({ id }) => id !== expenseId);
    },
    cleanEdit(resetState: Wallet) {
      this.dataToEdit = resetState;
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
