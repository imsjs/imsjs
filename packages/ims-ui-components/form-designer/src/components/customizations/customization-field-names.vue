<template>
  <div :class="prefixCls">
    <div v-for="(key, field, index) in modelValue" class="my-1" :key="index">
      <div class="flex justify-between items-center mb-1">
        <div>
          <span class="text-13px text-#4e5969">{{
            fieldNamesTexts[field]
          }}</span>
          <span class="ml-1 text-12px text-#0000004f italic">{{ field }}</span>
        </div>
        <div class="b border-solid border-#e5e6eb p-2px">
          <icon icon="tabler:code" color="#0000004f"></icon>
        </div>
      </div>
      <div>
        <a-input v-model:value="modelValue[field]"></a-input>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

const COMPONENT_NAME = "ImsDesignerCustomizationFieldNames";
defineOptions({
  name: COMPONENT_NAME,
});

interface ImsDesignerCustomizationFieldNamesProps {}
defineProps<ImsDesignerCustomizationFieldNamesProps>();

const { prefixCls } = useStyle("designer-customization-field-names");
const modelValue = defineModel<object>("value", {
  default: {
    label: "label",
    value: "value",
    children: "children",
  },
});
const fieldNamesTexts = {
  label: "标签",
  value: "值",
  children: "子节点",
  options: "选项",
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-customization-field-names";

.@{prefix-cls} {
  --at-apply: w-full;
}
</style>
