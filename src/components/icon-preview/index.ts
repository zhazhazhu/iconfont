import { App } from "vue";
import PIconPreview from "./index.vue";

PIconPreview.install = function (Vue: App) {
  Vue.component(PIconPreview.name, PIconPreview);
};

export default PIconPreview;
