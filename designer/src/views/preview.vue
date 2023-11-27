<template>
  <ims-modal :class="prefixCls" v-bind="$attrs" v-model:open="modelOpening">
    <template #title>{{ currentTitle }} </template>
    <!-- <ims-json-viewer :data="previewFormJson"></ims-json-viewer> -->
    <!-- <ims-json-viewer :data="useFormRs"></ims-json-viewer> -->
    <div>
      <a-form v-bind="testData.items[0].item" v-if="useFormRs">
        <template v-for="(item, index) in testData.items[0].children">
          <template v-if="item.type === 'grid-layout'">
            <a-row >
              <a-col :key="index" v-for="(rowItem, index) in item.children"  :span="24/item.children.length">
                <a-form-item
                  v-bind="
                    Object.assign(
                      rowItem.children[0].item,
                      useFormRs.validateInfos[rowItem.children[0].item.name]
                    )
                  "
                >
                  <component
                    :is="rowItem.children[0].component.componentName || 'AInput'"
                    v-bind="rowItem.children[0].component.props"
                    v-model:[item.vModelField]="testData.model[rowItem.children[0].item.name]"
                  ></component>
                </a-form-item>
              </a-col>
            </a-row>
          </template>

          <a-form-item
            v-else
            v-bind="
              Object.assign(item.item, useFormRs.validateInfos[item.item.name])
            "
          >
            <component
              :is="item.component.componentName || 'AInput'"
              v-bind="item.component.props"
              v-model:[item.vModelField]="testData.model[item.item.name]"
            ></component>
          </a-form-item>
        </template>
      </a-form>
    </div>
    <template #footer>
      <a-space>
        <a-button @click="submitForm">提交</a-button>
        <a-button @click="resetForm">重置</a-button>

        <a-button @click="onCancel">取消</a-button>
      </a-space>
    </template>
  </ims-modal>
</template>

<script lang="ts" setup>
import { Form } from "ant-design-vue";

import previewFormJson from "@/assets/jsons/preview-form.json";

import { useStyle } from "@imsjs/ims-ui";

const useForm = Form.useForm;

const COMPONENT_NAME = "ImsJsonFormPreview";
defineOptions({
  name: COMPONENT_NAME,
});

const modelOpening = defineModel<boolean>("opening", { default: false });

const testData = ref(previewFormJson);

const props = withDefaults(
  defineProps<{
    data: any;

    // curdMode:
  }>(),
  {
    data: () => {
      return {};
    },
  }
);

const { data } = props;

const { prefixCls } = useStyle("ims-json-form-preview");

const currentTitle = ref("预览");

const useFormRs = ref(null);

const onCancel = () => {
  modelOpening.value = false;
};

const resetForm = () => {
  console.info("resetForm =>");
  useFormRs.value?.resetFields(useFormRs.value.initialModel);
  useFormRs.value?.resetFields();
};

const submitForm = () => {
  useFormRs.value
    .validate()
    .then(() => {
      console.log(toRaw(testData.value.model));
    })
    .catch((err) => {
      console.log("error", err);
    });
};

(async function init() {
  console.info("init");

  useFormRs.value = useForm(testData.value.model, testData.value.rules);
})();
</script>

<style lang="less" scoped></style>
