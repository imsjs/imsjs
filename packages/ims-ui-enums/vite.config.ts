import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./index.ts",
      name: "ims-ui-enums",
      fileName: "ims-ui-enums",
    },
    minify: false,
    rollupOptions: {
      external: ["vue", /ant-design-vue.*/],
      output: {
        globals: {
          vue: "vue",
          "ant-design-vue": "antDesignVue",
          "ant-design-vue/es": "antDesignVueEs",
        },
      },
    },
  },
});
