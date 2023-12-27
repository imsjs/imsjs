<template>
  <div :class="prefixCls">
    <a-form ref="formRef" v-bind="data.items[0].item" v-if="formInstance">
      <template v-for="(item, index) in data.items[0].children">
        <template v-if="item.type === 'grid-layout'">
          <a-row>
            <a-col
              :key="index"
              v-for="(rowItem, index) in item.children"
              :span="24 / item.children.length"
            >
              <a-form-item
                v-if="
                  rowItem.children.length &&
                  rowItem.children[0].item.displayState === true
                "
                v-bind="
                  Object.assign(
                    rowItem.children[0].item,
                    formInstance.validateInfos[rowItem.children[0].item.name]
                  )
                "
              >
                <component
                  :is="rowItem.children[0].component.componentName || 'AInput'"
                  v-bind="rowItem.children[0].component.props"
                  v-on="rowItem.children[0].component.emitsEvents || {}"
                  v-model:[item.vModelField]="
                    data.model[rowItem.children[0].item.name]
                  "
                ></component>
              </a-form-item>
            </a-col>
          </a-row>
        </template>

        <template v-else>
          <a-form-item
            v-if="item.item.displayState === true"
            v-bind="
              Object.assign(
                item.item,
                formInstance.validateInfos[item.item.name]
              )
            "
          >
            <component
              :is="item.component.componentName || 'AInput'"
              v-bind="item.component.props"
              v-on="item.component?.emitsEvents || {}"
              v-model:[item.vModelField]="data.model[item.item.name]"
            ></component>
          </a-form-item>
        </template>
      </template>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type {
  ImsFormRendererProps,
  UseFormType,
  ImsFormExpose,
} from "@imsjs/ims-ui-types";
import { useStyle } from "@imsjs/ims-ui-hooks";
import { Form } from "ant-design-vue";
import { getCurrentInstance } from "vue";

import { foreach } from "tree-lodash";

const COMPONENT_NAME = "ImsFormRenderer";
defineOptions({
  name: COMPONENT_NAME,
});
const { prefixCls } = useStyle("form-renderer");

const props = withDefaults(defineProps<ImsFormRendererProps>(), {});
const useForm = Form.useForm;

const formInstance = ref<UseFormType>();

const formRef = ref();

const currentInstance = getCurrentInstance();

const emits = defineEmits<{
  validateChange: [
    name: string | number | string[] | number[],
    status: boolean,
    errors: string[] | null
  ];
}>();

const emitEventHandler = (field: string, event: string, params: any) => {
  const eo = `${field}-${event}`;
  currentInstance.emitsOptions[eo] = null;
  emits(eo, params);
};

const { data } = props;

// 处理表单事件 emitsEvents

foreach(props.data.items[0].children, (item) => {
  if (item.component && item.component.props.events) {
    // console.info(item.item.label, item.item, item.component.props.events);
    let emitsEvents = {};
    for (const key in item.component.props.events) {
      emitsEvents[key] = (...args: any) => {
        let params = reactive({});
        item.component.props.events[key].map((pkey: string, index: number) => {
          params[pkey] = args[index];
        });
        emitEventHandler(item.item.name, key, params);
      };
    }
    item.component.emitsEvents = emitsEvents;
  }
});

const reset = () => {
  formInstance.value?.clearValidate();
  formInstance.value?.resetFields();
};

(async function init() {
  console.info("props.data.rules =>", props.data.rules);

  formInstance.value = useForm(props.data.model, props.data.rules, {
    onValidate: (name, status, errors) => {
      emits("validateChange", name, status, errors);
    },
  });

  console.info("formInstance.value =>", formInstance.value);

  formInstance.value.validate();
})();

defineExpose<ImsFormExpose>({
  formInstance: formInstance.value,
  reset: reset,
} as ImsFormExpose);
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-form-renderer";

.@{prefix-cls} {
  --at-apply: w-full;
}
</style>
