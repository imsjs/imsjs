<template>
  <div :class="prefixCls">
    
    <!-- <ImsJsonViewer :data="modelValue" title="modelValue"></ImsJsonViewer> -->
    
    <div :class="`${prefixCls}-action-bar`" v-if="hab">
      <div :class="`${prefixCls}-action-bar-left`"> </div>
      <div :class="`${prefixCls}-action-bar-right`">
          <a-input placeholder="请按 名称/姓名 搜索物料" class="w-full"></a-input>
      </div>
    </div>
    <a-table
      v-bind="$attrs"
      :columns="parseedColumns"
      :data-source="modelValue"
      @change="onChange"
      ref="tableRef"
    >
      <template #headerCell="{ title, column }">
        <template v-if="column.key === 'index'">
          <div>
            <a-button
              v-if="hab === false"
              size="small"
              type="primary"
              shape="circle"
              @click="onAddRow"
            >
              <icon icon="ant-design:plus-outlined" :inline="true" />
            </a-button>
            <span v-else>{{ title }}</span>
          </div>
        </template>
      </template>
      
        <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.key === 'index'">
          <div :class="`${prefixCls}-index-wrapper`">
            <div :class="`${prefixCls}-index-wrapper-index index`">
              {{  calcIndex(index) }}
            </div>            
            <div :class="`${prefixCls}-index-wrapper-delete delete`">
              <a-button
                size="small"
                danger
                shape="circle"
                @click="onDeleteRow(index)"
              >
                <icon icon="ant-design:delete-outlined" :inline="true" />
              </a-button>
            </div>
          </div>
        </template>

        <template v-else>
          <component
            :is="column.component.name"
            v-bind="column.component.props"
            v-on="parseEvents(column,index)"
            :index="index"
            :class="
              column.component.name === 'ACheckbox' ||
              column.component.name === 'ASwitch'
                ? ''
                : 'w-full'
            "
            v-model:[column.component.model]="record[column.dataIndex]"
          >
          </component>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { useRequest } from "vue-hooks-plus";
import { useStyle } from "@imsjs/ims-ui-hooks";
import { createNetWork } from "@imsjs/ims-ui-utils";
import { isFunction, isObject } from "@vue/shared";
import { watch } from "vue";
import { ImsFormTableProps, ImsFormTableColumn } from "@imsjs/ims-ui-types";
import { Icon } from "@iconify/vue";
import {cloneDeep} from "lodash-es";
import { nanoid } from "nanoid";

import type { ComponentInternalInstance } from "vue";

import type { PaginationProps } from "ant-design-vue";
import ImsJsonViewer from "@imsjs/ims-ui-components/json-viewer";

const { prefixCls } = useStyle("form-table");

const COMPONENT_NAME = "ImsFormTable";
defineOptions({
  name: COMPONENT_NAME,
});

const tableRef = ref();

// const loading = ref(false);
const {
  api,
  options,
  params,
  initial,
  columns,
  hab = false

} = defineProps<ImsFormTableProps>();



const modelValue = defineModel<object[]>("value", {
  default: [],
});

const currentInstance:ComponentInternalInstance = getCurrentInstance();

// const emits = defineEmits([]);

const emits = defineEmits<{
  'added':[totality:number],
  'deleted':[totality:number],
}>();
// 动态生成 emit 事件
const emitEventHandler = (field: string, event: string, params: any) => {
  const eo = `${field}-${event}`;
  
  currentInstance.emitsOptions[eo] = null;
  // console.info('eo =>',eo);
  // console.info('params =>',params);
  emits(eo, params);
};
const parseEvents = (column:ImsFormTableColumn,index:number) => {
  // console.info('component =>',column.component,'index =>',index);
  if(column.component.hasOwnProperty("events")) {
    // console.info('需要解析事件 =>',column.component,column.component.events);
    let emitsEvents:any = {};
    for (const key in column.component.events) {
        emitsEvents[key] = (...args: any) => {
          let params:any = reactive({
            index:0
          });
          column.component.events[key].map((pkey: string, index: number) => {
            params[pkey] = args[index];
          });
          // params 想增加一个 index，但这里无法获取index
          // console.info('emitsEvents.params =>',params);

          // console.info('modelValue 222 =>',modelValue.value);
          params.index = calcIndex(index) - 1;
          emitEventHandler(column.key as string, key, params);
      };
    }
    // console.info('emitsEvents =>',emitsEvents);
    return emitsEvents;
  } else {
    // console.info('不需要解析事件');
    return {};
  }
  
}


const parseedColumns = ref<ImsFormTableColumn[]>([]);

const parseColumn = () => {
  // console.info('hab =>',hab);
  let hasIndexColumn = false;
  parseedColumns.value = columns.map((column: ImsFormTableColumn) => {

    // console.info('parseedColumns.map.column =>',column);
    
    if (!column.component.hasOwnProperty("model") && column.key !== "index") {
      column.component.model = "value";
    }
    if (column.key === "index") {
      hasIndexColumn = true;
    }
    return column;
  });

  if (hasIndexColumn === false) {
    const indexArray = {
        title: "序号",
        dataIndex: "index",
        key: "index",
        fixed:"left",
        align: "center",
        width: 80,
        component: {
          name: "",
        },
      };
    parseedColumns.value.unshift(indexArray as ImsFormTableColumn);
  }
};

parseColumn();




const currentPagination = ref({
  pageSize:10,
  current:1,
});

const onChange = (pagination:PaginationProps) => {
  currentPagination.value.current = pagination.current || 1;
  currentPagination.value.pageSize = pagination.pageSize || 10;
}

const calcIndex = (index:number) => {
  return (currentPagination.value.current - 1) * currentPagination.value.pageSize + index + 1;
}


const onAddRow = () => {
  modelValue.value.push(cloneDeep(initial));
  emits('added',modelValue.value.length);
};

const onDeleteRow = (index: number) => {
  // console.info("onDeleteRow =>");
  modelValue.value.splice(index, 1);

  emits('deleted',modelValue.value.length);
};

const { data, loading, run } = useRequest(
  () => {
    console.info("api =>", api);
    if (isFunction(api)) {
      return api(params);
    }
    if (isObject(api)) {
      const network = createNetWork() as any;
      return network.get({ url: api.uri, params });
    }
  },
  {
    manual: true,
  }
);

const getOptions = () => {
  if (options) {
    // optionsData.value = options;
    data.value = options;
    return;
  } else {
    run();
    return;
  }
};

(async () => {
  getOptions();
})();

watch(
  () => params,
  () => {
    getOptions();
    // run();
  },
  {
    deep: true,
  }
);

watch(
  () => options,
  () => {
    getOptions();
  },
  {
    deep: true,
  }
);
</script>


<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-form-table";

.@{prefix-cls} {
  --at-apply: min-w-100px w-full;


  &-action-bar {
    
    --at-apply: flex justify-between items-center p-2 mb-2;
  }
  // border: 1px solid red;
  &-index-wrapper {
    // border: 1px solid red;

    height: 24px;
    min-height: 24px;
    --at-apply: flex justify-center items-center;
    &-index {
      // display: none;
    }

    &-delete {
      display: none;
    }

    &:hover {
      // background-color: red;
      .index {
        display: none;
      }
      .delete {
        display: block;
      }
    }
  }
}
</style>

<style>
.ims-form-table {
  .ant-table-cell {
    .ant-select-selection-placeholder {
      text-align: left;
    }
    .ant-select-selection-item {
      text-align: left;
    }
  }

  
}

.ims-form-table-select-popup {
  .ant-select-item-option {
    text-align: left;
  }
}
</style>