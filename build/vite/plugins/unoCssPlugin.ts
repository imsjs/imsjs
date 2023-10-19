import type { PluginOption } from "vite";
import UnoCSS from "unocss/vite";

import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerVariantGroup,
} from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

export function configUnoCss(): PluginOption[] {
  const plugins: PluginOption[] = [];
  const unoCss = UnoCSS({
    shortcuts: [
      ["wh-full", "w-full h-full"],
      ["f-c-c", "flex justify-center items-center"],
      ["bd-red", "border-1 border-red-800 border-solid"],
    ],
    presets: [
      presetAttributify(),
      presetUno(),
      presetIcons({
        prefix: "icon-",
        extraProperties: {
          display: "inline-block",
          "vertical-align": "middle",
        },
      }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
  }) as PluginOption;
  // console.info("unoCss => ", unoCss);
  plugins.push(unoCss);

  return plugins;
}
