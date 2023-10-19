import type { PluginOption } from "vite";
import Vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// import { configAutoImport } from "./autoImport";

import { configUnpluginAutoImport } from "./plugins/unpluginAutoImportPlugin";

import { configUnoCss } from "./plugins/unoCssPlugin";

import { configMkcert } from "./plugins/mkcertPlugin";

import { configEnhanceLog } from "./plugins/enhanceLogPlugin";

import { configVisualizer } from "./plugins/visualizerPlugin";

// import { configDts } from "./plugins/dtsPlugin";

// configDts

// import { configVueDevTools } from './plugins/vueDevtoolsPlugin';

export function configVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  // const {
  //   // VITE_USE_IMAGEMIN,
  //   // VITE_USE_MOCK,
  //   VITE_LEGACY,
  //   VITE_BUILD_COMPRESS,
  //   VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  //   VITE_USE_SERVER_HTTPS,
  // } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    vueJsx(),
  ];
  if (!isBuild) {
    vitePlugins.push(configMkcert(viteEnv));
  }

  vitePlugins.push(configUnoCss());
  vitePlugins.push(configUnpluginAutoImport());

  vitePlugins.push(configEnhanceLog());

  if (isBuild) {
    vitePlugins.push(configVisualizer());

    // vitePlugins.push(configDts());
  }

  return vitePlugins as PluginOption[];
}
