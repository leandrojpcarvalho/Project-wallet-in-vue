<template>
  <TheHeader :user="user" />
  <main>
    <section>
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
import { Currencies, User, Wallet } from "./types/Wallet";
import AddExpense from "./components/AddExpense.vue";
import ExpensesList from "./components/ExpensesList.vue";
import TheHeader from "./components/TheHeader.vue";

export default defineComponent({
  name: "App",
  components: { AddExpense, ExpensesList, TheHeader },
  data() {
    const user = ref<User>();
    const currencies = ref<Currencies>({});
    const methodsPayment = ref<string[]>(["credit card", "debit card", "cash"]);
    const typeOfExpense = ref<string[]>(["health", "food", "leisure"]);
    const expenses = ref<Wallet[]>([]);
    const dataToEdit = ref<Wallet>();

    return {
      currencies,
      methodsPayment,
      typeOfExpense,
      expenses,
      dataToEdit,
      user,
    };
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
      this.updateServer();
    },
    editExpense(expenseId: string) {
      const data = this.expenses.find(({ id }) => id === expenseId);
      if (data) this.dataToEdit = data;
      this.updateServer();
    },
    deleteExpense(expenseId: string) {
      this.expenses = this.expenses.filter(({ id }) => id !== expenseId);
      this.updateServer();
    },
    cleanEdit(resetState: Wallet) {
      this.dataToEdit = resetState;
    },
    updateServer() {
      const data = {
        expenses: this.expenses,
        user: this.user,
      };
      Object.keys(data).forEach((key) => {
        const dataToStorage = JSON.stringify(data[key as keyof typeof data]);
        localStorage.setItem(key, dataToStorage);
      });
    },
  },
  beforeMount() {
    fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
      .then((res) => res.json())
      .then((data) => (this.currencies = data));
    let userInfoServerRequest = localStorage.getItem("user");
    let expenseStored = localStorage.getItem("expenses");
    if (userInfoServerRequest && expenseStored) {
      userInfoServerRequest = JSON.parse(userInfoServerRequest);
      expenseStored = JSON.parse(expenseStored);
    }
    this.user = { name: "Yoshi", currentBalance: 100000000 };
    this.expenses = (expenseStored || []) as unknown as Wallet[];
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
