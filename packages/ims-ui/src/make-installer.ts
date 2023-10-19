import type { ConfigProviderProps } from "ant-design-vue";
import type { App, Plugin } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { INSTALLED_KEY } from "@imsjs/ims-ui-constants";
import { version } from "./version";
import { AntdvThemeColor } from "@imsjs/ims-ui-types";

// ant-design-vue es/config-provider/context.d.ts Theme

//  ant-design-vue es/config-provider/context.d.ts ConfigProviderProps
type AntdvGlobalConfigProviderProps = {
  prefixCls?: MaybeRef<ConfigProviderProps["prefixCls"]>;
  iconPrefixCls?: MaybeRef<ConfigProviderProps["iconPrefixCls"]>;
  getPopupContainer?: ConfigProviderProps["getPopupContainer"];
  theme?: AntdvThemeColor;
};
export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: AntdvGlobalConfigProviderProps) => {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;

    components.forEach((component) => app.use(component));

    if (options) ConfigProvider.config(options);
  };

  return {
    version,
    install,
  };
};
