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
          <div v-show="activeTabKey === 'component'">
            <div :class="`${prefixCls}-content-left-contents-component`">
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
                    <VueDraggable
                      ref="componentsRef"
                      v-model="componentLists"
                      :sort="false"
                      :group="{ name: 'components', pull: 'clone', put: false }"
                      :clone="cloneComponent"
                      ghostClass="ghost"
                      class="grid grid-cols-[auto_auto] px-10px gap-2"
                      :move="onMove"
                    >
                      <div
                        :key="element.type"
                        v-for="element in componentLists"
                        @click="addComponent(element)"
                        :class="[
                          `${prefixCls}-content-left-contents-component-wrapper-components-item`,
                          { 'not-draggable': !enabled },
                        ]"
                      >
                        <icon class="icon" :icon="element.icon"></icon>
                        <span class="title">{{ element.title }}</span>
                      </div>
                    </VueDraggable>
                  </Simplebar>
                </div>
              </div>
            </div>

            <div class="h-200px px-2 overflow-y-auto">
              <a-tree
                blockNode
                selectable
                :showLine="false"
                :class="`${prefixCls}-content-left-contents-outline-tree`"
                :showIcon="false"
                :tree-data="list.items"
                :fieldNames="fieldNames"
                :defaultExpandAll="true"
                :autoExpandParent="true"
                :draggable="true"
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

          <div
            v-show="activeTabKey === 'source-code'"
            :class="`${prefixCls}-content-left-contents-source-code`"
          >
            <ims-json-viewer :data="list" editable></ims-json-viewer>
          </div>
          <div
            v-show="activeTabKey === 'outline'"
            :class="`${prefixCls}-content-left-contents-outline`"
          >
            <a-tree
              blockNode
              selectable
              :showLine="true"
              :class="`${prefixCls}-content-left-contents-outline-tree`"
              :showIcon="false"
              :tree-data="list.items"
              :fieldNames="fieldNames"
              :draggable="true"
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
      </div>

      <div :class="`${prefixCls}-content-center`">
        <div :class="`${prefixCls}-content-center-tool-bar`">
          <div></div>
          <div>
            <a-space>
              <!-- <a-button>ddd</a-button>
              <a-button>ddd</a-button> -->

              <a-button @click="onPreview">预览</a-button>
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
            <div
              :class="`${prefixCls}-content-center-canvas-wrapper-canvas`"
              @click="onFormActive"
            >
              <!-- <ims-json-viewer :data="breadcrumbs"></ims-json-viewer>
              <ims-json-viewer :data="activeStorageItem"></ims-json-viewer> -->
              <a-form
                :class="`${prefixCls}-content-center-canvas-wrapper-canvas-form`"
                v-bind="list.items[0].item"
              >
                <nested-draggable
                  :class="`${prefixCls}-content-center-canvas-wrapper-canvas-form-draggable`"
                  @add-col="addGridCol"
                  @delete="deleteItem"
                  v-model="list.items[0].children"
                ></nested-draggable>
              </a-form>
            </div>
          </Simplebar>
        </div>
      </div>
      <div :class="`${prefixCls}-content-right`">
        <div :class="`${prefixCls}-content-right-breadcrumb`">
          <a-breadcrumb separator=">">
            <a-breadcrumb-item v-for="breadcrumb in breadcrumbs">{{
              breadcrumb.title
            }}</a-breadcrumb-item>
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
                        <!--  -->
                        <component
                          :is="item.component || 'AInput'"
                          v-model:[item.vModelField]="
                            activeComponent.item[item.field]
                          "
                          v-bind="item.props"
                          @focus="(e) => onFormItemFocus(item, index, e)"
                          @blur="(e) => onFormItemBlur(item, index, e)"
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
                  
                  <!-- <a-collapse-panel key="4" header="容器属性">
                    <div>容器属性</div>
                  </a-collapse-panel> -->
                </a-collapse>
              </div>
              <div v-show="activeKey === '2'" class="px-0">样式</div>
              <div v-show="activeKey === '3'" class="p-2">
                <!-- {{ activeComponent.componentEvents }} -->
                <!-- <a-table :dataSource="dataSource" :columns="columns" bordered size="small" /> -->
