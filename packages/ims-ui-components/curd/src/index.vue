<template>
  <define-operations v-slot="{ text, record, index, column }">
    <a-space :size="0">
      <template #split>
        <a-divider type="vertical" />
      </template>

      <template v-for="(action, index) in actions">
        <template
          v-if="action.position === CurdActionPositionEnum.TABLE_ROW_OPERATIONS"
        >
          <template v-if="action.component === 'ImsPopconfirmButton'">
            <component
              :is="action.component"
              :key="`action-${index}`"
              v-bind="action.props"
              :disabled="
                action.emit === 'curd-destroy'
                  ? record.deletedAt !== null
                  : !record.deletedAt
              "
              @confirm="onAction(action.emit, record)"
            />
          </template>

          <template v-else>
            <component
              :is="action.component"
              :key="`action-${index}`"
              v-bind="action.props"
              @click="onAction(action.emit, record)"
            />
          </template>
        </template>
      </template>
    </a-space>
  </define-operations>

  <div :class="prefixCls" ref="imsElRef" :style="{
     
      position: 'relative',
      border: '1px solid #ebedf0',
     
    }">
    <div :class="`${prefixCls}-filter`" v-if="!initialing" ref="filterEl">

 
      <ims-form
        v-if="filters.spans && filterForm"
        ref="filterFormRef"
        v-bind="filters"
        layout="inline"
        :labelCol="{
          style:'width:0;display:none'
        }"
        :validateInfos="filterForm.validateInfos"
      ></ims-form>
      
      <div :class="`${prefixCls}-filter-condition-bar`" v-if="conditionBar" >
        <fieldset>
          <legend>筛选条件</legend>
          <a-tag v-for="n in 20" :key="n" color="blue" closable class="mb-2"
            >状态：启用</a-tag
          >
        </fieldset>
      </div>

      <div
        :class="`${prefixCls}-filter-action-bar`"
        class="mt-2"
        ref="actionBarRef"
      >
        <a-space>
          <template v-for="(action, index) in actions">
            <component
              :is="action.component"
              :key="`action-${index}`"
              v-bind="action.props"
              @click="onAction(action.emit, {})"
              v-if="
                action.position ===
                CurdActionPositionEnum.FILTER_ACTION_BAR_LEFT
              "
            />
          </template>
        </a-space>
        <a-space>
          <template v-for="(action, index) in actions">
            <component
              v-if="
                action.position ===
                CurdActionPositionEnum.FILTER_ACTION_BAR_RIGHT
              "
              :is="action.component"
              :key="`action-${index}`"
              v-bind="action.props"
              @click="onAction(action.emit, { a: 'aa', b: 'b' })"
            />
          </template>

          
          <ims-button
            :loading="filtering"
            text="重置"
            icon="ant-design:retweet-outlined"
            @click="onFilterFormReset"
          />
          <ims-button
            type="primary"
            :loading="filtering"
            text="查询"
            icon="ant-design:search-outlined"
            @click="onQuery"
          />
          <a-space :size="0">
            <!-- -->
            <ims-button
              type="link"
              :gapless="true"
              text="展开搜索"
              @click="onFilterFormSearch"
              v-if="filters.spans > 48" 
              
            />

            <a-dropdown v-if="false" placement="bottomLeft" :trigger="['click']">
              <icon
                icon="tabler:settings-down"
                :inline="true"
                color="#1677ff"
                class="cursor-pointer"
              />
              <template #overlay>
                <a-menu>
                  <a-menu-item :disabled="filters.spans < 48">
                    <a-checkbox
                      v-model:checked="conditionBar"
                      :disabled="filters.spans < 48"
                      >筛选条件</a-checkbox
                    >
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item>
                    <a-checkbox v-model:checked="immediateSearch"
                      >立即搜索</a-checkbox
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <template #icon>
                      <icon icon="ant-design:ellipsis-outlined"></icon>
                    </template>

                    <a href="javascript:;">其他设置</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <div @click="onAdvancedFilter">
              <ims-button
              type="link"
              :gapless="true"
              text="高级筛选"
              
              
            />
              <icon
                icon="ant-design:down-outlined"
                :inline="true"
                color="#1677ff"
                class="cursor-pointer"
              />
            </div>
          </a-space>
        </a-space>
      </div>
    </div>
    <!--  -->
    <a-drawer
    v-model:open="advancedFiltering"
    :headerStyle="{display:'none'}"

    :getContainer="()=> imsElRef"
    :closable="false"

    placement="top"
    :mask="true"
    
    root-class-name="advanced-filter"
    :root-style="{ position: 'absolute !important' }"
  
    title="高级筛选"
    height="auto"
    :maskStyle="{
      background:'rgba(0, 0, 0, 0.01)'
    }"
    :bodyStyle="{
      padding:'16px'
    }"
   
    
  >
  <div class="">
    <ims-form
        v-if="filters.spans && filterForm"
        ref="filterFormRef"
        v-bind="filters"
        layout="vertical"
        :validateInfos="filterForm.validateInfos"
      ></ims-form>
  </div>
    <template #footer>
      <div class="flex justify-between items-center">
        <div>
          <a-space>
          <template v-for="(action, index) in actions">
            <component
              :is="action.component"
              :key="`action-${index}`"
              v-bind="action.props"
              @click="onAction(action.emit, {})"
              v-if="
                action.position ===
                CurdActionPositionEnum.FILTER_ACTION_BAR_LEFT
              "
            />
          </template>
        </a-space>
        </div>
        <div>
          <a-space>
          <template v-for="(action, index) in actions">
            <component
              v-if="
                action.position ===
                CurdActionPositionEnum.FILTER_ACTION_BAR_RIGHT
              "
              :is="action.component"
              :key="`action-${index}`"
              v-bind="action.props"
              @click="onAction(action.emit, { a: 'aa', b: 'b' })"
            />
          </template>

          
          <ims-button
            :loading="filtering"
            text="重置"
            icon="ant-design:retweet-outlined"
            @click="onFilterFormReset"
          />
          <ims-button
            type="primary"
            :loading="filtering"
            text="查询"
            icon="ant-design:search-outlined"
            @click="onQuery"
          />
          <a-space :size="0">
            <!-- -->
            <ims-button
              type="link"
              :gapless="true"
              text="展开搜索"
              @click="onFilterFormSearch"
              v-if="filters.spans > 48" 
              
            />

            <a-dropdown v-if="false" placement="bottomLeft" :trigger="['click']">
              <icon
                icon="tabler:settings-down"
                :inline="true"
                color="#1677ff"
                class="cursor-pointer"
              />
              <template #overlay>
                <a-menu>
                  <a-menu-item :disabled="filters.spans < 48">
                    <a-checkbox
                      v-model:checked="conditionBar"
                      :disabled="filters.spans < 48"
                      >筛选条件</a-checkbox
                    >
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item>
                    <a-checkbox v-model:checked="immediateSearch"
                      >立即搜索</a-checkbox
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <template #icon>
                      <icon icon="ant-design:ellipsis-outlined"></icon>
                    </template>

                    <a href="javascript:;">其他设置</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <div @click="onAdvancedFilter">
              <ims-button
              type="link"
              :gapless="true"
              text="简单筛选"
              
              
            />
              <icon
                icon="ant-design:up-outlined"
                :inline="true"
                color="#1677ff"
                class="cursor-pointer"
              />
            </div>
          </a-space>
        </a-space>
        </div>
      </div>
    </template>
  </a-drawer>
    <!-- {{ slotsNames }} -->
    <div :class="`${prefixCls}-table`">
      <!-- <ims-json-viewer :data="paginations" editable showLine></ims-json-viewer> -->
      <!-- {{ paginations }} -->
      <ims-table
        v-if="!initialing"
        v-bind="$attrs"
        :paginations="paginations"
        :columns="columns"
        :schemes="schemes"
        :dataTable="dataTable"
        :rowSelection="rowSelection"
        :lists="lists"
        :footer-bar="true"
        :loading="filtering"
        :pagination="false"
        @paginationChange="paginationChange"
      >
        <!-- 透传 slots -->
        <template v-for="(_, name) in $slots" v-slot:[name]="slotProps">
          <template v-if="name === 'bodyCell'">
            <!-- 操作列 -->
            <template v-if="slotProps.column.key === 'operations'">
              <!-- 组合方式(combination mode) "+" 为组合符号 -->
              <!-- 1. 合并(merge)：由外部内容替换覆盖 A + B => A + B -->
              <!-- 2. 覆盖(overlay)：由外部内容替换覆盖 A + B => A -->
              <!-- 3. 覆盖合并(overlay_merge)：根据A、B的情况进行分析后，根据分析结果，选择性的进行 覆盖和合并 
                1): A:{1,2,3} + B:{1,2,4} => {1,2,3,4}
                2): A:{1,2,3} + B:{1,2,4} => {1,2,3,4}
                3): xxxx
                ... 
                n): xxxxx
               -->

              <!-- 
                先实现 1 2 两种方式，3方式 后续再考虑实现

                默认为合并

               -->

              <!-- column.combination = column.hasOwnProperty('combination') === false ||  false || TableColumnCombinationModeEnum.MERGE  -->

              <template
                v-if="
                  slotProps.column.combination ===
                  TableColumnCombinationModeEnum.OVERLAY_MERGE
                "
              >
                <!-- 覆盖合并overlay_merge 暂时处理为 合并(merge) -->

                <a-space class="overlay_merge" :key="name">
                  <slot :name="name" v-bind="slotProps || {}"></slot>

                  <reuse-operations
                    :record="slotProps.record"
                    :column="slotProps.column"
                    :index="slotProps.index"
                    :text="slotProps.text"
                  ></reuse-operations>
                </a-space>
              </template>

              <template
                v-else-if="
                  slotProps.column.combination ===
                  TableColumnCombinationModeEnum.OVERLAY
                "
              >
                <!-- 覆盖 overlay -->
                <a-space class="overlay" :key="name">
                  <slot :name="name" v-bind="slotProps || {}"></slot>
                </a-space>
              </template>

              <template v-else>
                <!-- 合并(merge) -->

                <a-space class="merge" :size="0" :key="name">
                  <template #split>
                    <a-divider type="vertical" />
                  </template>

                  <slot :name="name" v-bind="slotProps || {}"></slot>

                  <reuse-operations
                    :record="slotProps.record"
                    :column="slotProps.column"
                    :index="slotProps.index"
                    :text="slotProps.text"
                  ></reuse-operations>
                </a-space>
              </template>
            </template>
            <!-- 其他列 -->
            <slot :name="name" v-else v-bind="slotProps || {}"></slot>
          </template>

          <template v-else>
            <slot :name="name" v-bind="slotProps || {}"></slot>
          </template>
        </template>
        <!-- 透传 slots -->

        <template
          v-if="!slotsNames.includes('bodyCell')"
          #bodyCell="{ text, record, index, column }"
        >
          <template v-if="column.key === 'operations'">
            <reuse-operations
              :record="record"
              :column="column"
              :index="index"
              :text="text"
            ></reuse-operations>
          </template>
        </template>

        <!-- 批量操作区域 -->
        <template #footer-action>
          <a-space>
            <!-- <a-button :disabled="!selectedRowKeys.length">批量</a-button>
          <a-button :disabled="!selectedRowKeys.length">修改</a-button> -->

            <a-dropdown>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <template #icon
                      ><icon icon="ant-design:delete-outlined"></icon
                    ></template>

                    删除
                  </a-menu-item>
                  <a-menu-item key="2">
                    <template #icon
                      ><icon icon="ri:device-recover-line"></icon
                    ></template>
                    恢复
                  </a-menu-item>
                  <a-menu-item key="3">
                    <template #icon
                      ><icon icon="ant-design:delete-outlined"></icon
                    ></template>
                    其他
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button :disabled="!selectedRowKeys.length">
                <span>批量操作</span>
                <icon
                  icon="ant-design:up-outlined"
                  :inline="true"
                  class="ml-2"
                />
              </a-button>
            </a-dropdown>
          </a-space>
        </template>
      </ims-table>
    </div>
    <!--  -->
    <a-spin
      :class="`${prefixCls}-spin`"
      v-if="initialing"
      tip="Initializing..."
    ></a-spin>
  </div>
