<template>
  <div class="layouts-default flex box-border">
    <div class="left">
      <a-menu
          id="dddddd"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          
          mode="inline"
          theme="dark"
          @click="handleClick"
        >
          <a-sub-menu key="sub1" @titleClick="titleClick">
            <template #title>Navigation One</template>
            <a-menu-item-group key="g1">
              <template #title>Item 1</template>
              <a-menu-item key="1">Option 1</a-menu-item>
              <a-menu-item key="2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group key="g2" title="Item 2">
              <a-menu-item key="3">Option 3</a-menu-item>
              <a-menu-item key="4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-sub-menu key="sub2" @titleClick="titleClick">
            <template #title>Navigation Two</template>
            <a-menu-item key="5">Option 5</a-menu-item>
            <a-menu-item key="6">Option 6</a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="7">Option 7</a-menu-item>
              <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <template #title>Navigation Three</template>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-menu>
    </div>
    <div class="main flex-1 box-border p-2"><router-view></router-view></div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, watch } from 'vue';


const selectedKeys = ref<string[]>(['1']);
      const openKeys = ref<string[]>(['sub1']);
      const handleClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
      };
      const titleClick = (e: Event) => {
        console.log('titleClick', e);
      };
      watch(
        () => openKeys,
        (val) => {
          console.log('openKeys', val);
        }
      );

</script>

<style scoped>
.layouts-default {
  width: 100%;
  height: 100%;
  padding:0;
  margin:0;

  .left {
    width: 200px;
  }


  .main {
    border: 1px solid red;
    width: calc(100% - 200px);
    overflow: hidden;
  }
}
  
</style>
