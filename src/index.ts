import { App } from "vue";
import { Options } from "../types/index";
import PIcon from "./components/icon/index";
import { createScript, setIconfontIdToWindow } from "./utils/index";

export const setupIcon = (options?: Options) => {
  if (options && options.id?.length) {
    options.id?.forEach((id) => {
      createScript(id);
    });

    initConfig(options);
  }
};

function initConfig(arg: Options) {
  setIconfontIdToWindow(arg.id);
}

const components = {
  PIcon,
};

const install = (Vue: App) => {
  Object.values(components).forEach((component) => {
    Vue.component(component.name, component);
  });
};

export { PIcon };

export default { install };
