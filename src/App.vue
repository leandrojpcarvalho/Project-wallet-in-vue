<template>
  <div class="bg">
    <router-view @LoginRequest="login" :loggedUser="loggedUser" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { User, Login } from "./types/Wallet";
import router from "./router";
import dataBase from "./data/dbObject";

export default defineComponent({
  setup() {
    const loggedUser = ref<User>();
    const isLoading = ref<boolean>(false);
    return { loggedUser, isLoading };
  },
  methods: {
    login(login: Login) {
      // this.isLoading = true;
      // try {
      //   fetch(
      //     `http://localhost:3000/users?name=${login.name}&password=${login.password}`
      //   )
      //     .then((res) => res.json())
      //     .then((data) => {
      //       if (data.length === 1) {
      //         this.loggedUser = data[0];
      //         router.push("index");
      //       } else {
      //         window.alert("O usuário nao existe");
      //       }
      //     });
      // } catch (e: any) {
      //   window.alert(e.message);
      // }
      this.verifyUser(login);
    },
    verifyUser(login: Login) {
      this.isLoading = true;
      const user = dataBase.users.find(
        (user) => user.name === login.name && user.password === login.password
      );
      if (user) {
        this.loggedUser = user;
        router.push("index");
      } else {
        window.alert("O usuário nao existe");
      }
    },
    toLoginPage(userName: string) {
      if (!this.loggedUser || this.loggedUser.name !== userName) {
        router.push("/");
      }
    },
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
}
.bg {
  min-width: 320px;
  width: 100%;
  height: 100vh;
  background-image: url("./assets/bg4.jpg");
}

@media screen and (max-width: 600px) {
  * {
    font-size: 0.8rem;
  }
}
</style>
