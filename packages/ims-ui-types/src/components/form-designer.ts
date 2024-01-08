import type { TooltipProps,  FormItemProps } from "ant-design-vue";

export interface ImsFormDesignerProps {
  /** 是否展头部 */
  showHeader?: boolean;
}

/** 配置组件 */
export interface ImsFormDesignerConfigurationComponent {
  /** ID 标识 */
  id?: string;
  /** 标签 */
  label: string;
  /** 字段 */
  field: string;
  /** 显示切换器 */
  visibilityToggler: boolean;
  /** 显示 */
  visible: boolean;
  /** 应用 */
  apply:boolean;
  /** 是否展示配置 */
  show?: boolean;
  /** 提示信息 */
  tooltip?: TooltipProps;
  /** 配置组件属性 */
  component: {
    name: string;
    vModelField: string;
    props: Record<string, any>;
  };
}

/** 操作动作 */
export interface operationalAction {
  /** ID 标识 */
  id: string;
  /** 图标  */
  icon: string;
  /** 值 */
  value: string;
  /** 标签 */
  label: string;
}

/**
 * 表单项
 */
export interface ImsFormSchemaItem {
  /** ID 标识  */
  id: string;
  /** 组件标题 */
  title: string;
  /** 组件图标 */
  icon: string;
  /** 组件类型 */
  type: string;
  /** 表单数据字符 model field */
  vModelField: string;
  /** 表单项（FormItem）配置项  */
  item: FormItemProps & {
    /** 展示状态 */
    displayState: true;
    /** 名称 (model名称) */
    name: string;
  };
  /**组件相关配置 */
  component: {
    /** 组件名称  会调整为 name */
    componentName: string;
    /** 组件事件 */
    events?: Record<string, string[]>;
    /** 组件属性 */
    props: Record<string, any> & {
      events?: Record<string, string[]>;
    };
  };
  /** 组件属性(props)配置 */
  componentProps: ImsFormDesignerConfigurationComponent[];
  /** 表单项（FormItem）属性(props)配置 */
  formItemProps: ImsFormDesignerConfigurationComponent[];
  /** 类名 css class name */
  class?: string;
  /** 表单子项目 */
  children?: ImsFormSchemaItem[];
}

/**
 * 组件属性配置 Prop Configuration
 */
export interface ImsFormDesignerConfigurationComponentObject {
  [key: string]: ImsFormDesignerConfigurationComponent[];
}

//
/** 表单JSON Schema */
export interface ImsFormSchema {
  /** 数据 model */
  model: Record<string, string>;
  /** 校验规则 rules */
  rules: Record<string, []>;
  /** 表单项目配置 */
  items: [
    {
      /** ID 标识  */
      id: string | number;
      /** 组件标题 */
      title: string;
      /** 组件图标 */
      icon: string;
      /** 组件类型 */
      type: string;
      /** 表单数据字符 model field */
      vModelField: string;
      /** 表单项（FormItem）配置项  */
      item: FormItemProps & {
        /** 展示状态 */
        displayState: true;
      };
      /**组件相关配置 */
      component: {
        /** 组件名称 */
        componentName: string;
        /** 组件事件 */
        events?: Record<string, string[]>;
        /** 组件属性 */
        props: Record<
          string,
          string | number | boolean | Function | string[]
        > & {
          events?: Record<string, string[]>;
        };
      };
      /** 组件属性(props)配置 */
      componentProps: ImsFormDesignerConfigurationComponent[];
      /** 表单项（FormItem）属性(props)配置 */
      formItemProps: ImsFormDesignerConfigurationComponent[];
      /** 类名 css class name */
      class?: string;
      /** 表单子项目 */
      children: ImsFormSchemaItem[];
    }
  ];
}
