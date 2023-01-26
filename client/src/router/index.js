import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import Login from "../pages/Login.page.vue";
import Home from "../pages/Home.page.vue";

import auth from "../store/modules/auth";

store.registerModule("auth", auth);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { onlyNoAuth: true },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
];

const router = createRouter(
  {
    history: createWebHistory(),
    routes,
  },
  store,
);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log(store.state.auth.token);
    if (!!store.state.auth.token) {
      next();
      return;
    }
    next({ name: "Login" });
  } else {
    next();
  }

  if (to.meta.onlyNoAuth) {
    console.log(store.state.auth.token);

    if (!store.state.auth.token) {
      next();
      return;
    }
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
