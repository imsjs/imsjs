<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-header-logo`">LOGO</div>
      <div :class="`${prefixCls}-header-center`">Ims Designer</div>
      <div :class="`${prefixCls}-header-right`">right</div>
    </div>

    <div :class="`${prefixCls}-contents`">
      <div :class="`${prefixCls}-contents-left`">
        <div :class="`${prefixCls}-contents-left-nav-bar`">
          <a-tabs
            tabPosition="left"
            class="h-full"
            :class="`${prefixCls}-contents-left-nav-bar-tabs`"
          >
            <a-tab-pane key="1">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="uiw:component"></icon></div>
                  <div>组件</div>
                </div>
              </template>

              <div
                :class="`${prefixCls}-contents-left-nav-bar-tabs-components`"
              >
                <div
                  :class="`${prefixCls}-contents-left-nav-bar-tabs-components-components`"
                  data-simplebar
                  data-simplebar-auto-hide="false"
                >
                  <div
                    :class="`${prefixCls}-contents-left-nav-bar-tabs-components-components-searcher`"
                  >
                    <a-input-group compact>
                      <a-select placeholder="全部" allowClear class="w-25%">
                        <a-select-option value="form">表单</a-select-option>
                        <a-select-option value="layout">布局</a-select-option>
                      </a-select>
                      <a-input
                        v-model:value="componentKeywords"
                        allowClear
                        placeholder="搜索组件"
                        class="w-75%"
                      >
                        <template #prefix>
                          <icon icon="ant-design:search-outlined"></icon>
                        </template>
                      </a-input>
                    </a-input-group>
                  </div>
                  <Simplebar>
                    <a-row
                      ref="componentsListsRef"
                      :class="`${prefixCls}-contents-left-nav-bar-tabs-components-components-lists`"
                    >
                      <a-col
                        v-for="item in componentLists"
                        :span="12"
                        class="p-1"
                      >
                        <div
                          :class="`${prefixCls}-contents-left-nav-bar-tabs-components-components-lists-item`"
                        >
                          <icon class="icon" :icon="item.icon"></icon>
                          <span class="title">{{ item.title }}</span>
                        </div>
                      </a-col>
                    </a-row>
                  </Simplebar>
                </div>
                <div
                  :class="`${prefixCls}-contents-left-nav-bar-tabs-components-outline`"
                >
                  Outline
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="mdi:file-tree-outline"></icon></div>
                  <div>大纲</div>
                </div>
              </template>

              <div class="tab-wrapper">大纲</div>
            </a-tab-pane>
            <a-tab-pane key="3">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="ri:code-box-line"></icon></div>
                  <div>源码</div>
                </div>
              </template>

              <div class="tab-wrapper">源码</div>
            </a-tab-pane>
            <a-tab-pane key="4">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="uiw:component"></icon></div>
                  <div>记录</div>
                </div>
              </template>

              <div class="tab-wrapper">记录</div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div :class="`${prefixCls}-contents-canvas`">
        <div :class="`${prefixCls}-contents-canvas-tools`">
          <div :class="`${prefixCls}-contents-canvas-tools-left`">
            <a-space>
              <a-radio-group v-model:value="unReDo" class="rgi" size="small">
                <a-radio-button value="undo"
                  ><icon icon="ion:arrow-undo-outline"></icon
                ></a-radio-button>
                <a-radio-button value="redo"
                  ><icon icon="ion:arrow-redo-outline"></icon
                ></a-radio-button>
              </a-radio-group>

              <a-radio-group
                v-model:value="elementTool"
                class="rgi"
                size="small"
                v-if="operationalView === 'design'"
              >
                <a-radio-button value="move">
                  <icon icon="system-uicons:move"></icon
                ></a-radio-button>
                <a-radio-button value="selection"
                  ><icon icon="ph:selection-plus-light"></icon
                ></a-radio-button>
              </a-radio-group>

              <a-radio-group
                v-model:value="targetDevice"
                class="rgi"
                size="small"
              >
                <a-radio-button value="pc"
                  ><icon icon="iconoir:pc-check"></icon
                ></a-radio-button>
                <a-radio-button value="mobile"
                  ><icon icon="clarity:mobile-line"></icon
                ></a-radio-button>
              </a-radio-group>
            </a-space>
          </div>
          <div :class="`${prefixCls}-contents-canvas-tools-right`">
            <a-space>
              <a-radio-group
                v-model:value="fileAction"
                class="rgi"
                size="small"
              >
                <a-radio-button
                  :value="item.value"
                  :key="item.value"
                  v-for="item in fileActions"
                >
                  <icon :icon="item.icon"></icon>
                </a-radio-button>
              </a-radio-group>

              <a-radio-group
                v-model:value="operationalView"
                class="rgi"
                size="small"
              >
                <a-radio-button
                  :value="item.value"
                  :key="item.value"
                  v-for="item in operationalViewActions"
                >
                  <icon :icon="item.icon"></icon>
                </a-radio-button>
              </a-radio-group>
            </a-space>
          </div>
        </div>
        <div :class="`${prefixCls}-contents-canvas-workspace`">
          <div
            :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-design`"
            data-simplebar
            data-simplebar-auto-hide="false"
            v-show="operationalView === 'design'"
          >
            <Simplebar>
              <!-- {{ list.items[0].children }} -->

              <a-form
                :class="`${prefixCls}-contents-canvas-workspace-view-design-form`"
                v-bind="list.items[0].item"
              >
                <nested-draggable
                  @add-col="addGridCol"
                  @delete="deleteItem"
                  @copy="copyItem"
                  :class="`${prefixCls}-contents-canvas-workspace-view-design-form-draggable`"
                  v-model="list.items[0].children"
                ></nested-draggable>
              </a-form>
            </Simplebar>
          </div>
          <div
            :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-json`"
            v-show="operationalView === 'json'"
          >
          
            <ims-json-viewer :data="list" editable></ims-json-viewer>
          </div>
          <div
            :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-code`"
            v-show="operationalView === 'code'"
          >
            {{ list }}
          </div>
          <div
            :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-play`"
            v-show="operationalView === 'play'"
          >
            <ImsFormRenderer ref="testRef" :data="list" />
          </div>
        </div>
      </div>
      <div :class="`${prefixCls}-contents-right`">
        <div :class="`${prefixCls}-contents-right-header`">

          <div :class="`${prefixCls}-contents-right-header-breadcrumb`">
          <a-breadcrumb separator=">">
            <a-breadcrumb-item v-for="breadcrumb in breadcrumbs">{{
              breadcrumb.title
            }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div :class="`${prefixCls}-contents-right-header-tabs-wrapper`">
          <a-tabs centered v-model:activeKey="formComponentProp">
            <a-tab-pane key="form-props" tab="表单属性"> </a-tab-pane>
            <a-tab-pane key="component-props" tab="组件属性"> </a-tab-pane>
          </a-tabs>
        </div>
        
        </div>
        
        <div
          :class="`${prefixCls}-contents-right-props-wrapper`"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          <Simplebar>
            <div v-show="formComponentProp === 'form-props'" class="px-2" >
             
              <div
                class="py-1"
                :key="`form-item-${index}`"
                v-for="(item, index) in activeComponent.formItemProps"
              >
                <div
                  class="text-13px text-#4e5969 mb-1 flex justify-between items-center"
                >
                  <div class="flex items-center">
                    <icon
                      icon="mdi:required"
                      v-if="item.required === true"
                      style="margin-right: 2px; font-size: 8px; color: #ff4d4f"
                      :inline="true"
                    />
                    <a-tooltip v-if="item.tooltip" v-bind="item.tooltip">
                      <span class="py-1 border-b-dashed border-b-1">{{
                        item.label
                      }}</span>
                    </a-tooltip>
                    <span v-else class="py-1">{{ item.label }}</span>
                    <span class="ml-1 text-12px text-#0000004f italic">{{
                      item.field
                    }}</span>
                  </div>
                  <div>
                    <a-button size="small">{}</a-button>
                  </div>
                </div>
                <div class="">
                  <component
                    :is="item.component || 'AInput'"
                    v-model:[item.vModelField]="
                      activeComponent.item[item.field]
                    "
                    v-bind="item.props"
                    
                  ></component>
                </div>
              </div>

            </div>

            <div v-show="formComponentProp === 'component-props'" class="px-2">
             
              <div class="py-1" v-for="item in activeComponent.componentProps">
                <div
                  class="text-13px text-#4e5969 mb-1 flex justify-between items-center"
                >
                  <div>
                    <a-tooltip v-if="item.tooltip" v-bind="item.tooltip">
                      <span class="py-1 border-b-dashed border-b-1">{{
                        item.label
                      }}</span>
                    </a-tooltip>
                    <span v-else class="py-1">{{ item.label }}</span>
                    <span class="ml-1 text-12px text-#0000004f italic">{{
                      item.field
                    }}</span>
                  </div>
                  <div>
                    <a-button size="small">{}</a-button>
                  </div>
                </div>
                <div class="">
                  <component
                    :is="item.component || 'AInput'"
                    v-model:[item.vModelField]="
                      activeComponent.component.props[item.field]
                    "
                    v-bind="item.props"
                  ></component>
                </div>
              </div>
            </div>
          </Simplebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

import type { ImsFormDesignerProps } from "@imsjs/ims-ui-types";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

import { useDraggable } from "vue-draggable-plus";

import { cloneDeep, filter } from "lodash-es";

import { toArray } from "tree-lodash";

import { nanoid } from "nanoid";
import { StorageSerializers, useStorage } from "@vueuse/core";

import NestedDraggable from "./components/nested-draggable.vue";

import componentListsJson from "./data/component-lists.json";
import componentPropsJson from "./data/component-props.json";
import componentEventsJson from "./data/component-events.json";

import formItemPropsJson from "./data/form-item-props.json";
import formPropsJson from "./data/form-props.json";

const componentLists = ref(componentListsJson);

const componentsProps = componentPropsJson;

const activeStorageItem = useStorage("active-item", {id:'0'}, undefined, {
  serializer: StorageSerializers.object,
});

const activeComponent = ref({ id: "0", item: {}, component: { props: {} } });

const props = withDefaults(defineProps<ImsFormDesignerProps>(), {});

console.info("props =>", props);

const COMPONENT_NAME = "ImsFormDesigner";
defineOptions({
  name: COMPONENT_NAME,
});
const { prefixCls } = useStyle("form-designer");

const componentKeywords = ref<string>("");

// 撤销 重做 Undo Redo
const unReDo = ref<string>("");
// 元素工具
const elementTool = ref<string>("");
// 目标设备
const targetDevice = ref<string>("pc");

// 文件处理
const fileActions = [
  {
    icon: "ant-design:cloud-download-outlined",
    value: "save",
    label: "保存",
  },
  {
    icon: "ant-design:cloud-upload-outlined",
    value: "upload",
    label: "上传",
  },
  {
    icon: "ant-design:clear-outlined",
    value: "clear",
    label: "清空",
  },
];

const fileAction = ref<string>("");

// 操作视图

const operationalViewActions = [
  {
    icon: "ic:outline-color-lens",
    value: "design",
    label: "设计",
  },
  {
    icon: "tabler:code-dots",
    value: "json",
    label: "JSON",
  },
  {
    icon: "tabler:code",
    value: "code",
    label: "代码",
  },
  {
    icon: "ph:play-bold",
    value: "play",
    label: "预览",
  },
];

const operationalView = ref<string>("design");

const componentsListsRef = ref();

const formComponentProp = ref("form-props");

const list = ref({
  model: {},
  rules: {},
  items: [
    {
      item: {
        name: "f_9GqdghhCcT4Dr6VZp-i",
        colon: true,
        layout: "horizontal",
        labelAlign: "right",
        labelCol: {
          style: {
            width: "80px",
          },
        },
      },
      children: [],
      formItemProps: formPropsJson,
      component: {
        componentName: "AInputPassword",
        props: {
          placeholder: "请输入",
        },
      },
      id: "tHGUhT0q4Ddzuf86gjg21",
      title: "表单",
      type: "form",
    },
  ],
});

useDraggable(componentsListsRef, componentLists, {
  animation: 150,
  ghostClass: "ghost",
  group: { name: "components", pull: "clone", put: false },
  clone(item) {
    let addedComponent = cloneDeep(item);

    addedComponent.class = "tree-item";

    let itemId = nanoid();
    addedComponent.id = itemId;

    let itemName = nanoid();
    addedComponent.item.name = itemName;

    addedComponent.componentProps = componentsProps[addedComponent.type]; // 增加 componentProps
    addedComponent.formItemProps = formItemPropsJson; // 增加 formItemProps

    addedComponent.componentEvents = componentEventsJson[addedComponent.type]; // 增加 componentEvents

    if (addedComponent.type === "grid-layout") {
      addedComponent.children.forEach((child) => {
        child.id = nanoid();
      });
    } else {
      list.value.model[itemName] = "";
      // 增加一个空白的校验规则
      list.value.rules[itemName] = [];
    }

    console.info("af => item", addedComponent);

    return addedComponent;
  },
  sort: false,
});

// 删除 tree-data 中的指定节点
const removeNodeInTree = (data: any, id: string) => {
  // 通过id从数组（树结构）中移除元素
  if (!data || !data.length) {
    return false;
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      data.splice(i, 1);
      break;
    }
    removeNodeInTree(data[i].children, id);
  }
};

const findParent = (data: any, target: any, result: any) => {
  for (let item of data) {
    if (item.id === target.id) {
      //将查找到的目标数据加入结果数组中
      //可根据需求unshift(item.id)或unshift(item)

      result.unshift(item);
      return true;
    }
    if (item.children && item.children.length > 0) {
      //根据查找到的结果往上找父级节点
      let isFind = findParent(item.children, target, result);
      if (isFind) {
        result.unshift(item);
        return true;
      }
    }
  }
  //走到这说明没找到目标
  return false;
};

// 删除表单节点
const deleteItem = (data: any) => {
  removeNodeInTree(list.value.items[0].children, data.id);
};

// 删除表单节点
const copyItem = (data: any) => {
  console.info("copyItem 复制...", data);

  if (data.type !== "grid-layout" || data.type !== "grid-layout-col") {
    let tmpItem = cloneDeep(data);

    console.info("data.id =>", data.id);
    tmpItem.id = nanoid();

    console.info("tmpItem.id =>", tmpItem.id);

    list.value.items[0].children.push(tmpItem);
  } else {
    console.info("暂不支持...");
  }
};

/**
 * 增加 栅格布局 的 COL
 * @param data
 */
const addGridCol = (data: any) => {
  let itemId = data.id;
  let findedIndex = list.value.items[0].children.findIndex(
    (item) => item.id === itemId
  );
  let findedCompIndex = componentListsJson.findIndex(
    (comp) => comp.type === "grid-layout"
  );
  let originalColData = cloneDeep(
    componentListsJson[findedCompIndex].children[0]
  );
  originalColData.id = nanoid();
  console.info("findedIndex =>", findedIndex);
  list.value.items[0].children[findedIndex].children.push(originalColData);
};

const breadcrumbs = ref([]);

watch(activeStorageItem, (newActiveStorageItem: any) => {
  let result = [];

  findParent(list.value.items, newActiveStorageItem, result);

  activeComponent.value = result[result.length - 1];

  breadcrumbs.value = result;

  // treeSelectedKeys.value = [newActiveStorageItem.id];
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-form-designer";

.@{prefix-cls} {
  --at-apply: w-full h-full flex flex-col overflow-hidden;

  &-header {
    --at-apply: h-48px min-h-48px flex justify-between items-center;

    border-bottom: 1px solid #eaeaea;

    &-logo {
      --at-apply: font-bold px-2;
    }

    &-center {
      --at-apply: font-bold;
    }

    &-right {
      --at-apply: font-bold px-2;
    }
  }
  // 内容区域
  &-contents {
    --at-apply: flex-1 flex h-full;
    // height: calc(100% -48px);
    &-left {
      --at-apply: flex flex-row h-full;
      &-nav-bar {
        --at-apply: w-356px;

        &-tabs {
          // border: 1px solid red;
          /* tabs 样式调整 开始 */
          :deep(.ant-tabs-tab) {
            padding: 8px 12px;
          }
          :deep(.ant-tabs-content-holder) {
            .ant-tabs-content {
              height: 100%;
              .ant-tabs-tabpane {
                padding-left: 0;
                height: 100%;
              }
            }
          }
          /* tabs 样式调整  结束 */
          .tab-wrapper {
            --at-apply: h-full p-2;
          }

          &-components {
            --at-apply: h-full flex flex-col box-border;
            &-components {
              --at-apply: flex-1 pb-12;
              overflow: hidden;

              &-searcher {
                --at-apply: py-1 px-2 box-border;
                box-shadow: 0 1px 1px #eaeaea;
              }

              &-lists {
                --at-apply: px-1;
                &-item {
                  border: 1px solid #eaeaea;
                  --at-apply: p-2 cursor-pointer rd flex items-center
                    justify-start;
                  .icon {
                    font-size: 14px;
                    --at-apply: mr-1;
                  }

                  .title {
                    font-size: 12px;
                    color: rgb(51, 51, 51);
                    user-select: none;
                  }

                  &:hover {
                    border-color: #3e8bf2;
                    background-color: #3e8bf20f;
                    .icon {
                      color: #3e8bf2;
                    }

                    .title {
                      color: #3e8bf2;
                    }
                  }
                }
              }
            }

            &-outline {
              // border: 1px solid red;
              --at-apply: h-300px bd-red;
            }
          }
        }
        // border-right: 1px solid #eaeaea;
      }
    }

    &-canvas {
      --at-apply: "bg-#eeeeee flex-1 px-2 flex flex-col  h-full box-border";
      // border: 1px solid red;
      overflow: hidden;
      &-tools {
        --at-apply: py-2 px-1 flex justify-between items-center;

        .rgi {
          :deep(.ant-radio-button-wrapper) {
            span:last-child {
              --at-apply: flex justify-between items-center h-full;
            }
          }
        }

        &-left {
          --at-apply: flex;
        }

        &-right {
          --at-apply: flex;
        }
      }

      &-workspace {
        --at-apply: "flex-1 bg-#fff h-full box-border";
        overflow: hidden;
        &-view {
          --at-apply: h-full box-border;
          overflow: hidden;
          // border: 1px solid #eaeaea;

          &-json {
            border: 1px solid yellow;
          }

          &-code {
            border: 1px solid black;
          }

          &-play {
            border: 1px solid green;
          }
          //
        }

        &-view-design {
          --at-apply: h-full box-border pb-12;
          overflow: hidden;

          &-form {
            --at-apply: box-border px-3 py-8;

            &:first-child {
               border: 2px solid red;
            }

            // .ims-nested-draggable {
            //   border: 2px solid red;
            //   --at-apply: "h-50%";
            // }
            // border: 2px solid red;
          }
        }
      }
    }

    &-right {
      --at-apply: w-350px flex flex-col h-full;

      &-header {
        --at-apply: h-86px min-h-86px;
        &-breadcrumb {
          --at-apply: h-40px min-h-40px flex items-center px-2;
          border-bottom: 1px solid #eaeaea;
        }

        &-tabs-wrapper {
          --at-apply: h-46px min-h-46px;
          :deep(.ant-tabs-nav) {
            margin-bottom: 0;
          }
        }
      }

      &-props-wrapper {
        --at-apply: flex-1 h-full  py-1 pb-140px;
      }
    }
  }
}
</style>
