<template>
  <div :class="prefixCls" :style="`max-height: ${height}px;`">
    <a-typography-text strong>{{ title }}</a-typography-text>
    <vue-json-pretty v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import { ImsJsonViewerProps } from "@imsjs/ims-ui-types";
import { useStyle } from "@imsjs/ims-ui-hooks";
const COMPONENT_NAME = "ImsJsonViewer";
defineOptions({
  name: COMPONENT_NAME,
});

withDefaults(defineProps<ImsJsonViewerProps>(), {
  height: () => 400,
});
const { prefixCls } = useStyle("json-viewer");
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-json-viewer";

.@{prefix-cls} {
  border: 1px dashed gray;
  --at-apply: p-2 mb-2;
  overflow: auto;
}
</style>
