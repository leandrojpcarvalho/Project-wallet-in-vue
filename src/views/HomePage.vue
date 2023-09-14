<template>
  <TheHeader :user="user" :loggedUser="loggedUser" />
  <main>
    <button @click.prevent="showAddExpense(true)">Add new Expense</button>
    <section v-if="isAddExpense">
      <ModalLayer
        @closeAddExpense="showAddExpense"
        @closeEditExpense="showEditExpense"
      >
        <h2>Add</h2>
        <AddExpense
          :addNewExpense="addNewExpense"
          :arrayCurrencies="arrayCurrencies(currencies)"
          :deleteExpense="deleteExpense"
          :editExpense="dataToEdit"
          :methodsPayment="methodsPayment"
          :typeOfExpense="typeOfExpense"
          :cleanEdit="cleanEdit"
          @closeAddExpense="showAddExpense"
        />
      </ModalLayer>
    </section>
    <section v-if="isEditExpense">
      <ModalLayer @closeEditExpense="showEditExpense">
        <h2>Edit</h2>
        <AddExpense
          :addNewExpense="addNewExpense"
          :arrayCurrencies="arrayCurrencies(currencies)"
          :deleteExpense="deleteExpense"
          :editExpense="dataToEdit"
          :methodsPayment="methodsPayment"
          :typeOfExpense="typeOfExpense"
          :cleanEdit="cleanEdit"
          @closeEditExpense="showEditExpense"
        />
      </ModalLayer>
    </section>
    <section>
      <ExpensesList
        :expenses="user?.expenses"
        :editExpense="editExpense"
        :deleteExpense="deleteExpense"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from "vue";
import { Currencies, Wallet, Login } from "../types/Wallet";
import AddExpense from "../components/AddExpense.vue";
import ExpensesList from "../components/ExpensesList.vue";
import TheHeader from "../components/TheHeader.vue";
import ModalLayer from "../components/ModalLayer.vue";

const INITIAL_STATE = {
  currentBalance: 0,
  expenses: [],
  id: 0,
  name: "",
  password: "",
};

export default defineComponent({
  name: "App",
  components: { AddExpense, ExpensesList, TheHeader, ModalLayer },
  props: {
    loggedUser: {
      require: true,
      type: Object as PropType<Login>,
    },
  },
  data() {
    const user = ref<Login>(INITIAL_STATE);
    const currencies = ref<Currencies>({});
    const methodsPayment = ref<string[]>(["credit card", "debit card", "cash"]);
    const typeOfExpense = ref<string[]>(["health", "food", "leisure"]);
    const dataToEdit = ref<Wallet>();
    return {
      currencies,
      methodsPayment,
      typeOfExpense,
      dataToEdit,
      user,
      isAddExpense: false,
      isEditExpense: false,
    };
  },
  methods: {
    arrayCurrencies(data: Currencies): string[] {
      return Object.keys(data).map((currency) => currency.slice(0, 3));
    },
    idGenerator() {
      return this.user.expenses.length.toString();
    },
    addNewExpense(expense: Wallet) {
      if (expense.id === "") {
        this.user.expenses = [
          ...this.user.expenses,
          { ...expense, id: this.idGenerator() },
        ];
      } else {
        this.user.expenses = [
          ...this.user.expenses.filter(({ id }) => id !== expense.id),
          expense,
        ];
      }
      this.updateServer();
    },
    editExpense(expenseId: string) {
      this.showEditExpense(true);
      const data = this.user.expenses.find(({ id }) => id === expenseId);
      if (data) this.dataToEdit = data;
      this.updateServer();
    },
    deleteExpense(expenseId: string) {
      this.user.expenses = this.user.expenses.filter(
        ({ id }) => id !== expenseId
      );
      this.updateServer();
    },
    cleanEdit(resetState: Wallet) {
      this.dataToEdit = resetState;
      this.dataToEdit = {} as Wallet;
    },
    updateServer() {
      const data = {
        expenses: this.user.expenses,
        user: this.user,
      };
      Object.keys(data).forEach((key) => {
        const dataToStorage = JSON.stringify(data[key as keyof typeof data]);
        localStorage.setItem(key, dataToStorage);
      });
    },
    showAddExpense(value: boolean) {
      this.isAddExpense = value;
    },
    showEditExpense(value: boolean) {
      this.isEditExpense = value;
      this.dataToEdit = undefined;
    },
  },
  updated() {
    this.$emit("userLogged", this.user.name);
  },
  beforeMount() {
    fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
      .then((res) => res.json())
      .then((data) => (this.currencies = data));
    this.user = this.loggedUser || INITIAL_STATE;
  },
});
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  max-width: 1200px;
  min-width: 320px;
  > section {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
  > button {
    width: 100%;
    max-width: 320px;
    margin: 40px 0;
    padding: 20px 10px;
    color: white;
    font-family: "Courier New", Courier, monospace;
    text-align: center;
    font-weight: bolder;
    font-size: 1.2rem;
    border: none;
    box-shadow: 1px 2px 2px gray;
    border-radius: 5px;
    background-color: #2c2c2c;
    cursor: pointer;
  }
}
</style>
