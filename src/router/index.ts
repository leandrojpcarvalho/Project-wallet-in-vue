import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginPage.vue";
import Home from "../views/HomePage.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/index",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
