import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ command, mode }) => {
  const inlinePlugins = [
    vue({}),
    vueJsx({}),
    DefineOptions(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        // presets
        "vue",
      ],
      dts: resolve(__dirname, "./types/auto-imports.d.ts"),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: resolve(__dirname, "./types/components.d.ts"),
    }),
  ];

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
          include: ["src/**/*.*"],
        },
        outDir: "./dist",
        lib: {
          formats: ["es"],
          entry: resolve(__dirname, "src/index.ts"),
          name: "index",
          fileName: () => "index.js",
        },
        rollupOptions: {
          external: Object.keys(require("./package.json").peerDependencies),
        },
      },
      // build 独有配置
    };
  }
});
