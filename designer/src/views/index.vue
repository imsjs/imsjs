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
          <a-button @click="saveJson">保存</a-button>
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
        <div :class="`${prefixCls}-content-center-tool-bar`">
          <div></div>
          <div>
            <a-space>
              <!-- <a-button>ddd</a-button>
              <a-button>ddd</a-button> -->
              <a-button @click="emptyForm">清空</a-button>
            </a-space>
          </div>
        </div>

        <div
          :class="`${prefixCls}-content-center-canvas-wrapper`"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          <Simplebar>
            <div :class="`${prefixCls}-content-center-canvas-wrapper-canvas`">
              <div class="mb-2">
                {{ activeComponentIndex }}
                <ims-json-viewer :data="useFormRs" />

                <ims-json-viewer :data="list" title="list" />
              </div>

              <a-form>
                <draggable
                  :list="list.items"
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
                      @click="onActiveComponent(element, index)"
                      :class="[
                        `${prefixCls}-content-center-canvas-wrapper-canvas-component`,
                        { active: element.id === activeComponent.id },
                      ]"
                    >
                      <div
                        :class="`${prefixCls}-content-center-canvas-wrapper-canvas-component-tool z-99`"
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
                          v-bind="
                            Object.assign(
                              { label: element.title },
                              element.item,
                              useFormRs.validateInfos[element.item.name]
                            )
                          "
                        >
                          <component
                            :is="element.component.componentName || 'AInput'"
                            v-bind="element.component.props"
                            v-model:[element.vModelField]="
                              list.model[element.item.name]
                            "
                          ></component>
                        </a-form-item>
                      </div>
                    </div>
                  </template>
                </draggable>
              </a-form>
            </div>
          </Simplebar>
        </div>
      </div>
      <div :class="`${prefixCls}-content-right`">
        <div :class="`${prefixCls}-content-right-breadcrumb`">
          <a-breadcrumb separator=">">
            <a-breadcrumb-item>表单</a-breadcrumb-item>
            <a-breadcrumb-item v-if="activeComponent.id != '0'">
              <div class="flex items-center">
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
        <div :class="`${prefixCls}-content-right-props`">
          <a-tabs
            v-model:activeKey="activeKey"
            centered
            :tabBarStyle="tabBarStyle"
            :class="`${prefixCls}-content-right-props-tabs`"
          >
            <a-tab-pane key="1" tab="属性"></a-tab-pane>
            <a-tab-pane key="2" tab="样式"></a-tab-pane>
            <a-tab-pane key="3" tab="事件"></a-tab-pane>
          </a-tabs>

          <div
            :class="`${prefixCls}-content-right-props-contents`"
            data-simplebar
            data-simplebar-auto-hide="false"
          >
            <Simplebar>
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
                            style="
                              margin-right: 2px;
                              font-size: 8px;
                              color: #ff4d4f;
                            "
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
                          @change="(e) => onFormItemNameChange(item, index, e)"
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
                  </a-collapse-panel>
                  <a-collapse-panel key="3" header="字段属性">
                    <div>sss</div>
                  </a-collapse-panel>
                  <a-collapse-panel key="3" header="容器属性">
                    <div>sss</div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
              <div v-show="activeKey === '2'" class="px-0">样式</div>
              <div v-show="activeKey === '3'" class="px-0">事件</div>
            </Simplebar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui";

import draggable from "vuedraggable";

import { cloneDeep, pick } from "lodash-es";
import { nanoid } from "nanoid";
import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import componentListsJson from "@/assets/jsons/component-lists.json";
import componentPropsJson from "@/assets/jsons/component-props.json";

import formItemPropsJson from "@/assets/jsons/form-item-props.json";

import { Form } from "ant-design-vue";

const useForm = Form.useForm;

// console.info('componentListsJson =>',componentListsJson);

const { prefixCls } = useStyle("designer");

const activeKey = ref("1");

const activeTabKey = ref("component");

const activeFilterKey = ref("all");

