<template>
  <div class="backdrop">
    <div class="modal" @click.self="handleClick">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["closeAddExpense", "closeEditExpense"],
  methods: {
    handleClick() {
      this.$emit("closeAddExpense", false);
      this.$emit("closeEditExpense", false);
    },
  },
});
</script>

<style scoped>
.modal {
  margin: 5% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  @media screen and (max-width: 600px) {
    margin: 20% auto;
    width: 90%;
    height: 60%;
  }
  width: 70%;
  height: 70%;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.238);
  width: 100%;
  height: 100%;
}
</style>
