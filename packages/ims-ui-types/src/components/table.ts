import type { TableColumnType } from "ant-design-vue";

import {
  TableColumnTypeEnum,
  TableColumnCombinationModeEnum,
  ColumnFormatTypeEnum,
} from "@ims-ui/enums";

export interface ImsTableProps {
  /**
   * 行拖拽
   */
  sortable?: boolean;
  animation?: number;
  dragHandler?: string | undefined;

  dataTable?: object;
  columns: any[];
  schemes?: any[];
  lists?: object[];
  paginations?: any;
  footerBar?: boolean | object;
  uri?: string | false;

  // dataSource: object[];
}

export interface SortableProps {
  rowKey: string;
  animation: number;
  dragHandler?: string | undefined;
}

export interface DragEndParams {
  /**
   * 事件 DragEvent
   */
  dragEvent: DragEvent;
  /**
   * 索引值
   */
  indexs: {
    newDraggableIndex: number;
    newIndex: number;
    oldDraggableIndex: number;
    oldIndex: number;
  };
  /**
   * 排序后的 keys
   */
  keys: string[] | number[];
  /**
   * 排序后的 数据
   */
  sortabledDataSource: object[];
}

export interface ImsTableColumn extends TableColumnType {
  /**
   * 数列ID
   */
  id: string;
  /**
   * Preset names or custom imports map
   *
   * @default true
   */
  visible?: boolean | undefined;
  formatter?: string;
  type?: TableColumnTypeEnum;
  formatType: ColumnFormatTypeEnum;
  // type?: TableColumnTypeEnum;
  // formatter:string;
  combination?: TableColumnCombinationModeEnum | false;
  /***
   * 列排序值 值越大越靠前
   */
  sort?: number;
}

export interface DatatableScheme {
  /**
   * 方案名称
   */
  name: string;
  id: string;
  /**
   * 所属数据表格ID
   */
  table_id: string;
  owner_id: string;
  tenant_id: string;

  revision?: string;
  description: string;
  remark: string;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  /**
   * 所属数据表格
   */
  table?: any;
  /**
   * 方案数列
   */
  columns: any;
}

/**
 * 数据表格
 */
export interface DataTable {
  id: string;
  name: string;
  code: string;
  tenant_id: string;

  revision: string;
  description: string;
  remark: string;
  created_by: string;
  updated_by: string;
  deleted_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  /**
   * 数据表格 所有可用的方案
   */
  schemes: DatatableScheme[];
  /**
   * 数据表格 所有可用的数列
   */
  columns: ImsTableColumn[];
}