</template>

<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

import { ImsTable } from "../../table";

import { createReusableTemplate } from "@vueuse/core";

import { storeToRefs } from "pinia";

import { ImsTableColumn } from "@imsjs/ims-ui-types";

import { differenceBy,unionBy } from "lodash-es";

import {
  CurdActionEmitEnum,
  CurdActionPositionEnum,
  TableColumnCombinationModeEnum,
} from "@imsjs/ims-ui-enums";
import { Table } from "ant-design-vue";

import { CurdProps,CurdAction } from "@imsjs/ims-ui-types";

const COMPONENT_NAME = "ImsCurd";

const DEFAULT_ACTIONS:CurdAction[] = [
  {
    position: "fl",
    component: "ImsButton",
    props: {
      type: "primary",
      text: "增加",
      icon: "mingcute:file-import-fill",
    },
    emit: "curd-create",
  },
  {
    position: "fl",
    component: "ImsButton",
    props: {
      type: "primary",
      text: "导入",
      icon: "mingcute:file-import-fill",
    },
    emit: "curd-import",
  },
  {
    position: "fr",
    component: "ImsButton",
    props: {
      type: "primary",
      text: "导出",
      icon: "mingcute:file-import-fill",
    },
    emit: "curd-export",
  },
  {
    position: "ro",
    component: "ImsButton",
    props: {
      type: "link",
      text: "查看",
      gapless: true,
      size: "small",
    },
    emit: "curd-detail",
  },
  {
    position: "ro",
    component: "ImsButton",
    props: {
      type: "link",
      text: "编辑",
      gapless: true,
    },
    emit: "curd-edit",
  },
  {
    position: "ro",
    component: "ImsPopconfirmButton",

    props: {
      canConfirm: false,
      type: "link",
      text: "删除",
      title: "确定要删除此数据么?",
      gapless: true,
    },
    emit: "curd-destroy",
  },
  {
    position: "ro",
    component: "ImsPopconfirmButton",
    props: {
      canConfirm: false,
      type: "link",
      text: "恢复",
      title: "确定要恢复此数据么?",
      gapless: true,
    },
    emit: "curd-recovery",
  },
];

