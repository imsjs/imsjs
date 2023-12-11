<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-wrapper`" ref="el">

     

      <div
        :class="`${prefixCls}-wrapper-item`"
        :key="item.id"
        v-for="(item, index) in modelValue"
      >
        <div class="handler">
          <Icon
            icon="ant-design:menu-outlined"
            :inline="true"
            class="cursor-move text-#888"
          ></Icon>
        </div>
        <div class="flex-1 px-2">
          <a-button block @click="onConfigRule(index)">配置规则</a-button>
        </div>
        <a-space>
          <icon
            icon="ant-design:down-outlined"
            :inline="true"
            class="cursor-pointer hover:color-#1677ff"
          />
          <icon
            icon="ant-design:up-outlined"
            :inline="true"
            class="cursor-pointer hover:color-#1677ff"
          />

          <icon
            icon="ant-design:delete-outlined"
            @click="deleteRule(index)"
            :inline="true"
            class="cursor-pointer hover:color-#dc2626"
          />
        </a-space>
      </div>
    </div>

    <div>
      <a-button block type="dashed" @click="addRule">添加一项</a-button>
    </div>
  </div>

  <a-drawer
    v-model:open="opening"
    class="custom-class"
    width="350"
    root-class-name="root-class-name"
    :style="{ position: 'absolute' }"
    placement="right"
    :headerStyle="drawerHeaderStyle"
    :bodyStyle="{ padding: '12px' }"
    :get-container="false"
  >
    <template #closeIcon>
      <div class="flex justify-between items-center">
        <icon
          icon="ant-design:arrow-left-outlined"
          :inline="true"
          class="text-#000 cursor-pointer hover:color-#1677ff"
        />
        <span class="ml-2 text-#666 text-12px">配置规则</span>
      </div>
    </template>
    <div class="" v-if="modelValue.length">
      <!-- {{ formItemRulePropsJson }} -->

      <div v-for="item in formItemRulePropsJson" class=" mb-2">
        <div
          class="text-13px text-#4e5969 mb-1 flex justify-between items-center"
        >
          <div class="flex items-center">
            <icon
              icon="mdi:required"
              v-if="item.required === true"
              style="margin-right: 2px; font-size: 8px; color: #ff4d4f"
              :inline="true"
            />
            <a-tooltip v-if="item.tooltip" v-bind="item.tooltip">
              <span class="py-1 border-b-dashed border-b-1">{{
                item.label
              }}</span>
            </a-tooltip>
            <span v-else class="py-1">{{ item.label }}</span>
            <span class="ml-1 text-12px text-#0000004f italic">{{
              item.field
            }}</span>
          </div>
          <div>
            <a-button size="small">{}</a-button>
          </div>
        </div>
        <div class="">
                       
          <component
            :is="item.component || 'AInput'"
            v-bind="item.props"
            v-model:[item.vModelField]="
                            modelValue[currentIndex][item.field]
                          "
            

          ></component>
        </div>
      </div>
    </div>
  </a-drawer>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

import type { ImsCustomizationFormItemRulesProps } from "@imsjs/ims-ui-types";

import type { Rule } from "ant-design-vue/es/form";

import { useDraggable } from "vue-draggable-plus";

import { nanoid } from "nanoid";

import formItemRulePropsJson from "./form-item-rule-props.json";

type FormItemRule = Rule & {
  // ID
  id: string;
};

const { prefixCls } = useStyle("customization-form-item-rules");
const COMPONENT_NAME = "ImsCustomizationFormItemRules";

const currentIndex = ref(0);

const modelValue = defineModel<FormItemRule[]>("value", {
  default: [],
});

defineOptions({
  name: COMPONENT_NAME,
});
defineProps<ImsCustomizationFormItemRulesProps>();

const el = ref();

const opening = ref(false);

const drawerHeaderStyle = {
  padding: "12px 8px",
};

useDraggable(el, modelValue, {
  animation: 150,
  ghostClass: "ghost",
});

const addRule = () => {
  modelValue.value.push({
    required: true,
    message: "校验提示信息",
    trigger: "blur",
    type: "string",
    id: nanoid(),
  });
};

const deleteRule = (index: number) => {
  // initOptions.value.splice(index, 1);
  modelValue.value.splice(index, 1);
  // modelValue.value = initOptions.value;
};

const onConfigRule = (index:number) => {
  console.info("onConfigRule");
  currentIndex.value = index;
  opening.value = true;
};


// watch(modelValue.value,()=>{
//   console.info('watch => modelValue.value =>',modelValue.value);
// })

</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-customization-form-item-rules";

.@{prefix-cls} {
  --at-apply: w-full py-2 px-2;
  background-color: #eeeeee;

  &-wrapper {
    --at-apply: p-0;

    &-item {
      --at-apply: "p-2 mb-2 rd bg-#fff flex justify-between items-center";
    }
  }
}
</style>
