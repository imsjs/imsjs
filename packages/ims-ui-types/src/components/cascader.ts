import type { CascaderProps as ACascaderProps } from "ant-design-vue";

export interface ImsCascaderProps {
  /** options 接口函数 */
  api?:
    | Function
    | {
        uri: string;
        params?: object;
        options?: object;
      };
  /** 接口 请求地址 */
  url?: string;
  /** 接口参数 */
  params?: {
    [key: string]: any;
  };
  options?: ACascaderProps["options"];
}
