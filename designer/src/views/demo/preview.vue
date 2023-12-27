<template>
  <div>
    <ImsFormRenderer ref="testRef" :data="testData" />

    <div>
      <a-space>
        <a-button @click="submitForm">提交</a-button>
        <a-button @click="resetForm">重置</a-button>

        <a-button @click="onCancel">取消</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Form } from "ant-design-vue";

import type { UseFormType } from "@imsjs/ims-ui-types";

import previewFormJson from "@/assets/jsons/preview-form.json";

import { useStyle } from "@imsjs/ims-ui";

const useForm = Form.useForm;

const COMPONENT_NAME = "ImsFormPreview";
defineOptions({
  name: COMPONENT_NAME,
});

const modelOpening = defineModel<boolean>("opening", { default: false });

const testData = ref(previewFormJson);

console.info("testData =>", testData.value);

const testRef = ref();

const { prefixCls } = useStyle("ims-json-form-preview");

const currentTitle = ref("预览");

const useFormRs = ref<UseFormType>();

const onCancel = () => {
  modelOpening.value = false;
};

const resetForm = () => {
  console.info("testRef =>", testRef.value.formInstance);
  // 方法一 重置表单
  // (testRef.value.formInstance as UseFormType).clearValidate();
  // (testRef.value.formInstance as UseFormType).resetFields();

  // 方法二  效果和方法一致
  testRef.value.reset();
};

const onValidateChange = (name, status: boolean, errors: string[] | null) => {
  console.info("validate-change name", name);
  console.info("validate-change status", status);
  console.info("validate-change errors", errors);
};

const onParentIdsChange = ({ value, option }) => {
  console.info("表单事件处理成功....");
  console.info("onParentIdsChange value", value);
  console.info("onParentIdsChange option", option);
};

const onNameChange = ({ e }: { e: InputEvent }) => {
  console.info("表单事件处理成功  onNameChange....");
  console.info("onNameChange e", e.data, e.detail);
};

const onNamePressEnter = ({ e }: { e: KeyboardEvent }) => {
  console.info("表单事件处理成功  onNamePressEnter....");
  console.info("onNamePressEnter e", e);
};

const submitForm = () => {
  (testRef.value.formInstance as UseFormType)
    .validate()
    .then(() => {
      console.info("验证成功.....", testData.value.model);
    })
    .catch((error) => {
      console.info("error =>", error);
    });
};

(async function init() {
  useFormRs.value = useForm(testData.value.model, testData.value.rules);
})();
</script>

<style lang="less" scoped></style>