defineOptions({
  name: COMPONENT_NAME,
});

const { prefixCls } = useStyle("curd");

// emit 事件
const emit = defineEmits([
  // C
  "curd-create",
  "curd-import",
  // U
  "curd-edit",
  "curd-update",

  // R
  "curd-query",
  "curd-search",
  "curd-detail",
  "curd-lists",
  "curd-export",

  // D
  "curd-delete",
  "curd-destroy",
  "curd-recovery",

  "curd-batch-destroy",
  "curd-batch-recovery",
]);

const filterFormRef = ref();

const filterEl = ref();

const imsElRef = ref();

const advancedFiltering = ref(false);

const onAdvancedFilter = () => {
  console.info('onAdvancedFilter =>');
  advancedFiltering.value = !advancedFiltering.value;
}

const getContainer = () => {
  return imsElRef.value;
}

const props = withDefaults(defineProps<CurdProps>(), {
  uri: () => false,
  actions: () => {
    return [
      {
        position: "fl",
        component: "ImsButton",
        props: {
          type: "primary",
          text: "增加",
          icon: "mingcute:file-import-fill",
        },
        emit: "curd-create",
      },
      {
        position: "fl",
        component: "ImsButton",
        props: {
          type: "primary",
          text: "导入",
          icon: "mingcute:file-import-fill",
        },
        emit: "curd-import",
      },
      {
        position: "fr",
        component: "ImsButton",
        props: {
          type: "primary",
          text: "导出",
          icon: "mingcute:file-import-fill",
        },
        emit: "curd-export",
      },
      {
        position: "ro",
        component: "ImsButton",
        props: {
          type: "link",
          text: "查看",
          gapless: true,
          size: "small",
        },
        emit: "curd-detail",
      },
      {
        position: "ro",
        component: "ImsButton",
        props: {
          type: "link",
          text: "编辑",
          gapless: true,
        },
        emit: "curd-edit",
      },
      {
        position: "ro",
        component: "ImsPopconfirmButton",

        props: {
          canConfirm: false,
          type: "link",
          text: "删除",
          title: "确定要删除此数据么?",
          gapless: true,
        },
        emit: "curd-destroy",
      },
      {
        position: "ro",
        component: "ImsPopconfirmButton",
        props: {
          canConfirm: false,
          type: "link",
          text: "恢复",
          title: "确定要恢复此数据么?",
          gapless: true,
        },
        emit: "curd-recovery",
      },
    ];
  },
});