const activeComponent = ref({ id: "0" });

const activeComponentIndex = ref(-1);

const hided = ref(false);

const componentKeywords = ref("");

const enabled = ref(true);

const activeComponentCollapseKey = ref(["1"]);

const list = ref({
  model: {},
  rules: {},
  items: [],
});

const tabBarStyle = {
  margin: "0",
};

const checkMove = (e) => {
  // window.console.log("Future index: " + e.draggedContext.futureIndex,list.value.items[e.draggedContext.futureIndex]);
  // activeComponent.value = list.value.items[e.draggedContext.futureIndex - 1];
};

const cloneComponent = (item) => {
  console.info("cloneComponent =>", item);

  let itemId = nanoid();
  item.id = itemId;

  let findedIndex = list.value.items.findIndex((item) => {
    return item.id === itemId;
  });

  console.info("findedIndex =>", findedIndex);

  return item;
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

const useFormRs = ref({});

const onTabClick = (item) => {
  // console.info("item =>", item);

  activeTabKey.value = item.key;
};

const emptyForm = () => {
  console.info("emptyForm.useFormRs =>", useFormRs);
  // validateInfos = {};
  list.value = {
    model: {},
    rules: {},
    items: [],
  };

  useFormRs.value = {};
};

const onTabDblClick = (item) => {
  // console.info("onTabDblClick.item =>", item);

  hided.value = !hided.value;
};

const onFilterItemClick = (item: any) => {
  // console.info("onFilterItemClick =>", item);
  activeFilterKey.value = item.key;
};

const onActiveComponent = (item: any, index: number) => {
  // console.info('onActiveComponent =>',item);
  activeComponent.value = item;

  activeComponentIndex.value = index;
};

const addComponent = (item: any) => {
  let addedComponent = cloneDeep(item);
  addedComponent.id = nanoid();

  let itemName = nanoid();
  addedComponent.item.name = itemName;
  list.value.items.push(addedComponent);

  list.value.model[itemName] = "";
  list.value.rules[itemName] = [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "change",
    },
  ];

  let activeIndex = list.value.items.length - 1;

  activeComponent.value = list.value.items[activeIndex];

  activeComponentIndex.value = activeIndex;

  useFormRs.value = useForm(list.value.model, list.value.rules);
};

// copyComponent deleteComponent
const copyComponent = (item: any, index: number) => {
  let copyedItem = cloneDeep(item);

  copyedItem.id = nanoid();

  console.info("copyedItem =>", copyedItem);

  let itemName = nanoid();

  copyedItem.item.name = itemName;

  list.value.items.splice(index + 1, 0, copyedItem);
  list.value.model[itemName] = "";
  list.value.rules[itemName] = [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "change",
    },
  ];
  console.info("copyComponent =>", item, index);

  let activeIndex = index + 1;
  activeComponent.value = list.value.items[activeIndex];

  activeComponentIndex.value = activeIndex;

  useFormRs.value = {};

  useFormRs.value = useForm(list.value.model, list.value.rules);

  console.info("useFormRs.value =>", useFormRs.value);
};

const deleteComponent = (item: any, index: number) => {
  list.value.items.splice(index, 1);
  if (list.value.items.length === 0) {
    activeComponent.value = { id: "0" };
  } else {
    if (list.value.items.length >= index) {
      if (index === 0) {
        activeComponent.value = list.value.items[0];
      } else {
        activeComponent.value = list.value.items[index - 1];
      }
    } else {
      activeComponent.value = list.value.items[0];
    }
  }

  useFormRs.value = {};

  useFormRs.value = useForm(list.value.model, list.value.rules);
};

