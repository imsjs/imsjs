export interface NavMenuProps {
  /** 自定义参数 */
  fieldNames: {
    children: string;
    label: string;
    value: string | number;
    icon: string;
    leaf: string;
    disabled: string;
    level: string;
  };
  /** 面包屑 */
  breadCrumb: boolean;
  /** 菜单数据 */
  data: [];
}

export interface NavMenuItemProps {
  id?: string | number;
  /** 自定义参数 */
  fieldNames: {
    children: string;
    label: string;
    value: string | number;
    icon: string;
    leaf: string;
    disabled: string;
    level: string;
  };
  /** 面包屑 */
  breadCrumb: boolean;
  /** 菜单数据 */
  data: object;
  /** 索引值 */
  currentIndex?: number;
}
