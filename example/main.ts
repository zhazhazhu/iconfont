import { createApp } from "vue";
import { setupIcon } from "../dist/index";
import App from "./App.vue";

const app = createApp(App);

setupIcon({});

app.mount("#app");
