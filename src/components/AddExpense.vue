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
          <option
            v-for="(expenseType, index) in typeOfExpense"
            :key="index"
            :value="expenseType"
          >
            {{ expenseType }}
          </option>
        </select>
      </div>
      <button v-if="isEdit" @click.prevent="editFom(expense)">
        Edit Expense
      </button>
      <button v-else @click.prevent="sendForm()">Add expense</button>
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
  methods: {
    sendForm() {
      if (this.addNewExpense) {
        this.addNewExpense({ ...this.expense });
        Object.keys(this.expense).forEach((key) => {
          const field = key as keyof Wallet;
          if (field === "value") {
            this.expense[field] = null;
          } else {
            this.expense[field] = "";
          }
        });
      } else {
        throw new Error("AddExpense isn't defined");
      }
    },
    editFom(expense: Wallet) {
      if (this.addNewExpense && this.cleanEdit) {
        this.addNewExpense(expense);
        this.cleanEdit();
      }
    },
  },
});
</script>

<style scoped></style>
