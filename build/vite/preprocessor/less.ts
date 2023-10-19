import { resolve } from "path";

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

const getLessOptions = (isBuild: boolean) => {
  // console.info('getLessOptions.isBuild',isBuild);
  if (isBuild === true) {
    return {
      // 全局注入 config.less
      additionalData: `@import (reference) "${pathResolve(
        "../ims-ui-themes/default/config.less"
      )}";`,
      javascriptEnabled: true,
    };
  } else {
    return {
      // 全局注入 config.less
      additionalData: `@import (reference) "${pathResolve(
        "../packages/ims-ui-themes/default/config.less"
      )}";`,
      javascriptEnabled: true,
    };
  }
};
export { getLessOptions };

export default getLessOptions;
