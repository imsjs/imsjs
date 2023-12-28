<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-header-left`">
        <a-space>
          <div
            class="text-13px text-#4e5969 cursor-pointer"
            @click="toggleShowContent"
          >
            <icon
              :icon="`ant-design:${showContent ? 'down' : 'up'}-outlined`"
              color="#0000004f"
            ></icon>
          </div>
          <div class="text-13px text-#4e5969">
            <a-checkbox
              v-model:checked="configing"
              @change="onConfigingChange"
            ></a-checkbox>
          </div>
          <div class="text-13px text-#4e5969">
            <a-tooltip
              title="当您传入的数据源的字段不是组件期望的字段时，可以使用该属性进行自定义映射。默认值：{ label: label, value: value, children: children }"
            >
              <div @click="toggleShowContent" class="cursor-pointer">
                <span class="py-1 border-b-dashed border-b-1">
                  数据源的字段映射</span
                >
                <span class="ml-1 text-12px text-#0000004f italic"
                  >fieldNames</span
                >
              </div>
            </a-tooltip>
          </div>
        </a-space>
      </div>

      <div :class="`${prefixCls}-header-right`">
        <div class="b border-solid border-#e5e6eb p-2px">
          <icon icon="tabler:code" color="#0000004f"></icon>
        </div>
      </div>
    </div>
    <div :class="`${prefixCls}-content`" v-show="showContent">
      <div v-for="(key, field, index) in modelValue" class="my-1" :key="index">
        <div class="flex justify-between items-center mb-1">
          <div>
            <span class="text-13px text-#4e5969">{{
              fieldNamesTexts[field]
            }}</span>
            <span class="ml-1 text-12px text-#0000004f italic">{{
              field
            }}</span>
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
  </div>
</template>
<script lang="ts" setup>
import ImsJsonViewer from "@imsjs/ims-ui-components/json-viewer";
import { useStyle } from "@imsjs/ims-ui-hooks";

const COMPONENT_NAME = "ImsDesignerCustomizationFieldNames";
defineOptions({
  name: COMPONENT_NAME,
});

interface ImsDesignerCustomizationFieldNamesProps {
  /**  类型 */
  type?: string;
}

const { type = "Cascader" } =
  defineProps<ImsDesignerCustomizationFieldNamesProps>();

const { prefixCls } = useStyle("designer-customization-field-names");

const showContent = ref<boolean>(false);

const configing = ref(false);

const toggleShowContent = () => {
  showContent.value = !showContent.value;
};

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

const onConfigingChange = (e: Event) => {
  console.info("e =>", e, configing.value);
  if (configing.value === true) {
    showContent.value = true;
  }
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-customization-field-names";

.@{prefix-cls} {
  //   border: 1px solid red;

  --at-apply: w-full;

  &-header {
    --at-apply: "flex justify-between items-center mb-1";
  }

  &-content {
    // --at-apply: w-full py-2 px-2;
    // background-color: #eeeeee;
    // border: 1px solid red;
  }
}
</style>
