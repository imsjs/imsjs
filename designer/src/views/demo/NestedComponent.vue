<template>
  <VueDraggable class="drag-area"  group="components" tag="ul" v-model="list">
    <li v-for="element in modelValue" :key="element.id" :class="['item']" >

         <template v-if="element.hasOwnProperty('children')">
        <nested-component class="children-item"  v-model="element.children" />
      </template>

      <component
        v-else
          :is="element.component.componentName || 'AInput'"
          v-bind="element.component.props"
        ></component>
        
      
      
    </li>
  </VueDraggable>
</template>
<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { computed } from 'vue'

interface IList {
    id:string;
  title: string;
  children: IList[];
}

interface Props {
  modelValue: IList[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: IList[]): void
}

const emits = defineEmits<Emits>()
const list = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
</script>
<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
  padding: 0;
  margin: 0;
}
.item {
    /* border: 1px solid red; */
    list-style: none;

    --at-apply: w-full;
    
}
.children-item {
    
    --at-apply: flex flex-1;
}
</style>

