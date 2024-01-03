<template>
  <div :class="prefixCls" ref="draggableRef">
    <a-space
      :size="3"
      :class="`${prefixCls}-item`"
      :key="item.id"
      v-for="(item, index) in modelValue"
    >
      <div class="handler">
        <Icon
          icon="ant-design:menu-outlined"
          style="font-size: 16px"
          :inline="true"
          class="cursor-move text-#888"
        ></Icon>
      </div>
      <a-input placeholder="标签" v-model:value="item.label">
        <template #prefix>
          <span class="text-#0000004f text-10px">label</span>
        </template>
      </a-input>
      <a-input placeholder="值" v-model:value="item.value">
        <template #prefix
          ><span class="text-#0000004f text-10px">value</span></template
        >
      </a-input>
      <Icon
        @click="onDeleteItem(index)"
        icon="ant-design:delete-outlined"
        style="font-size: 16px"
        :inline="true"
        class="cursor-pointer text-#888 hover:text-red"
      ></Icon>
    </a-space>
    <a-button block type="dashed" @click="addItem">添加一项</a-button>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";
import { nanoid } from "nanoid";
import { useDraggable } from "vue-draggable-plus";
const COMPONENT_NAME = "ImsDesignerCustomizationOptions";
defineOptions({
  name: COMPONENT_NAME,
});
interface ImsDesignerCustomizationOptionsProps {
  /**  类型 */
  options?: [];
}

defineProps<ImsDesignerCustomizationOptionsProps>();
const { prefixCls } = useStyle("designer-customization-options");
const draggableRef = ref<HTMLElement>();
const modelValue = defineModel<object[]>("value", {
  default: [],
});

useDraggable(draggableRef, modelValue, {
  animation: 150,
  handle: ".handler",
  ghostClass: "ghost",
});

const addItem = () => {
  let itemId = nanoid();
  modelValue.value.push({
    id: itemId,
    value: `选项-${itemId}`,
    label: `选项-${itemId}`,
  });
};
const onDeleteItem = (index: number) => {
  modelValue.value.splice(index, 1);
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-customization-options";

.@{prefix-cls} {
  background-color: #eeeeee;
  --at-apply: w-full p-2 rd;
  &-item {
    background-color: #fff;
    --at-apply: "rd p-2 mb-2";
  }
}
</style>
