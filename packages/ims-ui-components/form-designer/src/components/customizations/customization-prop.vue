<template>
  <div :class="prefixCls">
    <ImsDesignerCustomizationPropHeader
      v-bind="$attrs"
      :visible-toggler="visibilityToggler"
      v-model:visible="modelVisible"
      :apply="modelApply"
      :apply-toggler="applyToggler"
      @apply-change="onApplyChange"
    ></ImsDesignerCustomizationPropHeader>
    <div :class="`${prefixCls}-content`" v-show="modelVisible">
      <component
        :is="
          Object.prototype.hasOwnProperty.call(
            customizationPropComponents,
            component.name
          )
            ? customizationPropComponents[component.name]
            : component.name
        "
        v-bind="component.props || {}"
        v-model:[component.vModelField]="modelValue"
      ></component>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

import type { Component } from "vue";

import ImsDesignerCustomizationPropHeader from "./customization-prop-header.vue";

import ImsDesignerCustomizationEvents from "./customization-events.vue";
import ImsDesignerCustomizationFieldNames from "./customization-field-names.vue";
import ImsDesignerCustomizationOptions from "./customization-options.vue";
import ImsDesignerCustomizationRules from "./customization-rules.vue";

const COMPONENT_NAME = "ImsDesignerCustomizationProp";
defineOptions({
  name: COMPONENT_NAME,
});

interface ImsDesignerCustomizationPropProps {
  /**  类型 */
  type?: string;
  /** 组件 */
  component: Record<string, any>;
  /** 显隐切换器 */
  visibilityToggler?: boolean;
  /** 应用开关 */
  applyToggler?: boolean;
}

// props 配置组件
const customizationPropComponents: Record<string, Component> = {
  ImsDesignerCustomizationEvents,
  ImsDesignerCustomizationFieldNames,
  ImsDesignerCustomizationOptions,
  ImsDesignerCustomizationRules,
};

const {
  visibilityToggler = false,
  applyToggler = false,
  component = {
    name: "AInput",
    vModelField: "value",
    props: {
      placeholder: "请输入占位提示",
    },
  },
} = defineProps<ImsDesignerCustomizationPropProps>();

const { prefixCls } = useStyle("designer-customization-prop");

const modelVisible = defineModel<boolean>("visible", {
  default: true,
});

const modelValue = defineModel("value");

const modelApply = defineModel<boolean>("apply", {
  default: false,
});

const onApplyChange = (apply: any) => {
  modelApply.value = apply;
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-customization-prop";

.@{prefix-cls} {
  --at-apply: w-full;

  &-header {
    --at-apply: "flex justify-between items-center mb-1";
  }

  &-content {
    --at-apply: w-full px-1;
    // background-color: #eeeeee;
    // border: 1px solid red;
  }
}
</style>
