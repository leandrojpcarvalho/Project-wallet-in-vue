import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginPage.vue";
import Home from "../views/HomePage.vue";
import Modal from "../components/ModalLayer.vue";

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
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
