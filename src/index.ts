import { Options } from "../types/index";
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
