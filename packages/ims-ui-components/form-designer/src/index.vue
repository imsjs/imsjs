<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`" v-if="showHeader">
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
                  <div>
                    <icon icon="uiw:component"></icon>
                  </div>
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
                  <Simplebar class="simple-bar-init">
                    <a-row
                      ref="componentsListsRef"
                      :class="`${prefixCls}-contents-left-nav-bar-tabs-components-components-lists`"
                    >
                      <a-col
                        v-for="item in componentLists"
                        :span="12"
                        class="p-1"
                        :key="item.id"
                      >
                        <div
                          @click="quickAddComponent(item)"
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
                  <a-tree
                    blockNode
                    selectable
                    :showLine="true"
                    :class="`${prefixCls}-contents-left-nav-bar-tabs-components-outline-tree ${prefixCls}-components-outline-tree`"
                    :showIcon="false"
                    :tree-data="list.items"
                    :fieldNames="fieldNames"
                    :draggable="true"
                    :height="300"
                    @select="onOutlineSelect"
                    v-model:selectedKeys="treeSelectedKeys"
                  >
                    <template #title="item">
                      <div class="w-full flex justify-between items-center">
                        <div class="title-wrapper flex">
                          <div class="title-name">
                            {{ item.title }}
                          </div>
                          <span class="ml-1 text-#0000004f text-10px">{{
                            item.type
                          }}</span>
                        </div>

                        <a-space>
                          <icon
                            icon="ant-design:delete-outlined"
                            class="action hover-color-#1677ff"
                            :inline="true"
                          />
                          <!-- eye-outlined -->
                          <icon
                            icon="ant-design:eye-invisible-outlined"
                            class="action hover-color-#1677ff"
                            :inline="true"
                          />
                        </a-space>
                      </div>
                    </template>
                  </a-tree>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div>
                    <icon icon="mdi:file-tree-outline"></icon>
                  </div>
                  <div>大纲</div>
                </div>
              </template>

              <div class="tab-wrapper">
                <a-tree
                  blockNode
                  selectable
                  :showLine="true"
                  :class="`${prefixCls}-components-outline-tree`"
                  :showIcon="false"
                  :tree-data="list.items"
                  :fieldNames="fieldNames"
                  :draggable="true"
                  :height="300"
                  @select="onOutlineSelect"
                  v-model:selectedKeys="treeSelectedKeys"
                >
                  <template #title="item">
                    <div class="w-full flex justify-between items-center">
                      <div class="title-wrapper flex">
                        <div class="title-name">
                          {{ item.title }}
                        </div>
                        <span class="ml-1 text-#0000004f text-10px">{{
                          item.type
                        }}</span>
                      </div>

                      <a-space>
                        <icon
                          icon="ant-design:delete-outlined"
                          class="action hover-color-#1677ff"
                          :inline="true"
                        />
                        <!-- eye-outlined -->
                        <icon
                          icon="ant-design:eye-invisible-outlined"
                          class="action hover-color-#1677ff"
                          :inline="true"
                        />
                      </a-space>
                    </div>
                  </template>
                </a-tree>
              </div>
            </a-tab-pane>
            <!-- <a-tab-pane key="3">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="ri:code-box-line"></icon></div>
                  <div>源码</div>
                </div>
              </template>

              <div class="tab-wrapper">源码</div>
            </a-tab-pane> -->

            <a-tab-pane key="4">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div>
                    <icon icon="uiw:component"></icon>
                  </div>
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
                <a-radio-button value="undo">
                  <icon icon="ion:arrow-undo-outline"></icon>
                </a-radio-button>
                <a-radio-button value="redo">
                  <icon icon="ion:arrow-redo-outline"></icon>
                </a-radio-button>
              </a-radio-group>

              <a-radio-group
                v-model:value="elementTool"
                class="rgi"
                size="small"
                v-if="operationalView === 'design'"
              >
                <a-radio-button value="move">
                  <icon icon="system-uicons:move"></icon>
                </a-radio-button>
                <a-radio-button value="selection">
                  <icon icon="ph:selection-plus-light"></icon>
                </a-radio-button>
              </a-radio-group>

              <a-radio-group
                v-model:value="targetDevice"
                class="rgi"
                size="small"
              >
                <a-radio-button value="pc">
                  <icon icon="iconoir:pc-check"></icon>
                </a-radio-button>
                <a-radio-button value="mobile">
                  <icon icon="clarity:mobile-line"></icon>
                </a-radio-button>
              </a-radio-group>
            </a-space>
          </div>
          <div :class="`${prefixCls}-contents-canvas-tools-center`">
            <!-- <span v-if="list.items[0].item.title">{{
              list.items[0].item.title
            }}</span>
            <span v-if="list.items[0].item.title">-</span>
            <span class="text-14px">{{ list.items[0].item.name }}</span> -->
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
                  @click="onFileActionChange(item)"
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
            <Simplebar class="simple-bar-init">
              <a-form
                :class="`${prefixCls}-contents-canvas-workspace-view-design-form`"
                v-bind="list.items[0].item"
              >
                <nested-draggable
                  @add-col="addGridCol"
                  @delete="deleteItem"
                  @copy="copyItem"
                  :class="[
                    `${prefixCls}-contents-canvas-workspace-view-design-form-draggable`,
                    { 'no-item': !list.items[0].children.length },
                  ]"
                  v-model="list.items[0].children"
                ></nested-draggable>
              </a-form>
            </Simplebar>
          </div>
          <div
            :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-json`"
            v-show="operationalView === 'json'"
          >
            <!-- <div>JSON</div> -->
            <component
              is="ImsJsonViewer"
              v-if="operationalView === 'json'"
              :data="list"
            ></component>
          </div>
          <div
            :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-code`"
            v-show="operationalView === 'code'"
          >
            <div>CODE</div>
          </div>
          <div
            :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-play`"
            v-show="operationalView === 'play'"
            data-simplebar
            data-simplebar-auto-hide="false"
          >
            <Simplebar class="simple-bar-init">
              <div class="p-2">
                <component
                  is="ImsFormRenderer"
                  ref="testRef"
                  v-if="operationalView === 'play'"
                  :data="list"
                ></component>
              </div>
            </Simplebar>
          </div>
        </div>
      </div>
      <div :class="`${prefixCls}-contents-right`">
        <div :class="`${prefixCls}-contents-right-header`">
          <div :class="`${prefixCls}-contents-right-header-breadcrumb`">
            <a-breadcrumb separator=">">
              <a-breadcrumb-item
                v-for="breadcrumb in breadcrumbs"
                class="cursor-pointer"
                @click="breadcrumbClick(breadcrumb)"
                >{{ breadcrumb.title }}
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <div :class="`${prefixCls}-contents-right-header-tabs-wrapper`">
            <a-tabs centered v-model:activeKey="formComponentProp">
              <a-tab-pane
                key="form-props"
                :disabled="
                  activeComponent.type === 'grid-layout' ||
                  activeComponent.type === 'grid-layout-col'
                "
                tab="表单属性"
              >
              </a-tab-pane>
              <a-tab-pane
                key="component-props"
                :disabled="
                  activeComponent.type === 'grid-layout' ||
                  activeComponent.type === 'grid-layout-col'
                "
                tab="组件属性"
              >
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>

        <div
          :class="`${prefixCls}-contents-right-props-wrapper`"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          <Simplebar class="simple-bar-init">
            <div v-show="formComponentProp === 'form-props'" class="px-2">
              <template v-for="item in activeComponent.formItemProps">
                <ImsDesignerCustomizationProp
                  v-bind="item"
                  v-model:value="activeComponent.item[item.field]"
                  @focus="() => onFormItemFocus(item)"
                  @blur="() => onFormItemBlur(item)"
                  @change="() => onFormItemNameChange(item)"
                ></ImsDesignerCustomizationProp>
              </template>
            </div>

            <!-- 组件属性 -->
            <div v-show="formComponentProp === 'component-props'" class="px-2">
              <template v-for="item in activeComponent.componentProps">
                <ImsDesignerCustomizationProp
                  v-if="item.show !== false"
                  v-bind="item"
                  v-model:value="activeComponent.component.props[item.field]"
                  v-model:apply="item.apply"
                ></ImsDesignerCustomizationProp>
              </template>
            </div>
          </Simplebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

