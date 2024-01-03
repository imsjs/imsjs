<template>
  <div :class="prefixCls">
    <a-space :size="3">
      <div v-if="modelToggler === true">
        <icon
          @click="toggleShowContent"
          :icon="`ant-design:${showContent ? 'down' : 'up'}-outlined`"
          color="#0000004f"
        ></icon>
      </div>
      <div v-if="modelToggler === true">
        <a-checkbox
          v-model:checked="configing"
          @change="onConfigingChange"
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

// /** 切换器 */
//   toggler?: boolean;

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

const { prefixCls } = useStyle("designer-customization-prop-header");

const configing = ref(false);

const toggleShowContent = () => {
  modelToggler.value && (showContent.value = !showContent.value);
};

const modelToggler = defineModel<boolean | undefined>("toggler", {
  default: false,
});

const showContent = defineModel<boolean | undefined>("show", {
  default: false,
});

const onConfigingChange = (e: Event) => {
  console.info("e =>", e, configing.value);
  if (modelToggler.value === true) {
    if (configing.value === true) {
      showContent.value = true;
    }
  } else {
    return;
  }
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-customization-prop-header";

.@{prefix-cls} {
  // border: 1px solid red;
  --at-apply: "w-full flex justify-between items-center mb-1 py-1 px-0";
}
</style>