xxx
                
              </div>
            </Simplebar>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ImsJsonFormPreview
    v-if="previewing"
    v-model:opening="previewing"
    :data="list"
  ></ImsJsonFormPreview>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui";

import { VueDraggable } from "vue-draggable-plus";

import { cloneDeep, filter } from "lodash-es";

import { toArray } from "tree-lodash";

import ImsJsonFormPreview from "./preview.vue";

import { nanoid } from "nanoid";
import { StorageSerializers, useStorage } from "@vueuse/core";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import componentListsJson from "@/assets/jsons/component-lists.json";
import componentPropsJson from "@/assets/jsons/component-props.json";
import componentEventsJson from "@/assets/jsons/component-events.json";

import formItemPropsJson from "@/assets/jsons/form-item-props.json";

import formPropsJson from "@/assets/jsons/form-props.json";

import { Form } from "ant-design-vue";

import NestedDraggable from "./nested-draggable.vue";

const useForm = Form.useForm;

const { prefixCls } = useStyle("designer");
const activeStorageItem = useStorage("active-item", null, undefined, {
  serializer: StorageSerializers.object,
});
const activeKey = ref("1");
const activeTabKey = ref("component");

const activeFilterKey = ref("all");

const activeComponent = ref({ id: "0", item: {}, component: { props: {} } });

const activeComponentIndex = ref(-1);

const modelKeysIndex = ref(-1);

const hided = ref(false);

const previewing = ref<boolean>(false);

const componentKeywords = ref("");

const enabled = ref(true);

const treeSelectedKeys = ref([]);

const activeComponentCollapseKey = ref(["1"]);

const onPreview = () => {
  console.info("onPreview");

  previewing.value = true;
};

const plainOptions = [
  {
    title: "change",
    description: "输入框内容变化时的回调",
    arguments: "function(e)",
  },

  {
    title: "pressEnter",
    description: "按下回车的回调",
    arguments: "function(e)",
  },
];

const columns = [
  {
    title: "事件名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "说明",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "回调参数",
    dataIndex: "address",
    key: "address",
  },
];

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

const tabBarStyle = {
  margin: "0",
};

const fieldNames = {
  children: "children",
  title: "title",
  key: "id",
};

const onFormActive = () => {
  console.info("onFormActive");
};

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

const onOutlineSelect = (selectedKeys, { selectedNodes }) => {
  console.info("onOutlineSelect.selectedKeys =>", selectedKeys);

  console.info("onOutlineSelect.selectedNodes =>", selectedNodes);

  let result = [];

  findParent(list.value.items, selectedNodes[0], result);

  activeComponent.value = result[result.length - 1];

  breadcrumbs.value = result;

  activeStorageItem.value = selectedNodes[0];
};

const componentLists = ref(componentListsJson);

const componentsProps = componentPropsJson;

const useFormRs = ref({});

const onTabClick = (item) => {
  // console.info("item =>", item);

  activeTabKey.value = item.key;
};

