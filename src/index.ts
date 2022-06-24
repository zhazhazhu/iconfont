import { App } from "vue";
import { Options } from "../types/index";
import PIconPreview from "./components/icon-preview/index";
import PIcon from "./components/icon/index";
import { createScript, setIconfontIdToWindow } from "./utils/index";

export const setupIcon = (options?: Options) => {
  if (options && options?.id?.length) {
    createScript(options.id);

    initConfig(options);
  }
};

function initConfig(arg: Options) {
  setIconfontIdToWindow(arg.id);
}

const components = {
  PIcon,
  PIconPreview,
};

const install = (Vue: App) => {
  Object.values(components).forEach((component) => {
    Vue.component(component.name, component);
  });
};

export { PIcon, PIconPreview };

export default { install };
