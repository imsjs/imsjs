<template>

  <VueDraggable :class="prefixCls" group="components" tag="div" v-model="list">
    
 
    <div
    
      v-for="element in modelValue"
      :key="element.id"
      :class="['item', { active: element.id === activeItem.id,filtered:element.type === 'grid-layout-col','py-2':element.type === 'grid-layout-col','mb-24px':element.type === 'grid-layout' }]"
      @click.stop.prevent="onActiveItem(element)"
    >
      <div class="tool-bar" :style="{display: element.id === activeItem.id ? 'block':'none'}" >
        <div class="flex items-center justify-between w-full">
          <div class="text-#0000004f text-12px">
            {{ element.type }}
          </div>
          <div class="flex items-center">
            <div class="action">
              <icon
                icon="uiw:component"
                class="text-#fff"
                :inline="true"
              ></icon>
              <span class="text-#fff ml-1">{{ element.title }}</span>
            </div>
            <div class="action" @click.stop="copyItem(element, index)">
              <icon icon="ant-design:copy-outlined"></icon>
            </div>
            <div class="action">
              <icon icon="tabler:arrows-move"></icon>
            </div>
            <div class="action" @click.stop="deleteItem(element, index)">
              <icon icon="wpf:delete"></icon>
            </div>
          </div>
        </div>
      </div>
      <!-- ||  (element.type === 'grid-layout-col' && element.children.length === 1) -->
      <template v-if="element.hasOwnProperty('children')">
        <nested-draggable @delete="deleteItem" class="children-item" v-model="element.children" :disabled="element.type === 'grid-layout'" filter=".filtered" />
        <div class="add-col-action flex items-center justify-center " v-if="element.type === 'grid-layout'"  >
          
          <a-space>
            <span class="text-#0000004f text-10px">----</span>
            <span class="text-#0000004f text-10px cursor-pointer hover:color-#1890ff" @click="onAddCol(element)">添加列</span>
            <span class="text-#0000004f text-10px">----</span>
          </a-space>
        </div>
      </template>

      <a-form-item
        v-else
        v-bind="Object.assign({ label: element.title }, element.item)"
      >
      
        <component
          :is="element.component.componentName || 'AInput'"
          v-bind="element.component.props"
        ></component>
      </a-form-item>
    </div>
  </VueDraggable>
</template>
<script setup lang="ts">
import { useStyle } from "@imsjs/ims-ui-hooks";
import { VueDraggable } from "vue-draggable-plus";
import { computed } from "vue";

import { StorageSerializers, useStorage } from '@vueuse/core'

const activeItem =  useStorage('active-item',null, undefined, { serializer: StorageSerializers.object });

interface IList {
  id: string;
  title: string;
  children: IList[];
}

interface Props {
  modelValue: IList[];
}

const COMPONENT_NAME = "NestedDraggable";
defineOptions({
  name: COMPONENT_NAME,
});

const { prefixCls } = useStyle("nested-draggable");

const props = defineProps<Props>();



const emits = defineEmits<{
  'update:modelValue': [value: IList[]],
  'delete': [item:any],
  'copy': [item:any],
  'addCol': [item:any]
}>();

const list = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});


const deleteItem = (item:any) => {
  console.info('deleteItem =>',item);

  emits('delete',item);

}

const copyItem = (item:any) => {
  console.info('copyItem =>',item);

  emits('copy',item);

}


const onAddCol = (item:any) => {
  console.info('onAddCol =>',item);
  emits('addCol',item);
}

const onActiveItem = (item: any) => {
  console.info('onActiveItem =>',item);
  activeItem.value = item;
};
</script>
<style scoped>

.ims-nested-draggable {
  min-height: 60px;
  
  padding: 0;
  margin: 0;
}
.item {
  /* border: 1px solid red;  mb-24px */
  

  --at-apply: w-full;

  &:hover {
    outline: 1px dashed #1890ff;
  }

  &.active {
    outline: 2px solid #1890ff;
    position: relative;
  }

  .tool-bar {
    position: absolute;
      top: -23px;
    background-color: transparent;
    --at-apply: w-full  flex justify-end;
    display: none;
    .action {
      border-radius: 2px;
      font-size: 12px !important;
      display: flex;
      align-items: center;
      padding: 0 3px;
      height: 20px;
      background-color: #1890ff;
      margin-left: 2px;
      color: #fff;
      cursor: pointer;
      &:hover {
        background-color: #40a9ff;
      }
    }
  }
}
.children-item {
  --at-apply: flex flex-1 w-full;
  /* background-color: #f0f0f0; */
  border: 1px #d9d9d9 dashed;
  &:hover {
    outline: 1px dashed #1890ff;
  }
}

.ims-nested-draggable.children-item {

  .item {
    /* background-color: red; */

    .ims-nested-draggable.children-item {
      /* border: 1px solid red; */
      /* background-color: red; */

      &:has(.item) {
        &::after {
          display: none;
        }
      }

      &::after {
        content: '网络列';
       
        width: 100%;
        background-color: #F0F0F0;
        /* padding: 16px; */

        --at-apply: flex items-center justify-center text-#0000004f text-12px;

      }
    }

    
  }
  
  
}
</style>
