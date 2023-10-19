import type {
  PiniaGetterTree,
  PiniaStateTree,
  PiniaActionTree,
} from "../shims/pinia";

import type { Store, StoreDefinition } from "pinia";
import type { PaginationProps } from "ant-design-vue";
import type { ImsTableColumn, DataTable } from "./table";
import type { IFormItem } from "./form";

export interface CurdAction {
  position: "fl" | "fr" | "ro";
  component: string;
  props: object;
  emit: string;
}

export interface CurdProps {
  // store: CurdStore;
  store: any;
  tables: object;
  uri?: string | false;
  actions?: CurdAction[];
}

export type CurdGetters = PiniaGetterTree;

interface CurdApis {
  /**
   * 表格列数据 API
   */
  columns: AnyPromiseFunction | any;
  /**
   * 表格数据 API
   */
  lists: AnyPromiseFunction | any;
  /**
   * CURD 过滤器表单
   */
  filters: AnyPromiseFunction | any;
  /**
   * CURD 创建/编辑表单
   */
  cus: AnyPromiseFunction | any;
  /**
   * CURD 数据更新 接口
   */
  update: AnyPromiseFunction | any;
  /**
   * CURD 数据删除接口
   */
  destroy: AnyPromiseFunction | any;
  /**
   * CURD 数据恢复接口
   */
  recovery: AnyPromiseFunction | any;
  [key: string]: any;
}

export interface CurdState extends PiniaStateTree {
  apis: CurdApis;

  currentData: any;

  /**
   * 资源URI
   * 用于请求表单，表头列，列表等数据
   */
  uri: string;
  /**
   * 初始化 状态
   *
   */
  initialing: boolean;

  /**
   * 过滤器/搜索 状态
   */
  filtering: boolean;
  /**
   * 操作确认加载状态
   */
  confirmLoading: boolean;
  /**
   * 数据列表
   */
  lists: any[];

  /**
   * 表格组件 表格列的配置描述
   * @access https://www.antdv.com/components/table-cn/#API
   */
  columns: ImsTableColumn[];
  /**
   * 数据表格
   */
  dataTable: DataTable;

  /**
   * 数据表格 方案
   */
  schemes: any[];

  /**
   * Pagination 分页的配置描述
   * @access https://www.antdv.com/components/pagination-cn/#API
   */
  paginations?: PaginationProps & {
    current: number;
    total: number;
  };

  /**
   * 过滤器表单配置
   */
  filters: {
    labelCol?: object;
    name?: string;
    model: object;
    items: IFormItem[];
    spans: number;
    rules?: object;
  };
  filterForm: { [key: string]: any };
  /**
   * Create/Update 表单配置
   */
  cuForm: {
    labelCol?: object;
    name?: string;
    model: object;
    items: IFormItem[];
    rules?: object;
  };
}

export interface CurdActions extends PiniaActionTree {
  getLists(params: { [key: string]: any }): void;
  getColumns(params: object): void;
  getFilterForm(params: object): void;

  destroy(params: object): void;
  recovery(params: object): void;

  update(params: object): boolean;

  initializeCurd(): void;

  calcFilterFormSpan(filters: {
    labelCol?: object;
    name?: string;
    model: object;
    items: IFormItem[];
    spans?: number;
    rules?: object;
  }): void;
}

export type CurdStore = Store<"curd", CurdState, CurdGetters, CurdActions>;

export type CurdStoreDefinition = StoreDefinition<
  "curd",
  CurdState,
  CurdGetters,
  CurdActions
>;
