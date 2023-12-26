<template>
  <tbody class="sortable-wrapper" :class="prefixCls" ref="sortableWrapperRef">
    <slot></slot>
  </tbody>
</template>

<script lang="ts" setup>
import Sortable from "sortablejs";
import { useStyle } from "@imsjs/ims-ui-hooks";
import { ref, onMounted } from "vue";

import type { SortableProps } from "@imsjs/ims-ui-types";

const COMPONENT_NAME = "ImsTableSortable";
defineOptions({
  name: COMPONENT_NAME,
});

const { prefixCls } = useStyle("table-sortable");

const props = withDefaults(defineProps<SortableProps>(), {
  rowKey: "key",
  animation: 600,
  dragHandler: undefined,
});

const sortableWrapperRef = ref<HTMLElement | null>(null);

const emit = defineEmits<{
  dragEnd: [
    dragEvent: DragEvent,
    /**
     * 索引值
     */
    indexs: {
      newDraggableIndex: number;
      newIndex: number;
      oldDraggableIndex: number;
      oldIndex: number;
    },
    /**
     * 排序后的 keys
     * @description 排序后的 keys
     */
    keys: string[] | number[],
  ];
}>();

//

const sortable = ref();

onMounted(() => {
  sortable.value = Sortable.create(sortableWrapperRef.value as HTMLElement, {
    handle: props.dragHandler,
    dataIdAttr: "data-row-key",
    animation: props.animation,
    direction: "vertical",
    scroll: true,

    // handle: '.draggables',
    onEnd: onDragEnd,
  });
});

const onDragEnd = (event: any) => {
  console.info("sortable.value.toArray() =>", sortable.value.toArray());
  emit(
    "dragEnd",
    event.originalEvent,
    {
      newDraggableIndex: event.newDraggableIndex,
      newIndex: event.newIndex,
      oldDraggableIndex: event.oldDraggableIndex,
      oldIndex: event.oldIndex,
    },
    sortable.value.toArray()
  );
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-table-sortable";

.@{prefix-cls} {
  :deep(.handler) {
    // border: 1px solid red;
    cursor: move;
    &::before {
      content: "::";
      // font-size: 16px;
      margin-right: 8px;
      font-weight: 600;
      width: 20px;
      height: 20px;

      line-height: 100%;
      text-align: center;
    }
    // background-color: red;
  }
  :deep(.sortable-ghost) {
    td {
      border-top: 2px solid #1677ff;
      // background-color: #1677ff;
      cursor: move;
    }
  }
}
</style>