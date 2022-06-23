import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ command, mode }) => {
  const inlinePlugins = [vue({}), vueJsx({})];

  if (command === "serve") {
    return {
      plugins: [...inlinePlugins],
      root: "./example",
      // dev 独有配置
    };
  } else {
    return {
      plugins: [
        dts({
          tsConfigFilePath: "./tsconfig.json",
          cleanVueFileName: true,
          insertTypesEntry: true,
        }),
        ...inlinePlugins,
      ],
      build: {
        watch: {
          include: ["src/**/*.ts", "src/**/*.vue"],
        },
        outDir: "./dist",
        lib: {
          formats: ["es"],
          entry: resolve(__dirname, "src/index.ts"),
          name: "index",
          fileName: () => "index.js",
        },
        rollupOptions: {},
      },
      // build 独有配置
    };
  }
});
