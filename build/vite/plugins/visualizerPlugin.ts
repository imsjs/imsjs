import type { PluginOption } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export function configVisualizer(): PluginOption[] {
  const plugins: PluginOption[] = [];

  plugins.push(
    visualizer({
      open: false,
    })
  );
  return plugins;
}
