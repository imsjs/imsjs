<template>
  <div class="w-full h-full p-0 m-0">
    <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="Please select"
          :options="tmpOptions"
        ></a-select>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

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


</script>

