<template>
  <a-modal
    :class="prefixCls"
    v-bind="$attrs"
    centered
    width="68%"
    :maskClosable="false"
  >
    <template v-for="(_, name) in $slots" v-slot:[name]="slotProps">
      <div
        :key="name"
        v-if="name === 'default'"
        :class="`${prefixCls}-wrapper`"
        :style="{ height: height }"
      >
        <div :class="`${prefixCls}-wrapper-content`">
          <slot :name="name" v-bind="slotProps || {}"></slot>
        </div>
      </div>
      <template v-else-if="name === 'title'">
        <div :class="`${prefixCls}-title`">
          <div ref="modalTitleRef" style="width: 100%; cursor: move">
            <slot :name="name" v-bind="slotProps || {}"></slot>
          </div>
        </div>
      </template>

      <slot v-else :name="name" v-bind="slotProps || {}"></slot>
    </template>

    <template #modalRender="{ originVNode }">
      <div :style="transformStyle">
        <component :is="originVNode" />
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";
import { useDraggable } from "@vueuse/core";
import { CSSProperties } from "vue";
import { ImsModalProps } from "@imsjs/ims-ui-types";

const props = defineProps<ImsModalProps>();

const { height = "550px", draggable = false } = props;

defineOptions({
  name: "ImsModal",
});
const { prefixCls } = useStyle("modal");

const modalTitleRef = ref<HTMLElement>();

const { x, y, isDragging } = useDraggable(modalTitleRef);

const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value.getBoundingClientRect();
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom = bodyRect.height - titleRect.height;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-modal";

.@{prefix-cls} {
  //border:1px solid red;

  &-title {
    // border: 1px solid red;
  }

  &-wrapper {
    //border: 1px solid red;
    box-sizing: border-box;
    overflow: hidden;
    &-content {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 0 8px;
      // border: 1px solid red;

      // &::-webkit-scrollbar {
      //   display: none;
      // }
    }
  }
}
</style>
