import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import Login from "../pages/Login.page.vue";
import Home from "../pages/Home.page.vue";
import Details from "../pages/Details.page.vue";
import PageNotFound from "../pages/404.page.vue";

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
  {
    path: "/property/:propertyId",
    name: "Details",
    component: Details,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: PageNotFound,
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
    if (!!store.state.auth.token) {
      next();
      return;
    }
    next({ name: "Login" });
  }

  if (to.meta.onlyNoAuth) {
    if (!store.state.auth.token) {
      next();
      return;
    }
    next({ name: "Home" });
  }

  next();
});

export default router;