import type {
  ImsFormDesignerConfigurationComponent,
  ImsFormDesignerConfigurationComponentObject,
  ImsFormDesignerProps,
  ImsFormSchema,
  ImsFormSchemaItem,
  operationalAction,
} from "@imsjs/ims-ui-types";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

import { type RefOrElement, useDraggable } from "vue-draggable-plus";

import { cloneDeep } from "lodash-es";

import { toArray } from "tree-lodash";

import { nanoid } from "nanoid";
import { StorageSerializers, useStorage } from "@vueuse/core";

import NestedDraggable from "./components/nested-draggable.vue";

import ImsDesignerCustomizationProp from "./components/customizations/customization-prop.vue";

import componentListsJson from "./data/component-lists.json";
import componentsPropsJson from "./data/component-props.json";

import formItemPropsJson from "./data/form-item-props.json";
import formPropsJson from "./data/form-props.json";

const componentsProps =
  componentsPropsJson as ImsFormDesignerConfigurationComponentObject;

const formItemProps: ImsFormDesignerConfigurationComponent[] =
  formItemPropsJson;

// const componentLists = ref<ImsFormSchemaItem[]>([]);

const componentLists = reactive<ImsFormSchemaItem[]>([
  {
    id: "1",
    title: "输入框",
    icon: "iconoir:input-field",
    type: "input",
    vModelField: "value",
    item: {
      label: "输入框",
      name: "",
      tooltip: "",
      extra: "",
      required: false,
      colon: true,
      displayState: true,
      rules: [],
    },
    component: {
      componentName: "AInput",
      events: {},
      props: {
        placeholder: "请输入",
        bordered: true,
        showCount: false,
        size: "",
        events: {},
      },
    },
    componentProps: [],
    formItemProps: [],
  },
  {
    id: "2",
    title: "文本域",
    icon: "bi:textarea-resize",
    type: "textarea",
    vModelField: "value",

    item: {
      label: "文本域",
      name: "",
      tooltip: "",
      extra: "",
      required: false,
      colon: true,
      displayState: true,
      rules: [],
    },
    component: {
      componentName: "ATextarea",
      events: {},
      props: {
        placeholder: "请输入",
        bordered: true,
      },
    },
    componentProps: [],
    formItemProps: [],
  },
]);

