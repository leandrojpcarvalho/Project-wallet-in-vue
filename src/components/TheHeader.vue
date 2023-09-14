<template>
  <header>
    <h2 v-if="loggedUser">
      Welcome, <span>{{ loggedUser.name }}</span>
    </h2>
    <div>
      <h3>Current Balance</h3>
      <button @click="showBalance">
        <span v-if="loggedUser && isVisible">
          R$ {{ formatToFinancial(loggedUser.currentBalance) }}
        </span>
        <div v-else class="img"></div>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { Login, User } from "@/types/Wallet";
import { PropType, defineComponent, ref } from "vue";
import { formatToFinancial } from "@/utils";

export default defineComponent({
  setup() {
    const user = ref<User>();
    return {
      user,
    };
  },
  data() {
    return {
      isVisible: false,
      formatToFinancial,
    };
  },
  props: {
    loggedUser: {
      require: true,
      type: Object as PropType<Login>,
    },
  },
  methods: {
    showBalance() {
      this.isVisible = !this.isVisible;
    },
  },
  mounted() {
    if (this.loggedUser) {
      this.user = {
        name: this.loggedUser.name,
        currentBalance: this.loggedUser.currentBalance,
      };
    }
  },
});
</script>

<style>
header {
  display: flex;
  height: 150px;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  min-width: 320px;
  background-color: rgba(255, 228, 196, 0.381);
  border-radius: 10px;
  box-shadow: 1px 2px 2px gray;
  & > h2 {
    font-size: 1.5rem;
    > span {
      font-size: 1.5rem;
      color: #fc9d00e0;
      text-transform: capitalize;
    }
  }
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    > button {
      border-radius: 5px;
      box-shadow: 1px 1px 1px darkgray;
      height: fit-content;
      padding: 0 10px;
      border: none;
      background-color: transparent;
      font-size: 1.2rem;
      color: #fc9d00e0;
      cursor: pointer;
      font-weight: bolder;
    }
  }
}

.img {
  height: 25px;
  width: 25px;
  background-image: url("../assets/icons/hide.png");
  background-position: center;
  background-size: contain;
}
</style>