// differenceBy
const differenceSet:CurdAction[] = differenceBy(DEFAULT_ACTIONS,props.actions,'emit');

console.info('differenceSet =>',differenceSet);

// const actions = Object.assign(DEFAULT_ACTIONS, props.actions,differenceSet);

const actions = unionBy(DEFAULT_ACTIONS,props.actions,'emit');

const selectedRowKeys = ref<any[]>([]); // Check here to configure the default column

const onSelectChange = (changableRowKeys: any[]) => {
  console.log("selectedRowKeys changed: ", changableRowKeys);
  selectedRowKeys.value = changableRowKeys;
};

const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onChange: onSelectChange,
    hideDefaultSelections: true,
    columnWidth: 80,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };
});

const { store: curdStore } = props;

const {
  lists,
  paginations,
  columns,
  schemes,
  dataTable,
  filters,
  initialing,
  filtering,
  filterForm,
} = storeToRefs(curdStore);
console.info("curd .lists =>", lists);

const { initializeCurd, getLists, destroy, recovery } = curdStore;

const slots = useSlots();
console.info("slots =>", slots);
const slotsNames = Object.keys(slots);

const [DefineOperations, ReuseOperations] = createReusableTemplate<{
  record: object & {
    deletedAt?: any;
    updatedAt?: any;
  };
  column: ImsTableColumn[];
  index?: number;
  text: any;
}>();

