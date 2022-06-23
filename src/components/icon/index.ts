import { App } from "vue";
import PIcon from "./index.vue";

PIcon.install = function (Vue: App) {
  Vue.component(PIcon.name, PIcon);
};

export default PIcon;
