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
            <th>Payment Method</th>
            <th>Type of expense</th>
            <th>Currency</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id">
            <td v-if="editExpense">
              <button @click.prevent="editExpense(expense.id)">Edit</button>
            </td>
            <td v-if="deleteExpense">
              <button @click.prevent="deleteExpense(expense.id)">Delete</button>
            </td>
            <td>{{ expense.description }}</td>
            <td>{{ expense.method }}</td>
            <td>{{ expense.type }}</td>
            <td>{{ expense.currency }}</td>
            <td>{{ expense.value?.toFixed(2) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="6">Total</th>
            <th>
              {{
                expenses
                  .reduce(
                    (total, currExpense) => (total += currExpense.value || 0),
                    0
                  )
                  .toFixed(2)
              }}
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
import { PropType, defineComponent } from "vue";

export default defineComponent({
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
});
</script>
