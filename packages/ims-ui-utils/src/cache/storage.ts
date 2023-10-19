import { useStorage, type RemovableRef } from "@vueuse/core";
// import type { RemovableRef } from "@vue/shared";

import type { BasicKeys } from "@imsjs/ims-ui-types";

import { ACCESS_TOKEN_KEY } from "@imsjs/ims-ui-constants";

// export function getToken<T>(
//   key: BasicKeys = ACCESS_TOKEN_KEY
// ): RemovableRef<T> {
//   return useStorage(key, undefined) as T;
// }

export function getToken<T>(
  key: BasicKeys = ACCESS_TOKEN_KEY
): RemovableRef<T> {
  return useStorage(key, undefined) as RemovableRef<T>;
}
