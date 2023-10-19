import { loadEnv } from "vite";
import { resolve } from "node:path";

import type { UserConfig, ConfigEnv, PluginOption } from "vite";

import getLessOptions from "../../build/vite/preprocessor/less";
import { configVitePlugins } from "../../build/vite";
// import { createProxy } from '../build/vite/proxy';

import { wrapperEnv } from "../../build/utils";

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_USE_SERVER_HTTPS,
  } = viteEnv;

  const isBuild = command === "build";

  // console.info('VITE_PROXY =>', VITE_PROXY);

  // console.info(JSON.stringify(mode === 'development'));
  return {
    base: VITE_PUBLIC_PATH,
    root: root,

    plugins: configVitePlugins(viteEnv, isBuild) as PluginOption[],
    define: {
      __IS_DEVELOPMENT__: JSON.stringify(mode === "development"),
    },

    server: {
      port: VITE_PORT,
      https: VITE_USE_SERVER_HTTPS,
      host: true,
      // proxy: createProxy(VITE_PROXY),
    },
    build: {
      lib: {
        entry: "./index.ts",
        name: "ims-ui",
        formats: ["es"],
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
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ["console", "debugger"] : [],
    },
    css: {
      preprocessorOptions: {
        less: getLessOptions(isBuild),
      },
    },

    resolve: {
      dedupe: ["vue"],
      alias: [
        {
          find: /^ims-ui$/,
          replacement: resolve(__dirname, "..", "ims-ui", "index.ts"),
        },
        {
          find: /^@ims-ui\/(.*)$/,
          replacement: resolve(__dirname, "..", "$1", "index.ts"),
        },
      ],
    },
  };
};