const activeStorageItem = useStorage("active-item", { id: "0" }, undefined, {
  serializer: StorageSerializers.object,
});

const modelKeysIndex = ref(-1);

const props = withDefaults(defineProps<ImsFormDesignerProps>(), {
  showHeader: false,
});

const emits = defineEmits<{
  save: [data?: any];
}>();

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
const elementTool = ref("");
// 目标设备
const targetDevice = ref<string>("pc");

// 文件处理
const fileActions: operationalAction[] = [
  {
    id: "download",
    icon: "ant-design:cloud-download-outlined",
    value: "download",
    label: "下载",
  },
  {
    id: "upload",
    icon: "ant-design:cloud-upload-outlined",
    value: "upload",
    label: "上传",
  },
  {
    id: "clear",
    icon: "ant-design:clear-outlined",
    value: "clear",
    label: "清空",
  },
  {
    id: "save",
    icon: "ant-design:save-outlined",
    value: "save",
    label: "保存",
  },
];

const fileAction = ref<string>("");

const onFileActionChange = (fileAction: operationalAction) => {
  if (fileAction.value === "download") {
    let fileName = "ims-designer-data.json";
    let content = "data:text/json;charset=utf-8,";

    let tmpData = cloneDeep(list.value);
    let formItems = toArray(tmpData.items[0].children).filter(
      (item: ImsFormSchemaItem) => {
        return item.type !== "grid-layout-col" && item.type !== "grid-layout";
      }
    );
    // 校验规则设置
    formItems.forEach((item: ImsFormSchemaItem) => {
      tmpData.rules[item.item.name] = item.item.rules;
    });

    content += JSON.stringify(tmpData, null, 2);
    const encodedUri = encodeURI(content);
    const actions = document.createElement("a");
    actions.setAttribute("href", encodedUri);
    actions.setAttribute("download", fileName);
    actions.click();
  }

  if (fileAction.value === "upload") {
    console.info("onFileActionClick 上传 =>", fileAction.value);
  }

  if (fileAction.value === "clear") {
    // 直接清空所有的配置,可以考虑 增加确认提示之后再进行清空
    list.value.items[0].children = [];
    list.value.model = {};
    list.value.rules = {};
    // 修改 breadcrumbs 为第一个
    breadcrumbs.value = [breadcrumbs.value[0]];
    // 同时更新选中项目
    activeStorageItem.value = breadcrumbs.value[0];
  }

  if (fileAction.value === "save") {
    // 保存

    let formItems = toArray(list.value.items[0].children).filter(
      (item: ImsFormSchemaItem) => {
        return item.type !== "grid-layout-col" && item.type !== "grid-layout";
      }
    );
    // 校验规则设置
    formItems.forEach((item) => {
      list.value.rules[item.item.name] = item.item.rules;
    });
    emits("save", list.value);
  }
};

