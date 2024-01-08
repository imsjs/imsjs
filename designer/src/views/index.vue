<template>
  <div :class="prefixCls">
    <ims-form-designer v-model:value="list" :components-props="componentsProps"  @save="onSave"></ims-form-designer>
  </div>
</template>
<script lang="ts" setup>

import { useStyle } from "@imsjs/ims-ui-hooks";

import { ImsFormDesignerConfigurationComponentsProps } from "@imsjs/ims-ui-types";
import formPropsJson from "@/assets/jsons/form-props.json";
// import componentPropsJson from "@/assets/jsons/component-props.json";

const { prefixCls } = useStyle("designer-demo");

const componentsProps:ImsFormDesignerConfigurationComponentsProps = {
  "input": [
    {
      "label": "占位提示",
      "field": "placeholder",
      "visibilityToggler": false,
      "visible": true,
      "apply":true,
      "component": {
        "name": "AInput",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入占位提示"
        }
      }
    },
    {
      "label": "默认值",
      "field": "defaultValue",
      "visibilityToggler": false,
      "visible": true,
      "apply":true,
      "component": {
        "name": "AInput",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入 默认内容"
        }
      }
    },
    {
      "label": "最大长度",
      "field": "maxlength",
      "visibilityToggler": false,
      "visible": true,
      "apply":true,
      "component": {
        "name": "AInputNumber",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入最大长度"
        }
      }
    },
    {
      "label": "前置标签",
      "field": "addonBefore",
      "visibilityToggler": false,
      "visible": true,
      "apply":true,
      "component": {
        "name": "AInput",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入前置标签"
        }
      }
    },
    {
      "label": "后置标签",
      "field": "addonAfter",
      "visibilityToggler": false,
      "visible": true,
      "apply":true,
      "component": {
        "name": "AInput",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入后置标签"
        }
      }
    },
    {
      "label": "前缀图标",
      "field": "prefix",
      "visibilityToggler": false,
      "visible": true,
      "apply":true,
      "tooltip": {
        "title": "设置 前缀图标 暂时只支持字符串"
      },
      "component": {
        "name": "AInput",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入后缀"
        }
      }
    },
    {
      "label": "后缀图标",
      "field": "suffix",
      "visibilityToggler": false,
      "visible": true,
      "apply":true,
      "tooltip": {
        "title": "设置 后缀图标 暂时只支持字符串"
      },
      "component": {
        "name": "AInput",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入后缀"
        }
      }
    },
    {
      "label": "类型",
      "field": "type",
      "visibilityToggler": true,
      "visible": true,
      "apply":true,
      "tooltip": {
        "title": "声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 <a-textarea /> 代替 type=\"textarea\")。"
      },
      "component": {
        "name": "AInput",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入 输入框的类型"
        }
      }
    },
    {
      "label": "输入框的 id",
      "field": "id",
      "visibilityToggler": false,
      "visible": true,
      "apply":true,
      "component": {
        "name": "AInput",
        "vModelField": "value",
        "props": {
          "placeholder": "请输入 输入框的id"
        }
      }
    },
    {
      "label": "是否有边框",
      "field": "bordered",
      "visibilityToggler": true,
      "visible": true,
      "apply":true,
      "component": {
        "name": "ASwitch",
        "vModelField": "checked",
        "props": {
          "placeholder": "请输入占位提示"
        }
      }
    },
    {
      "label": "允许清除内容",
      "field": "allowClear",
      "visibilityToggler": true,
      "visible": true,
      "apply":true,
      "component": {
        "name": "ASwitch",
        "vModelField": "checked",
        "props": {
          "placeholder": "请输入占位提示"
        }
      }
    },
    {
      "label": "字数提示",
      "field": "showCount",
      "visibilityToggler": true,
      "visible": true,
      "apply":true,
      "component": {
        "name": "ASwitch",
        "vModelField": "checked",
        "props": {
          "placeholder": "请输入占位提示"
        }
      }
    },
    {
      "label": "是否禁用",
      "field": "disabled",
      "visibilityToggler": true,
      "visible": true,
      "apply":true,
      "component": {
        "name": "ASwitch",
        "vModelField": "checked",
        "props": {
          "placeholder": "请输入占位提示"
        }
      }
    },
    {
      "label": "尺寸",
      "field": "size",
      "visibilityToggler": true,
      "visible": true,
      "apply":true,
      "tooltip": {
        "title": "组件大小。注：标准表单内的输入框大小限制为 middle。可选 large middle small"
      },
      "component": {
        "name": "ARadioGroup",
        "vModelField": "value",
        "props": {
          "options": [
            {
              "value": "",
              "label": "默认"
            },
            {
              "value": "large",
              "label": "大"
            },
            {
              "value": "middle",
              "label": "中"
            },
            {
              "value": "small",
              "label": "小"
            }
          ],
          "optionType": "button"
        }
      }
    },
    {
      "label": "校验状态",
      "field": "status",
      "visibilityToggler": true,
      "visible": true,
      "apply":true,
      "tooltip": {
        "title": "设置校验状态。注：一般情况无需设置,由验证规则自动生成。"
      },
      "component": {
        "name": "ARadioGroup",
        "vModelField": "value",
        "props": {
          "options": [
            {
              "value": null,
              "label": "无"
            },
            {
              "value": "error",
              "label": "错误"
            },
            {
              "value": "warning",
              "label": "警告"
            }
          ],
          "optionType": "button"
        }
      }
    },
    {
      "label": "事件",
      "field": "events",
      "tooltip": {
        "title": "组件的事件，渲染组件可以进行响应"
      },
      "visibilityToggler": true,
      "visible": true,
      "apply":true,
      "component": {
        "name": "ImsDesignerCustomizationEvents",
        "vModelField": "value",
        "props": {
          "events": [
            {
              "name": "change",
              "description": "输入框内容变化时的回调",
              "callback": "function(e)",
              "arguments": ["e"]
            },
            {
              "name": "pressEnter",
              "description": "按下回车的回调",
              "callback": "function(e)",
              "arguments": ["e"]
            }
          ]
        }
      }
    }
  ]
};

const list = ref({
  model: {},
  rules: {},
  items: [
    {
      id: "tHGUhT0q4Ddzuf86gjg21",
      title: "表单",
      icon: "iconoir:input-field",
      type: "form",
      vModelField: "value",
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

      component: {
        componentName: "AInputPassword",
        props: {
          placeholder: "请输入",
        },
      },
      componentProps: [],
      formItemProps: formPropsJson,
      class: "",
    },
  ],
});

const onSave = (data: any) => {
  console.info("onSave => data", data);

  console.info("onSave => list", list.value);
};


</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer-demo";

.@{prefix-cls} {
  --at-apply: h-full w-full;
}
</style>
