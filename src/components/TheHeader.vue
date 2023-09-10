<template>
  <header>
    <h2 v-if="user">Welcome, {{ user.name }}</h2>
    <div>
      <h3>Current Balance</h3>
      <p v-if="user && isVisible">{{ user.currentBalance.toFixed(2) }}</p>
      <p v-else>*****</p>
      <button @click="showBalance">
        <span v-if="isVisible">Hide</span>
        <span v-else>Show</span>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { User } from "@/types/Wallet";
import { PropType, defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    user: {
      require: true,
      type: Object as PropType<User>,
    },
  },
  methods: {
    showBalance() {
      this.isVisible = !this.isVisible;
    },
  },
});
</script>
