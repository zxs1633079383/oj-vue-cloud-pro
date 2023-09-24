import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// acro design config
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access";
import "bytemd/dist/index.css";

createApp(App).use(store).use(ArcoVue).use(router).mount("#app");
