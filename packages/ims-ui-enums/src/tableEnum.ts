// import { useEnumeration } from "@imsjs/ims-ui-hooks";

/**
 * 表格数据列类型
 */
export enum TableColumnTypeEnum {
  // 操作
  OPERATIONS = "OPERATIONS",
  // 日期
  DATE = "DATE",
  // 时间
  DATETIME = "DATETIME",
  // 序号
  INDEX = "INDEX",
}

/**
 * 表格数据列（透传）组合方式 combination
 * MERGE | OVERLAY | OVERLAY_MERGE
 */
export enum TableColumnCombinationModeEnum {
  // 合并
  MERGE = 1,
  // 覆盖
  OVERLAY = 2,
  // 覆盖合并
  OVERLAY_MERGE = 3,
}

/**
 * 数列格式化类型
 */
export enum ColumnFormatTypeEnum {
  // 日期
  DATE = 1,
  // 时间
  DATETIME = 2,
  // 序号
  INDEX = 3,
}
export const ColumnFormatTypeEnums = [
  {
    name: "date",
    label: "日期",
    value: ColumnFormatTypeEnum.DATE,
    color: "blue",
    icon: "ant-design:check-outlined",
  },
  {
    name: "datetime",
    label: "时间",
    value: ColumnFormatTypeEnum.DATETIME,
    color: "blue",
    icon: "ant-design:close-outlined",
  },
  {
    name: "index",
    label: "序号",
    value: ColumnFormatTypeEnum.INDEX,
    color: "blue",
    icon: "ant-design:close-outlined",
  },
];
// export const ColumnFormatTypeEnumArray = useEnumeration(ColumnFormatTypeEnums);
