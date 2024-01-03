<template>
  <div :class="prefixCls" ref="draggableRef">
    <div
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
      <div class="flex-1 mx-2">
        <a-button block @click="onConfigRule(index)">配置规则</a-button>
      </div>

      <Icon
        @click="onDeleteItem(index)"
        icon="ant-design:delete-outlined"
        style="font-size: 16px"
        :inline="true"
        class="cursor-pointer text-#888 hover:text-red"
      ></Icon>
    </div>
    <a-button block type="dashed" @click="addItem">添加一项</a-button>
  </div>

  <a-drawer
    v-model:open="opening"
    class="custom-class"
    width="350"
    root-class-name="root-class-name"
    :style="{ position: 'absolute' }"
    placement="right"
    :headerStyle="drawerHeaderStyle"
    :bodyStyle="{ padding: '12px' }"
    :get-container="false"
  >
    <template #closeIcon>
      <div class="flex justify-between items-center">
        <icon
          icon="ant-design:arrow-left-outlined"
          :inline="true"
          class="text-#000 cursor-pointer hover:color-#1677ff"
        />
        <span class="ml-2 text-#666 text-12px">配置校验规则</span>
      </div>
    </template>
    <div class="" v-if="modelValue.length">
      <div v-for="item in formItemRulePropsJson" class="mb-2">
        <ImsDesignerCustomizationProp
          v-bind="item"
          v-model:value="modelValue[currentIndex][item.field]"
        ></ImsDesignerCustomizationProp>
      </div>
    </div>
  </a-drawer>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";
import { nanoid } from "nanoid";
import type { Rule } from "ant-design-vue/es/form";
import { useDraggable } from "vue-draggable-plus";
import formItemRulePropsJson from "./data/rule-props.json";

import ImsDesignerCustomizationProp from "./customization-prop.vue";

type FormItemRule = Rule & {
  // ID
  id: string;
};
interface ImsDesignerCustomizationRulesProps {}

const COMPONENT_NAME = "ImsDesignerCustomizationRules";

defineOptions({
  name: COMPONENT_NAME,
});

defineProps<ImsDesignerCustomizationRulesProps>();

const currentIndex = ref(0);
const opening = ref(false);

const { prefixCls } = useStyle("designer-customization-rules");
const draggableRef = ref<HTMLElement>();
const modelValue = defineModel<FormItemRule[]>("value", {
  default: [],
});

const drawerHeaderStyle = {
  padding: "12px 8px",
};

useDraggable(draggableRef, modelValue, {
  animation: 150,
  handle: ".handler",
  ghostClass: "ghost",
});

const addItem = () => {
  let itemId = nanoid();
  modelValue.value.push({
    id: itemId,
    required: false,
    message: "校验提示信息",
    trigger: ["change", "blur"],
    type: "string",
  });
};
const onDeleteItem = (index: number) => {
  modelValue.value.splice(index, 1);
};
const onConfigRule = (index: number) => {
  currentIndex.value = index;
  opening.value = true;
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-customization-rules";

.@{prefix-cls} {
  background-color: #eeeeee;
  --at-apply: w-full p-2 rd;
  &-item {
    background-color: #fff;
    --at-apply: "w-full rd p-2 mb-2 flex justify-between items-center";
  }
}
</style>
