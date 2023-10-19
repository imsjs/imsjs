<template>
  <div :class="prefixCls">icon-picker</div>
</template>

<script lang="ts" setup>
import type { IconPickerProps } from "@imsjs/ims-ui-types";
import { useStyle } from "@imsjs/ims-ui-hooks";
const COMPONENT_NAME = "ImsIconPicker";
defineOptions({
  name: COMPONENT_NAME,
});

withDefaults(defineProps<IconPickerProps>(), {
  height: () => 400,
});
const { prefixCls } = useStyle("icon-picker");
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-icon-picker";

.@{prefix-cls} {
  border: 1px dashed gray;
  --at-apply: p-2 mb-2;
  overflow: auto;
}
</style>
