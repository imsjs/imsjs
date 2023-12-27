<template>
  <div class="wh-full">
    <ImsJsonViewer :data="dataSourceTest"></ImsJsonViewer>
    <div>
      <vue-draggable
      v-model="dataSourceTest"
      class="aa-xx"
      :animation="150"
      target=".ant-table-tbody"
      draggable=".ant-table-row"
    >
 
      <a-table
        :dataSource="dataSourceTest"
        :columns="columns"
        :scroll="{ y: 400 }"
      />
    </vue-draggable>
     <!-- <ImsTable  :columns="columns" rowKey="id" v-model:lists="dataSourceTest" :sortable="true"></ImsTable> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ImsJsonViewer, ImsTable } from "@imsjs/ims-ui-components";
import { VueDraggable } from "vue-draggable-plus";
import { SortableEvent } from "sortablejs";


const onEnd = (e:SortableEvent) =>{
  console.info('onEnd e =>',e);
  console.info('dataSource.value =>',dataSource.value);
}

const onCustomUpadte = (evt: SortableEvent) => {
  console.info('customUpadte =>',evt);
}


const tblScroll = ref({
  x:'max-content',
});

const dataSourceTest = ref<object[]>([
  {
    id:1,
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    id:2,
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号222222",
  },
  {
    id:3,
    key: "3",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号3333",
  },
  {
    id:4,
    key: "4",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号4444",
  },
]);

const dataSource = [
  {
    id:1,
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    id:2,
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号222222",
  },
  {
    id:3,
    key: "3",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号3333",
  },
  {
    id:4,
    key: "4",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号4444",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];
</script>
