<template>
  <a-button v-bind="$attrs" :class="[prefixCls, { gapless: props.gapless }]">
    <template #icon v-if="props.icon">
      <span :class="`${prefixCls}-icon mr-1`"
        ><icon :icon="props.icon" :inline="true"
      /></span>
    </template>

    <template v-if="props.text">{{ props.text }}</template>

    <slot v-else></slot>
  </a-button>
</template>

<script lang="ts" setup>
import { Button as AButton } from "ant-design-vue";
import { Icon } from "@iconify/vue";
import { useStyle } from "@imsjs/ims-ui-hooks";
import type { ImsButtonProps } from "@imsjs/ims-ui-types";

const COMPONENT_NAME = "ImsButton";
defineOptions({
  name: COMPONENT_NAME,
});

const props = defineProps<ImsButtonProps>();
const { prefixCls } = useStyle("button");
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-button";

.@{prefix-cls} {
  // border: 1px solid red;
}

.@{prefix-cls}.gapless {
  padding: 0 2px;
}
</style>
