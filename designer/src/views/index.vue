<template>
  <div :class="prefixCls">



  

      <ims-form-designer :events="['aa']" v-model:value="list" @save="onSave"></ims-form-designer>
  </div>
</template>
<script lang="ts" setup>
import { ImsJsonViewer, useStyle } from "@imsjs/ims-ui";

import formPropsJson from "@/assets/jsons/form-props.json";

const { prefixCls } = useStyle("designer-demo");


const showing = ref(false);

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

const onSave = (data:any) => {
  console.info('onSave => data',data);

  console.info('onSave => list',list.value);
}

const showDesigner = () => {
  console.info('sdd');

  showing.value = true;
}

</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-demo";

.@{prefix-cls} {
  --at-apply: h-full w-full;
}
</style>
