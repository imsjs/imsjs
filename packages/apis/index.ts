import { alova, defHttp } from "@imsjs/ims-ui-utils";

import { ErrorMessageMode } from "@imsjs/ims-ui-types";
import { reject } from "lodash-es";

export const nodeUri = "stage/v1/nodes";

/**
 * 节点列表
 * @param params
 * @returns
 */
export const getNodes = (params?: object) => {
  return alova.Get(`${nodeUri}`, {
    // immediate
    // immediate: immediate,
    name: "getNodes",
    params,
  });
};

export const nodeListsApi = (
  params = {},
  mode: ErrorMessageMode = "message"
) => {
  return defHttp.get(
    { url: nodeUri, params },
    {
      errorMessageMode: mode,
      isTransformResponse: true,
    }
  );
  // .then((res) => {
  //   console.info("res =>", res);
  //   resolve(res);
  // })
  // .catch((error) => {
  //   reject(error);
  // });
};
