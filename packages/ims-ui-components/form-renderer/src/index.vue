<template>
  <div :class="prefixCls">
  

    <a-form ref="formRef" v-bind="data.items[0].item" v-if="formInstance" >

      <template v-for="(item, index) in data.items[0].children">
          <template v-if="item.type === 'grid-layout'">
            <a-row >
              <a-col :key="index" v-for="(rowItem, index) in item.children"  :span="24/item.children.length">
                <a-form-item
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
                    v-model:[item.vModelField]="data.model[rowItem.children[0].item.name]"
                  ></component>
                </a-form-item>
              </a-col>
            </a-row>
          </template>

          <a-form-item
            v-else
            v-bind="
              Object.assign(item.item, formInstance.validateInfos[item.item.name])
            "
          >
            <component
              :is="item.component.componentName || 'AInput'"
              v-bind="item.component.props"
              v-model:[item.vModelField]="data.model[item.item.name]"
            ></component>
          </a-form-item>
        </template>

    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { ImsFormRendererProps,UseFormType,ImsFormExpose } from "@imsjs/ims-ui-types";
import { useStyle } from "@imsjs/ims-ui-hooks";
import { Form } from "ant-design-vue";

const COMPONENT_NAME = "ImsFormRenderer";
defineOptions({
  name: COMPONENT_NAME,
});
const { prefixCls } = useStyle("form-renderer");

const props = withDefaults(defineProps<ImsFormRendererProps>(), {});
const useForm = Form.useForm;

const formInstance = ref<UseFormType>();

const formRef = ref();


const emits = defineEmits<{
  'validateChange':[name: string | number | string[] | number[], status: boolean, errors: string[] | null]
}>();


const reset = () => {
  formInstance.value?.clearValidate();
  formInstance.value?.resetFields();
}

(async function init() {
  formInstance.value = useForm(props.data.model, props.data.rules,{
    onValidate:(name,status,errors) => {
      emits('validateChange',name,status,errors);
    }
  });
})();

defineExpose<ImsFormExpose>({
  formInstance:formInstance.value,
  reset:reset
} as ImsFormExpose)

</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-form-renderer";

.@{prefix-cls} {
  --at-apply: w-full;
  
}
</style>
