import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
export default defineConfig({
  // 增加插件的使用
  plugins: [vue()],
  build: {
    lib: {
      entry: "./index.ts",
      name: "ims-ui-utils",
      fileName: "ims-ui-utils",
    },
    minify: false,
    rollupOptions: {
      external: [
        "vue",
        /ant-design-vue.*/,
        "sortablejs",
        "vue-json-pretty",
        "axios",
        "lodash-es",
        "lodash",
        "@wangeditor/editor",
        "@wangeditor/editor-for-vue",
        "@visactor/vtable",
      ],
      output: {
        globals: {
          vue: "vue",
          axios: "axios",
          lodash: "lodash",
          "lodash-es": "lodashEs",
          "vue-json-pretty": "VueJsonPretty",
          "ant-design-vue": "antDesignVue",
          "ant-design-vue/es": "antDesignVueEs",
          sortablejs: "Sortable",
          "@visactor/vtable": "vtable",
          "@wangeditor/editor-for-vue": "editorForVue",
        },
      },
    },
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
