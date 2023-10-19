import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.ts",
      name: "ims-ui-types",
      fileName: "ims-ui-types",
    },
    minify: false,
  },
});
