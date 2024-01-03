<template>
  <div :class="prefixCls">
    <a-space :size="3">
      <div v-if="modelVisibleToggler === true">
        <icon
          @click="toggleShowContent"
          :icon="`ant-design:${modelVisible ? 'down' : 'up'}-outlined`"
          color="#0000004f"
        ></icon>
      </div>
      <div v-if="modelApplyToggler === true">
        <a-checkbox
          v-model:checked="modelApply"
          @change="onApplyTogglerChange"
        ></a-checkbox>
      </div>
      <div
        class="cursor-pointer flex items-center text-13px text-#4e5969"
        @click="toggleShowContent"
      >
        <a-tooltip
          v-if="tooltip !== undefined"
          v-bind="
            Object.assign(
              {
                arrowPointAtCenter: true,
                placement: 'top',
              },
              tooltip
            ) || {}
          "
        >
          <div class="flex items-center border-b-dashed border-b-1 box-border">
            {{ label }}
          </div>
        </a-tooltip>

        <div v-else class="flex items-center box-border">
          {{ label }}
        </div>
      </div>
      <div
        class="text-12px text-#0000004f italic cursor-pointer"
        @click="toggleShowContent"
      >
        {{ field }}
      </div>
    </a-space>
    <div>
      <div
        class="b border-solid border-#e5e6eb p-2px flex justify-center items-center"
      >
        <icon icon="tabler:code" color="#0000004f"></icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import ImsJsonViewer from "@imsjs/ims-ui-components/json-viewer";
import { useStyle } from "@imsjs/ims-ui-hooks";
import { ref } from "vue";

const COMPONENT_NAME = "ImsDesignerCustomizationPropHeader";
defineOptions({
  name: COMPONENT_NAME,
});

interface ImsDesignerCustomizationPropHeaderProps {
  /** 文本 */
  label?: string;
  /** 字段 */
  field?: string;
  /** 说明提示文字 */
  tooltip?: Record<string, string>;
}

const {
  label = "label",
  field = "field",
  // toggler,
  tooltip,
} = defineProps<ImsDesignerCustomizationPropHeaderProps>();

const emits = defineEmits<{
  applyChange: [apply: boolean];
}>();

const { prefixCls } = useStyle("designer-customization-prop-header");

const modelApply = defineModel<boolean>("apply", {
  default: false,
});

const toggleShowContent = () => {
  modelVisibleToggler.value && (modelVisible.value = !modelVisible.value);
};

const modelVisibleToggler = defineModel<boolean | undefined>("visibleToggler", {
  default: false,
});

const modelApplyToggler = defineModel<boolean | undefined>("applyToggler", {
  default: false,
});

const modelVisible = defineModel<boolean | undefined>("visible", {
  default: true,
});

const onApplyTogglerChange = () => {
  if (modelVisibleToggler.value === true) {
    if (modelApply.value === true) {
      modelVisible.value = true;
    }
  }
  emits("applyChange", modelApply.value);
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-customization-prop-header";

.@{prefix-cls} {
  // border: 1px solid red;
  --at-apply: "w-full flex justify-between items-center mb-1 py-1 px-0";
}
</style>
