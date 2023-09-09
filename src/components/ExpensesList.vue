<template>
  <div>
    <section>
      <table v-if="expenses && expenses.length > 0">
        <thead>
          <tr>
            <th>Description</th>
            <th>Value</th>
            <th>Payment Method</th>
            <th>Type of expense</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id">
            <td>{{ expense.description }}</td>
            <td>{{ expense.value }}</td>
            <td>{{ expense.method }}</td>
            <td>{{ expense.type }}</td>
            <td>{{ expense.currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>
              {{
                expenses.reduce(
                  (total, currExpense) => (total += currExpense.value || 0),
                  0
                )
              }}
            </th>
          </tr>
        </tfoot>
      </table>
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
