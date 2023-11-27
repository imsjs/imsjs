<template>
  <div class="flex flex-col">
    <div class="flex">
      <div >
        <Simplebar>

       
        <VueDraggable
      
      v-model="componentLists"
      :sort="false"
      :group="{ name: 'components', pull: 'clone', put: false }"
      :clone="cloneComponent"
 
      :animation="600"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
     
    >
      <div
        v-for="item in componentLists"
        :key="item.type"
        class="cursor-move h-30 bg-gray-500/5 rounded p-3 cursor-move"
      >
        {{ item.title }}
      </div>
    </VueDraggable>
     </Simplebar>
      </div>
      <div class="w-full">
        <nested-draggable v-model="list" class="w-full"></nested-draggable>
      </div>
      
    </div>
    

    <ImsJsonViewer :data="list"></ImsJsonViewer>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NestedDraggable from './NestedComponent.vue'
import { ImsJsonViewer } from '@imsjs/ims-ui-components';

import { VueDraggable } from 'vue-draggable-plus'
import { cloneDeep } from "lodash-es";
import { nanoid } from "nanoid";
import componentListsJson from "@/assets/jsons/component-lists.json";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";


const componentLists = ref(componentListsJson);


const list = ref([
  
]);

const cloneComponent = (item:any) => {
  console.info('item =>',item);

  let tmpItem = cloneDeep(item);

  tmpItem.id = nanoid();

  console.info('tmpItem =>',tmpItem);

  return tmpItem;


}



</script>