// 操作视图

const operationalViewActions: operationalAction[] = [
  {
    id: "design",
    icon: "ic:outline-color-lens",
    value: "design",
    label: "设计",
  },
  {
    id: "json",
    icon: "tabler:code-dots",
    value: "json",
    label: "JSON",
  },
  {
    id: "code",
    icon: "tabler:code",
    value: "code",
    label: "代码",
  },
  {
    id: "play",
    icon: "ph:play-bold",
    value: "play",
    label: "预览",
  },
];

const operationalView = ref("design");

const formComponentProp = ref<string>("form-props");

const list = defineModel<ImsFormSchema>("value", {
  default: {
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
  },
});

const activeComponent = ref<ImsFormSchemaItem>({
  id: "0",
  title: "",
  icon: "",
  type: "",
  vModelField: "",
  item: {
    label: "",
    displayState: true,
    name: "",
  },
  component: { props: {}, componentName: "" },
  componentProps: [],
  formItemProps: [],
});

activeComponent.value = list.value.items[0];

const breadcrumbs = ref([list.value.items[0]]);

const componentsListsRef = ref<RefOrElement>();
useDraggable(componentsListsRef, componentLists, {
  animation: 150,
  ghostClass: "ghost",
  group: { name: "components", pull: "clone", put: false },
  clone(item: any) {
    return buildFormItem(item, "clone");
  },
  sort: false,
});

const quickAddComponent = (item: ImsFormSchemaItem) => {
  let buildedItem = buildFormItem(item, "click");
  list.value.items[0].children.push(buildedItem);
};

