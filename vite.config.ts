import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue({}), vueJsx({})],
  build: {
    outDir: "./dist",
    lib: {
      formats: ["es"],
      entry: "./components/index.ts",
      name: "index",
      fileName: () => "index.js",
    },
    rollupOptions: {},
  },
});
