<template>
  <div class="box-border">
    <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="Please select"
          :options="tmpOptions"
        ></a-select>
  
  </div>
</template>

<script lang="ts" setup>

const tmpOptions = [
  {
    value: "选项一",
    label: "选项一",
  },
  {
    value: "选项二",
    label: "选项二",
  },
];
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
