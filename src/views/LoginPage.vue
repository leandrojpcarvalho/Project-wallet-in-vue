<template>
  <div class="body">
    <div class="main">
      <div class="styled-name">
        <h2>App</h2>
        <span>wallet</span>
      </div>
      <div class="login">
        <div class="container">
          <form action="">
            <div class="login-info">
              <label for="email">Email</label>
              <input
                type="email"
                v-model="login.name"
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
              <button @click.prevent="submitLogin">Entrar</button>
              <button @click.prevent="cleanLogin" v-if="isField">Clean</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  data() {
    const login = ref({
      name: "",
      password: "",
    });
    let isField = ref<boolean>(false);
    isField = computed(() => {
      const { password, name } = login.value;
      if (password.length > 0 || name.length > 0) {
        return true;
      }
      return false;
    });
    return {
      login,
      isField,
    };
  },
  emits: {
    loginRequest: (payload: { name: string; password: string }) => {
      return payload;
    },
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
    },
    cleanLogin() {
      this.login = { name: "", password: "" };
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,700;0,900;1,100;1,200;1,600;1,700;1,800;1,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  margin: 0 auto;
  height: 100vh;
  width: 100vh;
  display: flex;
  flex-flow: row nowrap;
  background-color: #f0f0f0;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  min-width: 320px;
  width: inherit;
}
.login {
  width: 100%;
  min-width: 300px;
  max-width: 600px;
  font-family: "Courier New", Courier, monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0 10px;
  box-shadow: 9px 11px 21px #80808069;
}
.styled-name {
  display: flex;
  gap: 25px;
  align-items: center;
  > h2 {
    font-size: 4rem;
  }
  > span {
    font-size: 4.5rem;
    color: #fc9d00e0;
    font-family: "Raleway", sans-serif;
    text-shadow: 3px 5px 10px #00000059;
  }
}
@media screen and (max-width: 400px) {
  .body .main .login .container .login-info {
    grid-template-columns: none;
  }
  .body .main .login {
    width: 90%;
  }
  .body .main .login .container .login-buttons {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
}
.container {
  > form {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    > .login-info {
      grid-template-columns: 1fr 3fr;
    }
    .login-buttons {
      display: flex;
      width: 100%;
      justify-content: center;
      > button {
        font-family: "Courier New", Courier, monospace;
        text-align: center;
        font-weight: bolder;
        font-size: 1rem;
        padding: 8px 15px;
        border: none;
        box-shadow: 1px 2px 2px gray;
        border-radius: 5px;
        background-color: #ffe4c461;
        cursor: pointer;
        &:hover {
          background-color: #fc9d00e0;
        }
      }
    }
    > div {
      display: grid;
      align-items: center;
      gap: 8px;
      > label {
        font-weight: 700;
        @media screen and (max-width: 400px) {
          display: none;
        }
      }
      & > input {
        font-family: "Courier New", Courier, monospace;
        text-align: center;
        font-weight: 500;
        font-size: 1rem;
        padding: 5px 3px;
        border: 3px solid transparent;
        box-shadow: 1px 2px 2px gray;
        border-radius: 5px;
        background-color: #8080800d;
        &:hover {
          border: 3px solid #fc9b0021;
        }
        &:focus-visible {
          outline: 3px solid #fc9b00;
        }
        @media screen and (max-width: 400px) {
          margin: 7px 0;
        }
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .body {
    width: 100%;
  }
}
</style>