/** 构建生成表单项 */
const buildFormItem = (
  item: ImsFormSchemaItem,
  way: string
): ImsFormSchemaItem => {
  let addedComponent = cloneDeep(item);
  addedComponent.id = nanoid();

  addedComponent.class = `${way}-way-${addedComponent.type}`;

  let itemName = nanoid();
  addedComponent.item.name = itemName;

  addedComponent.componentProps = componentsProps[addedComponent.type]; // 增加 componentProps
  addedComponent.formItemProps = formItemProps; // 增加 formItemProps

  if (addedComponent.type === "grid-layout") {
    addedComponent.componentProps = [];

    addedComponent.formItemProps = [];
    addedComponent.children?.forEach((child: any) => {
      child.id = nanoid();
    });
  } else {
    // 非布局组件 增加 model 和 rules
    list.value.model[itemName] = "";
    list.value.rules[itemName] = [];
  }

  return addedComponent;
};

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
const deleteItem = (data: ImsFormSchemaItem) => {
  removeNodeInTree(list.value.items[0].children, data.id);
  // 同时删除 model 和 rules
  delete list.value.model[data.item.name];
  delete list.value.rules[data.item.name];
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

const onFormItemFocus = (item: ImsFormDesignerConfigurationComponent) => {
  console.log("onFormItemFocus => item", item);
  if (activeComponent.value.type !== "form") {
    if (item.field === "name") {
      console.info(
        "onFormItemFocus.activeComponent.value =>",
        activeComponent.value.item.name
      );

      let modelKeys = Object.keys(list.value.model);

      let findedIndex = modelKeys.findIndex(
        (model) => model === activeComponent.value.item.name
      );

      modelKeysIndex.value = findedIndex;

      console.info(`modelKeys[${findedIndex}] =>`, modelKeys[findedIndex]);
    }
  }
};

const onFormItemBlur = (item: ImsFormDesignerConfigurationComponent) => {
  console.log("onFormItemBlur => item", item);
  if (activeComponent.value.type !== "form") {
    if (item.field === "name") {
      let currentChangedValue = activeComponent.value.item.name;
      // models
      let modelKeys = Object.keys(list.value.model);
      modelKeys[modelKeysIndex.value] = currentChangedValue;
      list.value.model = Object.fromEntries(
        modelKeys.map((item) => [item, ""])
      );

      // rules
      let rulesKeys = Object.keys(list.value.rules);
      rulesKeys[modelKeysIndex.value] = currentChangedValue;
      list.value.rules = Object.fromEntries(
        rulesKeys.map((item) => [item, []])
      );
    }
  }
};

const onFormItemNameChange = (item: ImsFormDesignerConfigurationComponent) => {
  console.log("onFormItemNameChange => item", item);
  console.info("activeComponent.value.type =>", activeComponent.value.type);
  if (activeComponent.value.type === "form") {
    if (item.field === "labelCol.style.width") {
      console.info("ok.....", list.value.items[0].item[item.field]);

      list.value.items[0].item.labelCol.style.width =
        list.value.items[0].item[item.field];
    }
  } else {
    if (item.field === "name") {
      let modelKeys = Object.keys(list.value.model);

      console.info("modelKeys =>", modelKeys);

      console.info("activeComponent.value =>", activeComponent.value);
      let changedName = activeComponent.value.item.name;
      console.info("changedName", changedName);
    }
  }
};

const activeComponentChange = (data: any, updateActiveItem: boolean = true) => {
  let result: any[] = [];
  findParent(list.value.items, data, result);
  activeComponent.value = result[result.length - 1];
  breadcrumbs.value = result;

  if (updateActiveItem) {
    activeStorageItem.value = data;
  }
};

const breadcrumbClick = (breadcrumb) => {
  if (breadcrumb.id === breadcrumbs.value[breadcrumbs.value.length - 1].id) {
    return false;
  }
  activeComponentChange(breadcrumb);
};

const treeSelectedKeys = ref([]);
const fieldNames = {
  children: "children",
  title: "title",
  key: "id",
};

const onOutlineSelect = (selectedKeys, { selectedNodes }) => {
  activeComponentChange(selectedNodes[0]);
};

watch(activeStorageItem, (newActiveStorageItem: any) => {
  activeComponentChange(newActiveStorageItem, false);
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-form-designer";

.@{prefix-cls} {
  --at-apply: w-full h-full flex flex-col overflow-hidden;

  .simple-bar-init {
    height: 100%;
    // border: 1px solid red;
  }

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

    overflow: hidden;

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

            overflow: hidden;

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
              --at-apply: h-300px;
            }
          }
        }

        // border-right: 1px solid #eaeaea;
      }
    }

    &-canvas {
      --at-apply: "bg-#eeeeee flex-1 px-2 flex flex-col  h-full box-border";

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

        &-center {
          --at-apply: flex items-center justify-center;
          // border: 1px solid red;
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
            border: none;
          }

          &-code {
            border: none;
          }

          &-play {
            --at-apply: box-border;
            overflow: hidden;
          }

          //
        }

        &-view-design {
          --at-apply: h-full box-border;
          overflow: hidden;

          &-form {
            --at-apply: box-border px-3 pt-8;

            div:first-child.no-item {
              // border: 2px solid red;
              height: calc(100% - 65px);

              &::before {
                content: "拖拽组件到这里";
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                // color: red;
              }
            }
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
        overflow: hidden;
        --at-apply: flex-1 h-full py-1;
      }
    }
  }
}
</style>

<style lang="less">
.ims-form-designer-components-outline-tree {
  .ant-tree-switcher,
  .ant-tree-switcher_close {
    --at-apply: f-c-c;
  }
}
</style>
