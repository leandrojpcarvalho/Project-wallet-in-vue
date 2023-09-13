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
            <th>Value Converted</th>
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
            <td>{{ expense.description }}</td>
            <td class="column-to-hide">{{ expense.method }}</td>
            <td class="column-to-hide">{{ expense.type }}</td>
            <td class="column-to-hide">{{ expense.currency }}</td>
            <td class="column-to-hide">{{ expense.value?.toFixed(2) }}</td>
            <td v-if="expense.value">
              {{
                (
                  expense.value *
                  Number(expense.currencies[expense.currency.concat("BRL")].ask)
                ).toFixed(2)
              }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th :colspan="widthScreen.columnSpanTotal">Total</th>
            <th :colspan="widthScreen.columnSpanValue">
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
import { PropType, computed, defineComponent, ref } from "vue";

export default defineComponent({
  created() {
    window.addEventListener("resize", this.resizeWidth);
  },
  data() {
    const widthRef = ref<number>(0);
    const widthScreen = computed(() => {
      if (widthRef.value > 566) {
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
    return { widthRef, widthScreen };
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
      return expenses
        .reduce((total, currExpense) => {
          const { currency, value, currencies } = currExpense;
          if (value) {
            total += value * Number(currencies[currency.concat("BRL")].ask);
          }
          return total;
        }, 0)
        .toFixed(2);
    },
    resizeWidth(event: any) {
      this.widthRef = event.currentTarget.innerWidth;
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
@media screen and (max-width: 566px) {
  section {
    width: 311px;
  }
}

.column-to-hide {
  @media screen and (max-width: 566px) {
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

@media screen and (min-width: 786px) {
  * {
    font-size: 1.2rem;
  }
}
</style>
