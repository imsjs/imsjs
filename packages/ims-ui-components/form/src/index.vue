<template>
  <a-form v-bind="$attrs" :class="prefixCls">
    <a-row :gutter="[8, 8]" :class="`${prefixCls}-row`">
      <ims-form-item
        v-bind="$attrs"
        :eoPrefix="props.eoPrefix"
        :layout="$attrs.layout"
        :validateInfos="props.validateInfos"
        :item="item"
        :model="$attrs.model || {}"
        :key="key"
        v-for="(item, key) in props.items"
      >
      </ims-form-item>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import type { ImsFormProps } from "@imsjs/ims-ui-types";
import { useStyle } from "@imsjs/ims-ui-hooks";
import ImsFormItem from "./form-item.vue";
const COMPONENT_NAME = "ImsForm";
defineOptions({
  name: COMPONENT_NAME,
});
const { prefixCls } = useStyle("form");

const props = withDefaults(defineProps<ImsFormProps>(), {});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-form";

.@{prefix-cls} {
  --at-apply: w-full flex;
  &-row {
    --at-apply: flex-1;
    box-sizing: border-box;
  }
}
</style>
