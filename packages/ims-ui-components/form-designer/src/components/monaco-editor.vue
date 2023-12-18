<template>
  <div :class="prefixCls">
    {{ modelValue }}
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

// import { ImsMonacoEditorProps } from "@imsjs/ims-ui-types";

const { prefixCls } = useStyle("monaco-editor");
const COMPONENT_NAME = "MonacoEditor";
defineOptions({
  name: COMPONENT_NAME,
});

const modelValue = defineModel<any>("value", {
  default: "",
});
// const loading = ref(false);
const props = defineProps();

const codeEditBox = ref();

console.info("props =>", props);


const testV = ref('aaa');


const initEditor = () => {
    // console.info('modelValue =>',JSON.stringify(modelValue.value));
    // monaco.editor.create(codeEditBox.value,{
    //     value:JSON.stringify(modelValue.value),
    //     language:'json',
    //     theme:'vs',
    // });
//   self.MonacoEnvironment = {
//     getWorker(_: any, label: string) {
//       if (label === 'json') {
//         return new jsonWorker();
//       }
//       if (label === 'css' || label === 'scss' || label === 'less') {
//         return new cssWorker();
//       }
//       if (label === 'html' || label === 'handlebars' || label === 'razor') {
//         return new htmlWorker();
//       }
//       if (label === 'typescript' || label === 'javascript') {
//         return new tsWorker();
//       }
//       return new editorWorker();
//     }
//   };
//   monaco.editor.create(codeEditBox.value, {
//     value: modelValue.value,
//     theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
//     language: 'json'
//   });
}

onMounted(() => {
  initEditor();
})



</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-monaco-editor";

.@{prefix-cls} {
  --at-apply: w-full h-full min-w-full min-h-full p-2;
  border: 2px solid red;

  .codeEditBox {
    width: 100%;
    height: 100%;
  }
  //   border: 2px dashed red;
}
</style>
