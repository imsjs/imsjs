<template>
  <div :class="prefixCls">
  
    <a-upload v-bind="$attrs"  v-model:file-list="modelValue" @change="onChange">
      <div>
        <icon :icon="triggerIcon" :inline="true" />
        <div>{{ triggerText }}</div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";
import { ImsUploaderProps } from "@imsjs/ims-ui-types";
import { Icon } from "@iconify/vue";
import type { UploadProps } from 'ant-design-vue';
const { prefixCls } = useStyle("uploader");
const COMPONENT_NAME = "ImsUploader";
defineOptions({
  name: COMPONENT_NAME,
});

const { triggerText = '上传',triggerIcon="ant-design:inbox-outlined" } = defineProps<ImsUploaderProps>();
const modelValue = defineModel<UploadProps['fileList']>('value', {
  default: [
  
  ]
});


const onChange = ({file,fileList,event}) => {
  console.info('onChange =>.file',file);
  console.info('onChange =>.fileList',fileList);
  console.info('onChange =>.event',event);
  if(file.status === "done") {
    file.url = file.response.data.url;

    console.info('onChange =>. bf',file);
  }

  
}

// const useAttr

</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-uploader";

.@{prefix-cls} {
  --at-apply: w-full p-1;
  border: 1px dashed #d9d9d9;
}
</style>
