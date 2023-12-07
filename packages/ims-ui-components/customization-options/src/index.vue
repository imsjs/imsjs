<template>
  <div :class="prefixCls" ref="wrapperRef">
  
    <div
          :key="index"
          class="flex justify-between items-center border-1 border-solid border-#e5e6eb py-4px px-1 mb-2"

          v-for="(element,index) in modelValue"
          
        >
          <div class="handler">
            <Icon
              icon="ant-design:holder-outlined"
              style="font-size: 22px"
              :inline="true"
              class="cursor-move"
            ></Icon>
          </div>
          <a-space>
            <div class="flex items-center">
              <a-input v-model:value="element.label">
                <template #prefix>
                  <span class="text-12px text-#0000004f">label</span>
                </template>
              </a-input>
            </div>
            <div class="flex items-center">
              <a-input v-model:value="element.value">
                <template #prefix>
                  <span class="text-12px text-#0000004f">value</span>
                </template>
              </a-input>
            </div>
          </a-space>

          <a-space class="ml-1">
            <icon
              icon="ant-design:delete-outline"
              @click="deleteOption(index)"
              class="cursor-pointer hover:color-#dc2626"
            ></icon>
          </a-space>
        </div>

    <div>
      <a-button block @click="addOption">添加一项</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

import { ImsCustomizationOptionsProps } from "@imsjs/ims-ui-types";

import { useDraggable } from 'vue-draggable-plus';

import { nanoid } from "nanoid";

const { prefixCls } = useStyle("customization-options");
const COMPONENT_NAME = "ImsCustomizationOptions";

const modelValue = defineModel("value", {
  default: [
    {
      id:'0',
      value: "选项一",
      label: "选项一",
    },
  ],
});

defineOptions({
  name: COMPONENT_NAME,
});
defineProps<ImsCustomizationOptionsProps>();

const wrapperRef = ref();
useDraggable(wrapperRef, modelValue, {
  animation: 150,
  ghostClass: 'ghost'
})

const addOption = () => {
  let tmpId = nanoid();
  modelValue.value.push({
    id:`option-x${tmpId}`,
    value: `选项-${tmpId}`,
    label: `选项-${tmpId}`,
  });


};

const deleteOption = (index: number) => {
  // initOptions.value.splice(index, 1);
  modelValue.value.splice(index, 1);
  // modelValue.value = initOptions.value;
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-customization-options";

.@{prefix-cls} {
  --at-apply: w-full py-1;
  // border-bottom: 1px dashed #d9d9d9;
}
</style>
