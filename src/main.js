import "material-icons/iconfont/material-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initAnalytics } from "./services/analytics";
import "./style.css";

const DISCLAIMER_STORAGE_KEY = "flexi-book-disclaimer-accepted";

if (typeof window !== "undefined") {
  window.localStorage.removeItem(DISCLAIMER_STORAGE_KEY);
}

const app = createApp(App);

initAnalytics();

app.config.errorHandler = (err) => {
  console.error(err);
};

app.use(router).mount("#app");
