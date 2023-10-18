import vue from "@vitejs/plugin-vue";
import * as path from "path";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VueQuasarUtils",
      fileName: "vue-quasar-utils"
    },
    rollupOptions: {
      external: ["vue", "quasar"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
