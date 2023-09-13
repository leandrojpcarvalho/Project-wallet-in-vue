<template>
  <div class="expense">
    <form @submit.prevent>
      <div class="expense-details">
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          v-model="expense.description"
          placeholder="add a description"
        />
        <label for="value">Value</label>
        <input
          id="value"
          type="number"
          v-model="expense.value"
          placeholder="expense cost"
        />
        <label for="currency">Currency</label>
        <select id="currency" v-model="expense.currency">
          <option value="" disabled selected>Select Currency</option>
          <option
            v-for="(currency, index) in arrayCurrencies"
            :key="index"
            :value="currency"
          >
            {{ currency }}
          </option>
        </select>
        <label for="method">Method</label>
        <select id="method" v-model="expense.method">
          <option value="" disabled selected>Select Method</option>
          <option
            v-for="(method, index) in methodsPayment"
            :key="index"
            :value="method"
          >
            {{ method }}
          </option>
        </select>
        <label for="type">Type</label>
        <select id="type" v-model="expense.type">
          <option value="" disabled selected>Select Type</option>
          <option
            v-for="(expenseType, index) in typeOfExpense"
            :key="index"
            :value="expenseType"
          >
            {{ expenseType }}
          </option>
        </select>
      </div>
      <button class="button" v-if="isEdit" @click.prevent="editFom(expense)">
        Edit Expense
      </button>
      <button class="button" v-else @click.prevent="sendForm()">
        Add expense
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Wallet } from "@/types/Wallet";
import { defineComponent, ref, PropType, computed } from "vue";

const INITIAL_STATE = {
  description: "",
  currency: "",
  id: "",
  method: "",
  type: "",
  value: null,
} as Wallet;

export default defineComponent({
  props: {
    arrayCurrencies: {
      require: true,
      type: Array as PropType<string[]>,
    },
    methodsPayment: {
      require: true,
      type: Array as PropType<string[]>,
    },
    typeOfExpense: {
      require: true,
      type: Array as PropType<string[]>,
    },
    addNewExpense: {
      require: true,
      type: Function,
    },
    editExpense: {
      require: false,
      type: Object as PropType<Wallet>,
    },
    deleteExpense: {
      require: true,
      type: Function,
    },
    cleanEdit: {
      require: true,
      type: Function,
    },
    isLoading: {
      require: true,
      type: Boolean,
    },
  },
  setup(props) {
    let expense = ref<Wallet>(INITIAL_STATE);
    let isEdit = ref<boolean>(false);
    isEdit = computed(() => {
      if (props.editExpense && props.editExpense !== INITIAL_STATE) {
        return true;
      }
      return false;
    });
    expense = computed(() => {
      if (props.editExpense) {
        return { ...props.editExpense };
      }
      return INITIAL_STATE;
    });

    return { expense, isEdit };
  },
  emits: ["closeAddExpense", "closeEditExpense"],
  methods: {
    async sendForm() {
      if (this.addNewExpense) {
        this.expense.currencies = await this.newFetch();
        this.addNewExpense({ ...this.expense });
        Object.keys(this.expense).forEach((key) => {
          const field = key as keyof Wallet;
          if (field === "value") {
            this.expense[field] = null;
          } else if (field !== "currencies") {
            this.expense[field] = "";
          }
        });
      } else {
        throw new Error("AddExpense isn't defined");
      }
      this.$emit("closeAddExpense", false);
    },
    editFom(expense: Wallet) {
      if (this.addNewExpense && this.cleanEdit) {
        this.addNewExpense(expense);
        this.cleanEdit();
      }
      this.$emit("closeEditExpense", false);
    },
    async newFetch() {
      return fetch(
        "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
      )
        .then((res) => res.json())
        .then((data) => data);
    },
  },
});
</script>

<style scoped>
.expense {
  font-family: "Courier New", Courier, monospace;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid #fc9b0021;
  border-radius: 10px;
  padding: 20px;
  > form {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      > label {
        font-weight: 700;
        @media screen and (max-width: 400px) {
          display: none;
        }
      }
      > input,
      select {
        font-family: "Courier New", Courier, monospace;
        text-align: center;
        font-weight: 500;
        font-size: 1rem;
        padding: 5px 3px;
        border: 3px solid transparent;
        box-shadow: 1px 2px 2px gray;
        border-radius: 5px;
        background-color: #8080800d;
        &:hover {
          border: 3px solid #fc9b0021;
        }
        &:focus-visible {
          outline: 3px solid #fc9b00;
        }
        @media screen and (max-width: 400px) {
          margin: 7px 0;
        }
      }
    }
    > button {
      font-family: "Courier New", Courier, monospace;
      text-align: center;
      font-weight: bolder;
      font-size: 1rem;
      padding: 5px 3px;
      border: none;
      box-shadow: 1px 2px 2px gray;
      border-radius: 5px;
      background-color: #ffe4c461;
      cursor: pointer;
      &:hover {
        background-color: #fc9d00e0;
      }
    }
  }
  .button {
    width: 100%;
    max-width: 320px;
    margin: 10px;
    padding: 10px;
    color: white;
    font-family: "Courier New", Courier, monospace;
    text-align: center;
    font-weight: bolder;
    font-size: 1rem;
    padding: 5px 3px;
    border: none;
    box-shadow: 1px 2px 2px gray;
    border-radius: 5px;
    background-color: #2c2c2c;
    cursor: pointer;
  }
  .expense-details {
    display: flex;
    flex-direction: column;
  }
}
</style>
