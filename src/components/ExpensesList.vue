<template>
  <div>
    <section>
      <table v-if="expenses && expenses.length > 0">
        <thead>
          <tr>
            <th colspan="8">Expenses</th>
          </tr>
          <tr>
            <th colspan="2">Actions</th>
            <th>Description</th>
            <th class="column-to-hide">Payment Method</th>
            <th class="column-to-hide">Type of expense</th>
            <th class="column-to-hide">Currency</th>
            <th class="column-to-hide">Value</th>
            <th>Value Converted (BRL)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id">
            <td v-if="editExpense">
              <button class="button" @click.prevent="editExpense(expense.id)">
                Edit
              </button>
            </td>
            <td v-if="deleteExpense">
              <button class="button" @click.prevent="deleteExpense(expense.id)">
                Delete
              </button>
            </td>
            <td class="number">{{ expense.description }}</td>
            <td class="column-to-hide number">{{ expense.method }}</td>
            <td class="column-to-hide number">{{ expense.type }}</td>
            <td class="column-to-hide number">{{ expense.currency }}</td>
            <td class="column-to-hide number">
              {{ formatToFinancial(expense.value || 0) }}
            </td>
            <td v-if="expense.value" class="number">
              {{ valueConverted(expense, expense.value) }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th :colspan="widthScreen.columnSpanTotal">Total</th>
            <th :colspan="widthScreen.columnSpanValue" class="number">
              {{ total(expenses) }}
            </th>
          </tr>
        </tfoot>
      </table>
      <h3 v-else>No expenses to present</h3>
    </section>
  </div>
</template>

<script lang="ts">
import { Wallet } from "@/types/Wallet";
import { formatToFinancial } from "@/utils";
import { PropType, computed, defineComponent, ref } from "vue";

export default defineComponent({
  created() {
    window.addEventListener("resize", this.resizeWidth);
  },
  data() {
    const widthRef = ref<number>(window.innerWidth);
    const widthScreen = computed(() => {
      if (widthRef.value > 880) {
        return {
          columnSpanTotal: 6,
          columnSpanValue: 2,
        };
      }
      return {
        columnSpanTotal: 3,
        columnSpanValue: 1,
      };
    });

    return { widthRef, widthScreen, formatToFinancial };
  },
  props: {
    expenses: {
      require: true,
      type: Array as PropType<Wallet[]>,
    },
    editExpense: {
      require: true,
      type: Function,
    },
    deleteExpense: {
      require: true,
      type: Function,
    },
  },
  methods: {
    total(expenses: Wallet[]) {
      const value = expenses.reduce((total, currExpense) => {
        const { currency, value, currencies } = currExpense;
        if (value) {
          total += value * Number(currencies[currency.concat("BRL")].ask);
        }
        return total;
      }, 0);
      return formatToFinancial(value);
    },
    valueConverted(expense: Wallet, value: number) {
      const total =
        value * Number(expense.currencies[expense.currency.concat("BRL")].ask);
      return formatToFinancial(total);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resizeWidth(event: any) {
      this.widthRef = event.currentTarget.innerWidth;
    },
    handleClickSetClassHide(element: HTMLElement) {
      element.classList.add("hide");
    },
  },
});
</script>

<style>
section {
  overflow: hidden;
  text-align: center;
  text-transform: capitalize;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.8rem;
  min-width: 310px;
}
/* @media screen and (max-width: 880px) {
  section {
    width: 311px;
  }
} */

.column-to-hide {
  @media screen and (max-width: 880px) {
    display: none;
  }
}

.button {
  color: white;
  padding: 3px;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: #2c2c2c;
  cursor: pointer;
}

.number {
  font-size: 1rem;
}

th {
  background-color: white;
  padding: 8px;
}

td {
  padding: 7px;
  border: 2px solid transparent;
}

tr:nth-child(2n) {
  background-color: rgba(168, 168, 168, 0.581);
}

tr:hover {
  cursor: pointer;
  background-color: #fc9b0067;
  transition: 0.5s linear ease-in-out;
}

tr:active {
  background-color: #fc9b00e4;
  transition: 0.5s linear ease-in-out;
}

@media screen and (min-width: 880px) {
  * {
    font-family: "Courier New", Courier, monospace;
    font-size: 1.2rem;
  }
}
</style>
