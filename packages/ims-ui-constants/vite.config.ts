import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.ts",
      name: "ims-ui-constants",
      fileName: "ims-ui-constants",
    },
    minify: false,
  },
});
