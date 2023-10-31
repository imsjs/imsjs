import { loadEnv } from "vite";
import { resolve } from "node:path";

import type { UserConfig, ConfigEnv, PluginOption } from "vite";

import getLessOptions from "../build/vite/preprocessor/less";
import { configVitePlugins } from "../build/vite";
import { createProxy } from "../build/vite/proxy";

import { wrapperEnv } from "../build/utils";

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
      __ENV__: JSON.stringify(viteEnv),
    },

    server: {
      port: VITE_PORT,
      https: VITE_USE_SERVER_HTTPS,
      host: true,
      proxy: createProxy(VITE_PROXY),
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
      alias: [
        {
          find: /^@imsjs\/ims-ui$/,
          replacement: resolve(
            __dirname,
            "..",
            "packages",
            "ims-ui",
            "index.ts"
          ),
        },
        {
          find: /^@imsjs\/ims-ui-(.*)$/,
          replacement: resolve(
            __dirname,
            "..",
            "packages",
            "ims-ui-$1",
            "index.ts"
          ),
        },
        {
          find: /@\//,
          replacement: resolve(__dirname, "src/") + "/",
        },
      ],
    },
  };
};
