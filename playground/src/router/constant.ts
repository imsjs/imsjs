export const REDIRECT_NAME = "Redirect";

export const PARENT_LAYOUT_NAME = "ParentLayout";

export const PAGE_NOT_FOUND_NAME = "PageNotFound";

/**
 * @description: default layout
 */

export const EMPTY_LAYOUT = () => import("@/layouts/empty/index.vue");

export const DEFAULT_LAYOUT = () => import("@/layouts/default/index.vue");

export const PAGE_NOT_FOUND_COMPONENT = () =>
  import("@/views/exceptions/pageNotFound.vue");

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
};
