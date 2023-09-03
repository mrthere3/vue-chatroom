import { createRouter, createWebHistory } from "vue-router";
import login from "@/components/views/login_compon.vue";
import home from "@/components/views/home_page.vue";
import { useAuthstor } from "@/store/store.js";
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: login },
  { path: "/home", name: "home", component: home, meta: { requireAuth: true } },
];
export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// 权限界面 登录拦截器 需要在本地查询是否有服务器返回的cookie
router.beforeEach(function(to, from, next) {
  if (to.meta.requireAuth) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});
