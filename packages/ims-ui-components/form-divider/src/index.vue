<template>
  <div :class="prefixCls"><span class="font-italic">{{ title }}</span></div>
</template>
<script lang="ts" setup>

import { useStyle } from "@imsjs/ims-ui-hooks";

import { ImsFormDividerProps } from "@imsjs/ims-ui-types";

const { prefixCls } = useStyle("form-divider");
const COMPONENT_NAME = "ImsFormDivider";
defineOptions({
  name: COMPONENT_NAME,
});

// const loading = ref(false);
const { title = '', dashed = false } = defineProps<ImsFormDividerProps>();

</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-form-divider";

.@{prefix-cls} {
  --at-apply: w-full py-1;
  border-bottom: 1px dashed #d9d9d9;
}
</style>
