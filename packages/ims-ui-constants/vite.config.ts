import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.ts",
      name: "ims-ui-constants",
      fileName: "ims-ui-constants",
    },
    minify: false,
  },
  resolve: {
    alias: [
      {
        find: /^@imsjs\/ims-ui$/,
        replacement: resolve(__dirname, "..", "ims-ui", "index.ts"),
      },
      {
        find: /^@imsjs\/ims-ui-(.*)$/,
        replacement: resolve(__dirname, "..", "ims-ui-$1", "index.ts"),
      },
    ],
  },
});
