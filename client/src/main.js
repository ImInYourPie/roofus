import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./config/vuetify.config";
import router from "./router";
import store from "./store";
import "./style.css";

createApp(App).use(store).use(router).use(vuetify).mount("#app");