// 获取数据列表
const fetchList = () => {
  // console.info('fetchList:filterForm.value.modelRef =>',filterForm.value.modelRef);
  getLists(filterForm.value.modelRef);
};
// const filterForm = ref();
(async function initialization() {
  await initializeCurd();
})();

// 是否展示已选择中的过滤器查询/搜索条件
const conditionBar = ref(false);
const immediateSearch = ref(false);

// 分页事件
const paginationChange = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  filterForm.value.modelRef.page = page;
  filterForm.value.modelRef.pageSize = pageSize;
  fetchList();
};

// 查询事件
const onQuery = () => {
  // console.info('filterForm.value.modelRef =>',filterForm.value.modelRef);
  filterForm.value.modelRef.page = 1;
  fetchList();
};

const onFilterFormReset = () => {
  filterForm.value.resetFields();
  fetchList();
};

const onFilterFormSearch = () => {
  console.info("onFilterFormSearch");
  // filterForm.resetFields();
};

// CURD 事件处理
const onAction = (event: any, params: object = {}) => {
  if (event === CurdActionEmitEnum.DESTROY) {
    destroy(params);
  }
  if (event === CurdActionEmitEnum.RECOVERY) {
    recovery(params);
  }
  console.info("event =>", event);
  console.info("params =>", params);
  emit(event, params);
};
watch(
  () => filterForm.value.modelRef,
  (newValue, oldValue) => {
    if (immediateSearch.value) {
      fetchList();
    }
  },
  { deep: true }
);

defineExpose({
  filterFormRef,
  filterForm,
});
</script>



<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-curd";

.@{prefix-cls} {
  // border: 1px solid red;
  --at-apply: h-full flex content-center flex-col w-full;

  &-spin {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &-filter {
    --at-apply: p-4 mb-2 w-full rd bg-white;

    &-condition-bar {
      --at-apply: mt-2;
      // border: 1px solid red;
    }

    &-action-bar {
      // border: 1px solid red;
      --at-apply: flex justify-between items-center;
    }
  }

  &-table {
    overflow: hidden;
    --at-apply: flex-1 h-full;
  }
}
</style>
