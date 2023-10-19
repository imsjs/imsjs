class EnumArray extends Array {
  /** 根据值获取字段 */
  getFieldByValue(value: number | string, field = 'label') {
    const finded = this.find(item => item?.value === value);
    if (finded) {
      return finded[field];
    } else {
      return '-';
    }
  }

  getEnumByValue(value: number | string | boolean) {
    return this.find(item => item?.value === value);
  }
}

const useEnumeration = (enums: any) => {
  const res = Object.freeze(new EnumArray(...enums));
  return res;
};

export { EnumArray, useEnumeration };

export default useEnumeration;
