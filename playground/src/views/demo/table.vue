<template>
  <div class="box-border">
    <ims-table :lists="dataSource" :columns="columns"></ims-table>

    <!-- <a-table :dataSource="dataSource" :pagination="false" :columns="columns" /> -->
  </div>
</template>

<script lang="ts" setup>
// import { VueDraggable } from 'vue-draggable-plus';
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
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

<style scoped></style>
