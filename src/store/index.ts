import { createStore } from "vuex";
import user from "./user";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  mutations: {},
  actions: {},
  modules: { user: user },
  plugins: [createPersistedState()],
  strict: true,
});
