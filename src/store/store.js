import { defineStore } from "pinia";

export const useAuthstor = defineStore("useauth", {
  state: () => ({
    authentica: "",
  }),
  actions: {
    set_auth(session) {
      localStorage.setItem("isAuthenticated", session);
    },
    set_username(name) {
      localStorage.setItem("username", name);
    },
  },
});
