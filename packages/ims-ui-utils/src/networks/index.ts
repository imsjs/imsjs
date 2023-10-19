// import { defHttp } from "./axios";

import type { NrlType, CreateAxiosOptions } from "@imsjs/ims-ui-types";
import { getEnvs } from "../env";
import { NRL_ALOVA, NRL_AXIOS } from "@imsjs/ims-ui-constants";
import { createAxios, defHttp } from "./axios";
// import type {Alova,AlovaOptions} from "alova";
// const { VITE_NRL } = getEnvs();
// import

export * from "./alova";

export { createAxios, defHttp };

// export function getAuthCache<T>(key: BasicKeys) {
//   const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
//   return fn(key) as T;
// }

/**
 * @description 创建网络请求
 */
export function createNetWork<T>(options?: CreateAxiosOptions, nrl?: NrlType) {
  if (nrl === undefined) {
    const { VITE_NRL } = getEnvs();
    nrl = VITE_NRL;
  }

  if (nrl === NRL_AXIOS) {
    return createAxios(options) as T;
  }

  if (nrl === NRL_ALOVA) {
    return alova as T;
  }
}
