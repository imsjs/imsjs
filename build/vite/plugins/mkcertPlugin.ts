import type { PluginOption } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export function configMkcert(env: ViteEnv): PluginOption[] {
  const { VITE_USE_SERVER_HTTPS } = env;
  const plugins: PluginOption[] = [];

  if (VITE_USE_SERVER_HTTPS) {
    plugins.push(
      mkcert({
        source: 'coding'
      })
    );
  }
  return plugins;
}
