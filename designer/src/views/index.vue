<template>
  <div :class="prefixCls">
    <div class="h-48px" :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-header-logo`">
        <a-typography-text strong>LOGO</a-typography-text>
      </div>
      <div :class="`${prefixCls}-header-center`">
        <a-typography-text strong>Ims Designer</a-typography-text>
      </div>
      <div :class="`${prefixCls}-header-right`">
        <a-space>
          <ims-button icon="iconoir:undo" :disabled="true" />
          <ims-button icon="iconoir:redo" :disabled="true" />
          <a-button>预览</a-button>
          <a-button>保存</a-button>
          <a-button>数据回显</a-button>
          <a-button>重置操作</a-button>
        </a-space>
      </div>
    </div>
    <div :class="`${prefixCls}-content`">
      <div :class="`${prefixCls}-content-left`">
        <div :class="`${prefixCls}-content-left-tabs`">
          <div
            :class="[
              `${prefixCls}-content-left-tabs-item`,
              { active: item.key === activeTabKey },
            ]"
            @click="onTabClick(item)"
            @dblclick="onTabDblClick(item)"
            :key="item.key"
            v-for="item in tabsItems"
          >
            <icon :icon="item.icon"></icon>
            <span class="title">{{ item.title }}</span>
          </div>
        </div>
        <div :class="[`${prefixCls}-content-left-contents`, { hided: hided }]">
          <div
            v-show="activeTabKey === 'component'"
            :class="`${prefixCls}-content-left-contents-component`"
          >
            <div
              :class="`${prefixCls}-content-left-contents-component-searcher`"
            >
              <a-input
                v-model:value="componentKeywords"
                allowClear
                placeholder="搜索组件"
              >
                <template #prefix>
                  <icon icon="ant-design:search-outlined"></icon>
                </template>
              </a-input>
            </div>
            <div
              :class="`${prefixCls}-content-left-contents-component-wrapper`"
            >
              <div
                :class="`${prefixCls}-content-left-contents-component-wrapper-filter`"
              >
                <div
                  :class="[
                    `${prefixCls}-content-left-contents-component-wrapper-filter-item`,
                    { active: item.key === activeFilterKey },
                  ]"
                  :key="item.key"
                  @click="onFilterItemClick(item)"
                  v-for="item in filterItems"
                >
                  {{ item.title }}
                </div>
              </div>
              <div
                data-simplebar
                data-simplebar-auto-hide="false"
                :class="`${prefixCls}-content-left-contents-component-wrapper-components`"
              >
                <Simplebar>
                  <draggable
                    :list="componentLists"
                    :enabled="enabled"
                    item-key="name"
                    :group="{ name: 'components', pull: 'clone', put: false }"
                    :clone="cloneComponent"
                    :sort="false"
                    ghost-class="ghost"
                    :move="checkMove"
                    @start="dragging = true"
                    @end="dragging = false"
                    class="grid grid-cols-[auto_auto] px-10px gap-2"
                  >
                    <template #item="{ element }">
                      <div
                        @click="addComponent(element)"
                        :class="[
                          `${prefixCls}-content-left-contents-component-wrapper-components-item`,
                          { 'not-draggable': !enabled },
                        ]"
                      >
                        <icon class="icon" :icon="element.icon"></icon>
                        <span class="title">{{ element.title }}</span>
                      </div>
                    </template>
                  </draggable>
                </Simplebar>
              </div>
            </div>
          </div>
          <div
            v-show="activeTabKey === 'source-code'"
            :class="`${prefixCls}-content-left-contents-source-code`"
          >
            source-code
          </div>
          <div
            v-show="activeTabKey === 'outline'"
            :class="`${prefixCls}-content-left-contents-outline`"
          >
            outline
          </div>
        </div>
      </div>

      <div :class="`${prefixCls}-content-center`">
        <div :class="`${prefixCls}-content-center-canvas`">
          <!-- <ims-json-viewer :data="list"></ims-json-viewer> -->
          <ims-json-viewer
            :data="activeComponent"
            v-if="activeComponent.id != '0'"
          ></ims-json-viewer>

          <!-- :move="checkMove" -->
          <a-form>
            <draggable
              :list="list"
              :enabled="enabled"
              item-key="id"
              :component-data="{
                type: 'transition-group',
              }"
              group="components"
              class="list-group"
              ghost-class="ghost"
              animation="300"
            >
              <template #item="{ element, index }">
                <div
                  @click="onActiveComponent(element)"
                  :class="[
                    `${prefixCls}-content-center-canvas-component`,
                    { active: element.id === activeComponent.id },
                  ]"
                >
                  <div
                    :class="`${prefixCls}-content-center-canvas-component-tool z-99`"
                  >
                    <div class="flex items-center justify-between w-full">
                      <div class="text-#0000004f text-12px">
                        {{ element.id }}
                      </div>
                      <div class="flex items-center">
                        <div class="action">
                          <icon
                            icon="uiw:component"
                            class="text-#fff"
                            :inline="true"
                          ></icon>
                          <span class="text-#fff ml-1">{{
                            element.title
                          }}</span>
                        </div>
                        <div
                          class="action"
                          @click.stop="copyComponent(element, index)"
                        >
                          <icon icon="ant-design:copy-outlined"></icon>
                        </div>
                        <div class="action">
                          <icon icon="tabler:arrows-move"></icon>
                        </div>
                        <div
                          class="action"
                          @click.stop="deleteComponent(element, index)"
                        >
                          <icon icon="wpf:delete"></icon>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <a-form-item
                      v-bind="element.item || { label: element.title }"
                    >
                      <component
                        :is="element.component.componentName || 'AInput'"
                        v-bind="element.component.props"
                      ></component>
                    </a-form-item>
                  </div>
                </div>
              </template>
            </draggable>
          </a-form>
        </div>
      </div>
      <div :class="`${prefixCls}-content-right`">
        <div :class="`${prefixCls}-content-right-breadcrumb`">
          <a-breadcrumb separator=">">
            <a-breadcrumb-item>表单</a-breadcrumb-item>
            <a-breadcrumb-item v-if="activeComponent.id != '0'">
              <div class="flex items-center ">
                <!-- <span ><icon class="mr-1" :icon="activeComponent.icon" :inline="true"></icon></span> -->
              <span>{{ activeComponent.title }}</span>
              <span class="mx-1 text-12px text-#0000004f">{{
                activeComponent.type || ""
              }}</span>
              <!-- <span class="text-12px text-#0000004f italic">{{
                activeComponent.id || ""
              }}</span> -->
              </div>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div>
          <a-tabs
            v-model:activeKey="activeKey"
            centered
            :tabBarStyle="tabBarStyle"
            class="props-tabs"
          >
            <a-tab-pane key="1" tab="属性"></a-tab-pane>
            <a-tab-pane key="2" tab="样式"></a-tab-pane>
            <a-tab-pane key="3" tab="事件"></a-tab-pane>
          </a-tabs>

          <div v-show="activeKey === '1'" class="px-0">
            <a-collapse
              v-model:activeKey="activeComponentCollapseKey"
              class="props-collapse"
              v-if="activeComponent.id != '0'"
            >
              <a-collapse-panel
                key="1"
                header="表单属性"
                class="props-collapse-panel"
              >
                <div
                  class="py-1"
                  v-for="item in activeComponent.formItemProps"
                >
                  <div
                    class="text-13px text-#4e5969 mb-1 flex justify-between items-center"
                  >
                    <div>
                      {{ item.label
                      }}<span class="ml-1 text-12px text-#0000004f italic"
                        >{{ item.field }}</span>
                      
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
              </a-collapse-panel>
              <a-collapse-panel
                key="2"
                header="组件属性"
                class="props-collapse-panel"
              >
                <div
                  class="py-1"
                  v-for="item in activeComponent.componentProps"
                >
                  <div
                    class="text-13px text-#4e5969 mb-1 flex justify-between items-center"
                  >
                    <div>
                      {{ item.label
                      }}<span class="ml-1 text-12px text-#0000004f italic"
                        >{{ item.field }}</span>
                      
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
              </a-collapse-panel>
              <a-collapse-panel key="3" header="字段属性">
                <div>sss</div>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="容器属性">
                <div>sss</div>
              </a-collapse-panel>
            </a-collapse>
          </div>
          <div v-show="activeKey === '4'" class="px-0">样式</div>
          <div v-show="activeKey === '5'" class="px-0">事件</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui";

import draggable from "vuedraggable";

import { cloneDeep } from "lodash-es";
import { nanoid } from "nanoid";
import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import componentListsJson from "@/assets/jsons/component-lists.json";
import componentPropsJson from "@/assets/jsons/component-props.json";

import formItemPropsJson from "@/assets/jsons/form-item-props.json";



// console.info('componentListsJson =>',componentListsJson);

const { prefixCls } = useStyle("designer");

const activeKey = ref("1");

const activeTabKey = ref("component");

const activeFilterKey = ref("all");

const activeComponent = ref({ id: "0" });

const hided = ref(false);

const componentKeywords = ref("");

const enabled = ref(true);

const activeComponentCollapseKey = ref(["1"]);

const list = ref([]);

const tabBarStyle = {
  margin: "0",
};

const sizeOptions = [
  {
    value: "",
    label: "默认",
  },
  {
    value: "large",
    label: "大",
  },
  {
    value: "middle",
    label: "中",
  },
  {
    value: "small",
    label: "小",
  },
];

const checkMove = (e) => {
  // window.console.log("Future index: " + e.draggedContext.futureIndex,list.value[e.draggedContext.futureIndex]);
  // activeComponent.value = list.value[e.draggedContext.futureIndex - 1];
};

const cloneComponent = (item) => {
  console.info("cloneComponent =>", item);

  let itemId = nanoid();
  item.id = itemId;

  let findedIndex = list.value.findIndex((item) => {
    return item.id === itemId;
  });

  console.info("findedIndex =>", findedIndex);

  return item;
};

const addComponent = (item) => {
  let addedComponent = cloneDeep(item);
  addedComponent.id = nanoid();
  list.value.push(addedComponent);

  activeComponent.value = list.value[list.value.length - 1];
};

const dragging = ref(false);

const tabsItems = [
  {
    title: "组件",
    icon: "uiw:component",
    key: "component",
  },
  {
    title: "大纲",
    icon: "mdi:file-tree-outline",
    key: "outline",
  },
  {
    title: "源码",
    icon: "ri:code-box-line",
    key: "source-code",
  },
];

const filterItems = [
  {
    title: "全部",
    icon: "uiw:component",
    key: "all",
  },
  {
    title: "表单",
    icon: "mdi:file-tree-outline",
    key: "form",
  },
  {
    title: "布局",
    icon: "ri:code-box-line",
    key: "layout",
  },
];



const componentLists = ref(componentListsJson);

const componentsProps = componentPropsJson;


const onTabClick = (item) => {
  // console.info("item =>", item);

  activeTabKey.value = item.key;
};

const onTabDblClick = (item) => {
  // console.info("onTabDblClick.item =>", item);

  hided.value = !hided.value;
};

const onFilterItemClick = (item) => {
  // console.info("onFilterItemClick =>", item);
  activeFilterKey.value = item.key;
};

const onActiveComponent = (item) => {
  // console.info('onActiveComponent =>',item);
  activeComponent.value = item;
};

// copyComponent deleteComponent
const copyComponent = (item, index) => {
  let copyedItem = cloneDeep(item);

  copyedItem.id = nanoid();

  list.value.splice(index + 1, 0, copyedItem);
  console.info("copyComponent =>", item, index);
  activeComponent.value = list.value[index + 1];
};

const deleteComponent = (item, index) => {
  list.value.splice(index, 1);
  if (list.value.length === 0) {
    activeComponent.value = { id: "0" };
  } else {
    if (list.value.length >= index) {
      if (index === 0) {
        activeComponent.value = list.value[0];
      } else {
        activeComponent.value = list.value[index - 1];
      }
    } else {
      activeComponent.value = list.value[0];
    }
  }
};

watch(activeComponent, (newActiveComponent:any) => {
  let componentType = newActiveComponent.type;
  // let componentProps = newActiveComponent.component.props;

  newActiveComponent.componentProps = componentsProps[componentType];
  newActiveComponent.formItemProps = formItemPropsJson;

  // newActiveComponent.formItemProps = componentsProps[componentType];
  // console.info("componentProps", componentProps);
  //
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer";

.@{prefix-cls} {
  --at-apply: h-full w-full flex flex-col;

  &-header {
    --at-apply: flex justify-between items-center h-48px;
    // box-shadow: 0 1px 4px #eaeaea;
    border-bottom: 1px solid #eaeaea;

    &-logo {
      --at-apply: flex-1 flex justify-start items-center px-2;
    }
    &-center {
      --at-apply: flex-1 flex justify-center items-center;
    }
    &-right {
      --at-apply: flex-1 flex justify-end items-center px-2;
    }
  }

  &-content {
    height: calc(100% - 48px);
    --at-apply: flex-1 flex;
    // overflow: hidden;
    box-sizing: border-box;

    &-left {
      --at-apply: flex;

      &-tabs {
        --at-apply: p-2;
        border-right: 1px solid #eaeaea;

        .active {
          .title {
            color: #3e8bf2;
          }
          .iconify {
            color: #3e8bf2;
          }
        }

        &-item {
          --at-apply: cursor-pointer w-54px flex flex-col items-center
            justify-center mb-2;

          .title {
            font-size: 14px;
            color: #777;
            user-select: none;
          }

          .iconify {
            font-size: 20px;
          }

          &:hover {
            color: #3e8bf2;
            .title {
              color: #3e8bf2;
            }
            .iconify {
              color: #3e8bf2;
            }
          }
        }
      }

      .hided {
        display: none;
      }

      &-contents {
        --at-apply: flex-1 w-300px h-full;
        &-component {
          --at-apply: flex flex-col h-full;
          &-searcher {
            --at-apply: p-2 h-48px;
            border-bottom: 1px solid #eaeaea;
          }

          &-wrapper {
            --at-apply: flex-1 flex h-full;
            box-sizing: border-box;

            overflow: hidden;

            &-filter {
              --at-apply: px-2 py-2 h-full;
              box-sizing: border-box;

              background-color: #f8f8f8;

              .active {
                color: #3e8bf2;
                background-color: #3e8bf20f;
              }

              &-item {
                --at-apply: cursor-pointer w-50px h-28px mb-2 rd flex
                  items-center justify-center;
                // background-color: #3e8bf20f;
                color: #3d3d3d;
                font-size: 12px;

                &:hover {
                  color: rgb(23, 114, 233);
                  background-color: #3e8bf20f;
                }
              }
            }

            &-components {
              --at-apply: box-border flex-1 h-full py-2;

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
        }

        &-source-code {
          border: 1px solid red;
        }

        &-outline {
          border: 1px solid red;
        }
      }
    }

    &-center {
      --at-apply: flex-1 p-6;
      border: 1px solid #eaeaea;
      background-image: linear-gradient(#f8f8f8 14px, transparent 0),
        linear-gradient(90deg, transparent 14px, #373739 0);
      background-size: 15px 15px;
      overflow: hidden;

      &-canvas {
        --at-apply: w-full h-full px-4 py-8 rd;
        // border: 1px solid red;
        background-color: #fff;

        &-component {
          --at-apply: p-1;
          &:focus {
            border: 1px solid red;
          }

          &:hover {
            outline: 1px dashed #1890ff;
            background-color: rgba(62, 139, 242, 0.06);
          }

          &.active {
            outline: 2px solid #1890ff;
            position: relative;

            .ims-designer-content-center-canvas-component-tool {
              display: block;
              background-color: #fff;
              position: absolute;
              top: -23px;
              --at-apply: w-full flex justify-end;
            }

            & {
              background-color: rgba(62, 139, 242, 0.06);
            }
          }

          &-tool {
            background-color: #fff;
            --at-apply: w-full px-1;
            display: none;
            .action {
              border-radius: 2px;
              font-size: 12px !important;
              display: flex;
              align-items: center;
              padding: 0 3px;
              height: 20px;
              background-color: #1890ff;
              margin-left: 2px;
              color: #fff;
              cursor: pointer;
              &:hover {
                background-color: #40a9ff;
              }
            }
          }
        }
      }
    }

    &-right {
      --at-apply: w-350px;

      &-breadcrumb {
        border-bottom: 1px solid #eaeaea;

        --at-apply: h-48px flex items-center px-2;
      }

      .props-collapse {
        border-radius: 0;

        :deep(.ant-collapse-content-box) {
          padding: 8px;
        }

        .ant-collapse-item:last-child {
          border-radius: 0;
        }
      }
    }
  }
}
</style>
