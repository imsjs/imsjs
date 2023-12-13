<template>
  <div :class="prefixCls">
    <ims-form-designer :events="['aa']"></ims-form-designer>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui";

const { prefixCls } = useStyle("designer-demo");
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-demo";

.@{prefix-cls} {
  --at-apply: h-full w-full;
}
</style>
