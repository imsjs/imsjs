<template>
  <div  :class="`${prefixCls}-wrapper`" ref="vtableWrapperRef" >
    
    <!-- <ImsJsonViewer :data="dataSource"></ImsJsonViewer> -->
    <div ref="vtableRef" v-element-size="onVtableRefResize"  :class="prefixCls"></div>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";
import { ListTable,TYPES,themes } from "@visactor/vtable";

import { useElementSize } from '@vueuse/core';

import { vElementSize } from '@vueuse/components';

import { ImsVtableProps } from "@imsjs/ims-ui-types";
import ImsJsonViewer from "@imsjs/ims-ui-components/json-viewer";

const COMPONENT_NAME = "ImsVtable";
defineOptions({
  name: COMPONENT_NAME,
});



const { prefixCls } = useStyle("v-table");

const vtableRef = ref();

const vtableInstance = ref();

const vtableWrapperRef = ref(null);

const { width, height } = useElementSize(vtableWrapperRef);

const onVtableRefResize = ({ width, height }: { width: number; height: number }) => {
  // console.info('onVtableRefResize => width',width);
  // console.info('onVtableRefResize => height',height);
}


const { api, params,options } = defineProps<ImsVtableProps>();




(async function initialization() {
  console.info('initialization.options =>',options);
  console.info('initialization.vtableRef =>',vtableRef.value);
})();

onMounted(()=>{
  console.info('onMounted =>');

  console.info('props.options =>',options);
  

  vtableInstance.value = new ListTable(vtableRef.value, options);
});

</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-v-table";

.@{prefix-cls}-wrapper {
  --at-apply: w-full h-full box-border;
}

.@{prefix-cls} {
  --at-apply: w-full  h-full box-border;
}

</style>
