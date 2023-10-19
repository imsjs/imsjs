export interface ImsVtableProps {
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
  /** 数据数组 */
  // dataSource: object[];
  /** 配置项目 */
  options: object;
}
