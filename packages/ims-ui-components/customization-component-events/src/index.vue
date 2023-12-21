<template>
  <div :class="prefixCls">
    <a-checkbox-group
      v-model:value="checkedEvents"
      @change="onChange"
      class="w-full"
    >
      <a-row>
        <a-col :span="24" v-for="(element, index) in props.events" v-if="props.events">
          <div
            :key="index"
            class="flex justify-between items-center rd bg-#fff py-2 px-2"
            :class="{'mb-2':index !== (props.events.length - 1)}"
          >
            <div class="handler flex justify-left items-center w-145px">
              <a-checkbox
                :value="element.value"
                class="flex justify-left items-center"
              >
                <span class="break-all text-10px">{{ element.value }}</span>
              </a-checkbox>
            </div>
            <div class="flex-1 w-100px text-10px">
              <div class="text-#0000004f mb-1  overflow-hidden text-ellipsis">
                {{ element.label }}
              </div>
              <div class="text-#c41d7f overflow-hidden text-ellipsis italic">
                {{ element.callback }}
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

import { ImsCustomizationComponentEventsProps } from "@imsjs/ims-ui-types";

const { prefixCls } = useStyle("customization-component-events");
const COMPONENT_NAME = "ImsCustomizationComponentEvents";

const props = defineProps<ImsCustomizationComponentEventsProps>();

const modelValue = defineModel("value", {
  default: {},
});

defineOptions({
  name: COMPONENT_NAME,
});

const checkedEvents = ref([]);

const onChange = (checkedValue) => {
  let valueEvents = {};
  checkedValue.forEach((item) => {
    let findedIndex = props.events.findIndex((event) => event.id === item);
    let findedEvent = props.events[findedIndex];

    valueEvents[item] = findedEvent.arguments;
  });
  modelValue.value = valueEvents;
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-customization-component-events";

.@{prefix-cls} {
  --at-apply: w-full p-2;
  background-color: #eeeeee;

  // border: 1px dashed #d9d9d9;
}
</style>
