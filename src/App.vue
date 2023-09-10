<template>
  <router-view @loginRequest="login" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { User } from "./types/Wallet";
import router from "./router";

export default defineComponent({
  setup() {
    const loggedUser = ref<User>();
    const isLoading = ref<boolean>(false);
    return { loggedUser, isLoading };
  },
  methods: {
    login(login) {
      this.isLoading = true;
      try {
        fetch(
          `http://localhost:3000/users?user=${login.user}&password=${login.password}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.length === 1) {
              this.loggedUser = {
                ...this.loggedUser,
                ...data,
              };
              router.push("index");
            } else {
              window.alert("O usuário nao existe");
            }
          });
      } catch (e: any) {
        window.alert(e.message);
      }
    },
  },
});
</script>
