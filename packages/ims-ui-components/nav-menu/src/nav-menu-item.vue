<template>
  <a-sub-menu
    v-bind="$attrs"
    v-if="children && children.length"
    :key="`${data[fieldNames.value]}-${
      breadCrumb === true ? currentIndex : 'BC'
    }`"
    :class="{ 'bread-crumb': breadCrumb }"
  >
    <template #icon>
      <icon :icon="data[fieldNames.icon]" :inline="true" />
    </template>
    <template #title>
      {{ data[fieldNames.label] }}
      <icon v-if="breadCrumb" icon="ant-design:down-outlined" :inline="true" />
    </template>
    <nav-menu-item
      v-for="(item, index) in children"
      :data="item"
      :props="fieldNames"
      :key="`${data[fieldNames.value]}-${
        breadCrumb === true ? currentIndex : 'BC'
      }`"
      :currentIndex="breadCrumb ? index : undefined"
    ></nav-menu-item>
  </a-sub-menu>
  <!-- :id="data[fieldNames.value].toString()" -->
  <a-menu-item
    v-bind="$attrs"
    :label="`${data[fieldNames.label]}`"
    :title="`${data[fieldNames.label]}`"
    :data-node="data"
    :key="`${data[fieldNames.value]}-${
      breadCrumb === true ? currentIndex : 'BC'
    }`"
    v-else
  >
    <template #icon>
      <icon :icon="data[fieldNames.icon]" :inline="true" />
    </template>
    <span>{{ data[fieldNames.label] }}</span>
  </a-menu-item>
</template>

<script lang="ts" setup>
import { NavMenuItemProps } from "@imsjs/ims-ui-types";
const COMPONENT_NAME = "ImsNavMenuItem";
defineOptions({
  name: COMPONENT_NAME,
});

const {
  data = {},
  breadCrumb,
  currentIndex,
  fieldNames = {
    children: "children",
    label: "label",
    value: "value",
    icon: "icon",
    leaf: "leaf",
    disabled: "disabled",
    level: "level",
  },
} = defineProps<NavMenuItemProps>();

// const { data, breadCrumb, currentIndex, fieldNames }  = withDefaults(defineProps<NavMenuItemProps>(), {
//   data: () => {
//     return {};
//   },
//   breadCrumb: () => false,
//   currentIndex: undefined,
//   fieldNames: () => {
//     return {
//       children: "children",
//       label: "label",
//       value: "value",
//       icon: "icon",
//       leaf: "leaf",
//       disabled: "disabled",
//       level: "level",
//     };
//   },
// });

// const { data, breadCrumb, currentIndex, fieldNames } = toRefs(props);
let children = computed(() => {
  return data[fieldNames.children] || false;
});
</script>

<style lang="less">
.bread-crumb-menu {
  border-bottom: none;

  .ant-menu-submenu {
    //padding-inline: 12px;
    &:hover {
      &:after {
        border-bottom-width: 2px;
        border-bottom-color: transparent !important;
      }
    }
  }

  .ant-menu-submenu-open {
    &:after {
      border-bottom-color: transparent !important;
    }
  }

  .ant-menu-item {
    &:hover {
      &:after {
        border-bottom-color: transparent !important;
      }
    }
  }

  .bread-crumb {
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.45);

    &:before {
      display: inline-block;
      content: "/";
      position: absolute;
      right: 0;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
