<template>
  <div class="body">
    <div class="login">
      <h1>Login</h1>
      <form action="">
        <div class="login-info">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="login.user"
            placeholder="Email"
            name="email"
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            v-model="login.password"
            placeholder="Password"
          />
        </div>
        <div class="login-buttons">
          <button @click.prevent="submitLogin">Login</button>
          <button @click.prevent="cleanLogin" v-if="isField">Clean</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    const login = ref({
      user: "",
      password: "",
    });
    let isField = ref<boolean>(false);
    isField = computed(() => {
      const { password, user } = login.value;
      if (password.length > 0 || user.length > 0) {
        return true;
      }
      return false;
    });
    return {
      login,
      isField,
    };
  },
  props: {
    responseLogin: {
      require: false,
      type: Boolean,
    },
  },
  methods: {
    submitLogin() {
      this.$emit("loginRequest", this.login);
      console.log(this.login);
    },
    cleanLogin() {
      this.login = { user: "", password: "" };
    },
  },
});
</script>
