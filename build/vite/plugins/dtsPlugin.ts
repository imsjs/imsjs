import type { PluginOption } from "vite";

import dts from "vite-plugin-dts";

export function configDts(): PluginOption[] {
  const plugins: PluginOption[] = [];

  plugins.push(
    dts({
      insertTypesEntry: true,
    })
  );
  return plugins;
}
