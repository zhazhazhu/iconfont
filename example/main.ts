import { createApp } from "vue";
import Icon, { setupIcon } from "../dist";
import "../dist/style.css";
import App from "./App.vue";

const app = createApp(App);

setupIcon({
  id: ["font_2525345_m8w3a3kmgud", "font_2671144_ymii9vu1em"],
});

app.use(Icon);

app.mount("#app");
