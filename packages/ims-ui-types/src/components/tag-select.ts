import type { SelectProps as ASelectProps } from "ant-design-vue";
export interface ImsTagSelectProps {
  /** options 接口函数 */
  api?:
    | Function
    | {
        uri: string;
        params?: object;
        options?: object;
      };
  /** 接口参数 */
  params?: {
    [key: string]: any;
  };
  options?: ASelectProps["options"];
}
