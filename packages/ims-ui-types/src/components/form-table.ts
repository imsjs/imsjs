import type { SelectProps as ASelectProps } from "ant-design-vue";

import type { TableColumnType } from "ant-design-vue";

export interface ImsFormTableColumn extends TableColumnType {
  dataIndex: string;
  /**
   * 组件
   */
  component: object & {
    /**
     * 组件标识/标签 名称
     */
    name: string;
    /** 字段 */
    field?: string;
    /**
     * 组件事件
     */
    events?: {
      /** 事件名称 */
      [key: string]: string[];
    };

    /**
     * 组件 v-model key value check
     */
    model?: string;
    /**
     * 组件 props
     */
    props?: {
      [key: string]: any;
    };
  };
}

export interface ImsFormTableProps {
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
  /**
   * 操作栏 配置
   */
  hab?: boolean | object;
  /**
   * 表格列配置
   */
  columns: ImsFormTableColumn[];
  /**
   * 表格数据
   */
  dataList?: object[];
  /**
   * 初始化
   */
  initial: object;
}
