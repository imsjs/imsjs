<template>
  <template v-if="props.item.hasOwnProperty('children')">
    <ims-form-item
      :item="item"
      :layout="props.layout"
      :eoPrefix="props.eoPrefix"
      :validateInfos="props.validateInfos || {}"
      :model="props.model[props.item.field] || {}"
      :key="index"
      v-for="(item, index) in props.item.children"
    ></ims-form-item>
  </template>
  <a-col v-else :span="props.item.grid.span" v-show="props.item.grid.visible">
    <a-form-item
      class="w-full"
      v-bind="{ ...props.item.item, ...props.validateInfos[props.item.rule] }"
    >
      <component
        :is="props.item.component?.name"
        v-bind="props.item.component?.props"
        class="w-full"
        v-on="props.item.component?.emitsEvents || {}"
        v-model:value="props.model[props.item.field]"
      >
      </component>
    </a-form-item>
  </a-col>
</template>

<script lang="ts" setup>
import type { ImsFormItemProps } from "@imsjs/ims-ui-types";
// import { useStyle } from '@imsjs/ims-ui-hooks';

import { getCurrentInstance } from "vue";

const COMPONENT_NAME = "ImsFormItem";
defineOptions({
  name: COMPONENT_NAME,
  inheritAttrs: false,
});

const currentInstance = getCurrentInstance();

const props = withDefaults(defineProps<ImsFormItemProps>(), {});

const emit = defineEmits([]);
const emitEventHandler = (field: string, event: string, params: any) => {
  const eo = `${field}-${event}`;
  console.info('eo =>',eo);
  // console.info('currentInstance =>',currentInstance);
  currentInstance.emitsOptions[eo] = null;

  emit(eo, params);
};

if (props.item.component?.events) {
  let emitsEvents = {};
  for (const key in props.item.component.events) {
    emitsEvents[key] = (...args: any) => {
      let params = reactive({});
      props.item.component.events[key].map((pkey: string, index: number) => {
        params[pkey] = args[index];
      });

      emitEventHandler(props.item.field, key, params);
    };
  }

  props.item.component.emitsEvents = emitsEvents;
}
</script>

<!-- <style lang="less" scoped>
@prefix-cls: ~'@{namespace}-form';

.@{prefix-cls} {
}
</style> -->