const onFormItemNameChange = (item, index, e) => {
  if (item.field === "name") {
    let modelKeys = Object.keys(list.value.model);
    let changedName = list.value.items[activeComponentIndex.value].item.name;
    modelKeys[activeComponentIndex.value] = changedName;
    let newModel = Object.fromEntries(modelKeys.map(item=>[item,'']));

    // 更新表单model
    list.value.model = newModel;

    // 更新表单的验证规则
    /**
     * 1.同步重置了验证规则，可想办法保留验证规则
     */
    let newRules = Object.fromEntries(modelKeys.map(item=>[item,[]]));
    list.value.rules = newRules;
    useFormRs.value = useForm(list.value.model, list.value.rules);
  }
};


const saveJson = () => {
  console.info('saveJson =>',list.value);
  let fileName = 'demo.json';
  let content = "data:text/json;charset=utf-8,";

  let tmpData = cloneDeep(list.value);

  console.info('items =>',tmpData.items);

  let items = [];

  tmpData.items.forEach((item)=>{
    let tmp = pick(item,['item','component','id','title','type']);
    items.push(tmp);
  })

  tmpData.items = items;

  // console.info('items =>',items);

    content += JSON.stringify(tmpData, null, 2);
    var encodedUri = encodeURI(content);
    var actions = document.createElement("a");
    actions.setAttribute("href", encodedUri);
    actions.setAttribute("download", fileName);
    actions.click();

}

watch(activeComponent, (newActiveComponent: any) => {
  let componentType = newActiveComponent.type;

  newActiveComponent.componentProps = componentsProps[componentType];
  newActiveComponent.formItemProps = formItemPropsJson;
  console.info("watch =>activeComponent");
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
            --at-apply: flex-1 flex h-full box-border;

            overflow: hidden;

            &-filter {
              --at-apply: px-2 py-2 h-full box-border;

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

              // border: 1px solid red;

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
      --at-apply: flex-1 h-full flex flex-col;
      border: 1px solid #eaeaea;

      // border: 2px solid red;

      // height: calc(100%-48px);

      // overflow: hidden;

      &-tool-bar {
        border-bottom: 1px solid #eaeaea;
        --at-apply: w-full h-48px box-border flex items-center justify-between
          px-6;
      }

      &-canvas-wrapper {
        // background-image: linear-gradient(#f8f8f8 14px, transparent 0),
        //   linear-gradient(90deg, transparent 14px, #373739 0);
        //   background-size: 15px 15px;

        --at-apply: flex-1 px-0 box-border;

        height: calc(100% - 48px);
        // min-height: 100% !important;
        // height: 100% !important;

        // border: 1px solid #f8f8f8;

        &:hover {
          // outline: 1px dashed #1890ff;
          outline: 1px solid #1890ff;
        }

        &-canvas {
          --at-apply: flex-1 w-full px-4 py-8 rd box-border;

          // overflow: hidden;
          // border: 1px solid red;
          min-height: calc(100% - 48px);
          background-color: #fff;

          &-component {
            --at-apply: p-1;

            &:hover {
              outline: 1px dashed #1890ff;
              // background-color: rgba(62, 139, 242, 0.06);
            }

            &.active {
              outline: 2px solid #1890ff;
              position: relative;

              .ims-designer-content-center-canvas-wrapper-canvas-component-tool {
                display: block;
                background-color: #fff;
                position: absolute;
                top: -23px;
                --at-apply: w-full flex justify-end;
              }

              & {
                // background-color: rgba(62, 139, 242, 0.06);
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

        //
      }
    }

    &-right {
      --at-apply: w-350px;

      &-breadcrumb {
        border-bottom: 1px solid #eaeaea;

        --at-apply: h-48px flex items-center px-2;
      }

      .props-collapse {
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;

        :deep(.ant-collapse-content-box) {
          padding: 8px;
        }

        .ant-collapse-item:last-child {
          border-radius: 0;
          // border: 1px solid red;
        }

        .ant-collapse-item:first-child {
          border-radius: 0;
          border-top: none;
        }
      }

      &-props {
        height: calc(100% - 48px);
        --at-apply: box-border flex flex-col;

        &-tabs {
        }

        &-contents {
          --at-apply: flex-1 overflow-hidden;
        }
      }
    }
  }
}
</style>
