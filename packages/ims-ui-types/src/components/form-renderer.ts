// import type { FormItemProps } from "ant-design-vue";

export interface ImsFormRendererProps {
  /** 表单数据 */
  data: any;
  validateInfos?: object;
  eoPrefix?: string;
}

import { Form } from "ant-design-vue";

export type UseFormType = ReturnType<typeof Form.useForm>;

export interface ImsFormExpose {
  /** 表单实例 */
  formInstance: UseFormType;
  // 重置表单方法
  reset: Function;
}
