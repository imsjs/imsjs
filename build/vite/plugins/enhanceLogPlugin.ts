import type { PluginOption } from 'vite';

import EnhanceLog from 'vite-plugin-enhance-log'

export function configEnhanceLog(): PluginOption[] {
  
  const plugins: PluginOption[] = [];

  plugins.push(
    EnhanceLog({
      splitBy: '\n',
      preTip: '🐖🐖🐖🐖🐖🐖🐖🐖🐖🐖',
      enableFileName: true, // or enableFileName: { enableDir: false}
    })
  );
  return plugins;
}
