<template>
  <div  :class="prefixCls" >
    <overlay-scrollbars-component
      ref="scrollbarRef"
      :style="cpStyle"
      :options="cpOptions"
      @os-scroll="onScroll"
    >
      <slot></slot>
    </overlay-scrollbars-component>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

import 'overlayscrollbars/overlayscrollbars.css';

const COMPONENT_NAME = "ImsOverlayScrollbar";
defineOptions({
  name: COMPONENT_NAME,
});

const props = defineProps({
    height: {
        type: [Number, String],
        default: '100%',
    },
    maxHeight: {
        type: [Number, String],
    },
    always: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['scroll'])
const { prefixCls } = useStyle("overlay-scrollbar");
const scrollbarRef = ref()

const cpStyle = computed(() => {
    return {
        height: formatUnit(props.height),
        maxHeight: formatUnit(props.maxHeight),
    }
})
const cpOptions = computed(() => ({
    scrollbars: {
        // theme:'os-theme-ims',
        autoHide: props.always ? 'never' : 'leave',
        autoHideDelay: 100,
    },
}))

function onScroll(instance, event) {
    emit('scroll', instance, event)
}

function formatUnit(value) {
    return undefined !== value && '' !== value && /.*\d$/.test(value) ? `${value}px` : value
}

function scrollTo(payload) {
    scrollbarRef.value?.osInstance()?.elements()?.viewport?.scrollTo(payload)
}

defineExpose({
    scrollTo,
    instance: scrollbarRef.value,
})


</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-overlay-scrollbar";

.@{prefix-cls} {
  // border: 1px solid red;
  --at-apply: w-full h-full flex justify-center items-center;

  
}
</style>
