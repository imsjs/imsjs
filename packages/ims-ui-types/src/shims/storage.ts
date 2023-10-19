import {
  TOKEN_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  EXPIRES_IN_KEY,
  TOKEN_TYPE_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_CFG_KEY,
  AUTH_APPS,
  LAYOUTS_CFG_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
  AUTH_OPERATIONS,
  NAV_MENUS_KEY,
  VIEW_NODES_KEY,
  MS_TABBAR_TABS,
  SIGNER_INFO_KEY,
  APP_MENUS_KEY,
} from "@imsjs/ims-ui-constants";

// import type { RouteLocationNormalized } from "vue-router";

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  /**
   * ACCESS_TOKEN_KEY
   */
  [ACCESS_TOKEN_KEY]: string | number | null | undefined;
  [REFRESH_TOKEN_KEY]: string | number | null | undefined;

  [EXPIRES_IN_KEY]: string | number | null | undefined;

  [TOKEN_TYPE_KEY]: string | number | null | undefined;

  //   [SIGNER_INFO_KEY]: ISignerInfo | any;
  [AUTH_OPERATIONS]: number[];
  //   [APP_MENUS_KEY]: NodeItem[];

  //   [AUTH_APPS]: NodeItem[];
  [NAV_MENUS_KEY]: number[];
  [VIEW_NODES_KEY]: number[];
  [MS_TABBAR_TABS]: any[];

  //   [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  //   [PROJ_CFG_KEY]: ProjectConfig;
  // [LAYOUTS_CFG_KEY]: LayoutsConfig;
  //   [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
}

export type BasicKeys = keyof BasicStore;
