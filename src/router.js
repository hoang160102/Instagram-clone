import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import LoginAccount from "./components/account/LoginAccount.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
      meta: { title: "Home", requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginAccount,
      meta: { title: "Home", requiresAuth: false },
    }
  ],
});

export default router;