const emptyForm = () => {
  list.value.model = {};
  list.value.rules = {};
  list.value.items[0].children = [];

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

const onActiveComponent = (item: any, index: number) => {
  // console.info('onActiveComponent =>',item);
  activeComponent.value = item;

  activeComponentIndex.value = index;
};

const cloneComponent = (item: any) => {
  console.info("cloneComponent =>", item);

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
};

const addComponent = (item: any) => {
  let addedComponent = cloneDeep(item);
  addedComponent.id = nanoid();

  addedComponent.class = "tree-item";

  if (addedComponent.type === "grid-layout") {
    addedComponent.children.forEach((child) => {
      child.id = nanoid();
    });
  }

  let itemName = nanoid();
  addedComponent.item.name = itemName;

  addedComponent.componentProps = componentsProps[addedComponent.type]; // 增加 componentProps
  addedComponent.formItemProps = formItemPropsJson; // 增加 formIte
  addedComponent.componentEvents = componentEventsJson[addedComponent.type]; // 增加 componentEvents

  list.value.items[0].children.push(addedComponent);

  if (addedComponent.type !== "grid-layout") {
    list.value.model[itemName] = "";
    list.value.rules[itemName] = [];
  }

  // let activeIndex = list.value.items.length - 1;

  // activeComponent.value = list.value.items[activeIndex];

  // activeComponentIndex.value = activeIndex;

  useFormRs.value = useForm(list.value.model, list.value.rules);
};

// 删除表单节点
const deleteItem = (data: any) => {
  removeNodeInTree(list.value.items[0].children, data.id);
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

const onMove = (event: MoveEvent, originalEvent: Event) => {
  console.info("onMove.event =>", event);
  console.info("onMove.originalEvent =>", originalEvent);
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
  list.value.rules[itemName] = [];

  console.info("copyComponent =>", item, index);

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

const onFormItemFocus = (item, index, e) => {
  console.info("onFormItemFocus.item", item);
  console.info("onFormItemFocus.index, e =>", index);
  console.info("onFormItemFocus.e =>", e);

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

const onFormItemBlur = (item, index, e) => {
  if (activeComponent.value.type !== "form") {
    if (item.field === "name") {
      let currentChangedValue = activeComponent.value.item.name;
      // models
      let modelKeys = Object.keys(list.value.model);
      modelKeys[modelKeysIndex.value] = currentChangedValue;
      let newModel = Object.fromEntries(modelKeys.map((item) => [item, ""]));
      list.value.model = newModel;

      // rules
      let rulesKeys = Object.keys(list.value.rules);
      rulesKeys[modelKeysIndex.value] = currentChangedValue;
      let newRules = Object.fromEntries(rulesKeys.map((item) => [item, []]));
      list.value.rules = newRules;
    }
  }
};

const onFormItemNameChange = (item, index, e) => {
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
      // modelKeys[activeComponentIndex.value] = changedName;
      // let newModel = Object.fromEntries(modelKeys.map((item) => [item, ""]));

      // 更新表单model
      // list.value.model = newModel;

      // 更新表单的验证规则
      /**
       * 1.同步重置了验证规则，可想办法保留验证规则
       */
      // let newRules = Object.fromEntries(modelKeys.map((item) => [item, []]));
      // list.value.rules = newRules;
      // useFormRs.value = useForm(list.value.model, list.value.rules);
    }
  }
};

const saveJson = () => {
  let fileName = "ims-designer-data.json";
  let content = "data:text/json;charset=utf-8,";

  let tmpData = cloneDeep(list.value);
  console.info("toArray =>", tmpData.items[0].children);

  let formItems = toArray(tmpData.items[0].children).filter(
    (item) => item.type !== "grid-layout-col" && item.type !== "grid-layout"
  );

  console.info("formItems =>", formItems);
  // 校验规则设置
  formItems.forEach((item) => {
    tmpData.rules[item.item.name] = item.item.rules;
  });

  content += JSON.stringify(tmpData, null, 2);
  var encodedUri = encodeURI(content);
  var actions = document.createElement("a");
  actions.setAttribute("href", encodedUri);
  actions.setAttribute("download", fileName);
  actions.click();
};

const breadcrumbs = ref([]);

watch(activeStorageItem, (newActiveStorageItem: any) => {
  let result = [];

  findParent(list.value.items, newActiveStorageItem, result);

  activeComponent.value = result[result.length - 1];

  breadcrumbs.value = result;

  treeSelectedKeys.value = [newActiveStorageItem.id];
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
        --at-apply: flex-1 w-350px h-full;

        &-component {
          --at-apply: flex flex-col h-500px;
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
          // border: 1px solid red;
        }

        &-outline {
          --at-apply: p-2;
          // border: 1px solid red;

          // &-tree {
          // }
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

          &-form {
            //  --at-apply: h-full;

            &-row {
              --at-apply: w-full box-border;

              &-col {
                --at-apply: box-border;
                border: 1px solid red;
                // --at-apply: w-full;
              }
            }
          }

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
          position: relative;
        }
      }
    }
  }
}
</style>

<style lang="less">
.ims-designer-content-left-contents-outline-tree {
  .ant-tree-switcher,
  ant-tree-switcher_close {
    --at-apply: f-c-c;
  }
}
</style>
