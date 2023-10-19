import installer from "./src/defaults";
export * from "@imsjs/ims-ui-hooks";
export * from "@imsjs/ims-ui-utils";
export * from "@imsjs/ims-ui-components";

export * from "./src/make-installer";

// 类型导出
export * from "@imsjs/ims-ui-types";

export const install = installer.install;
export const version = installer.version;
export default installer;
