<template>
  <a-cascader
    :class="prefixCls"
    v-bind="$attrs"
    :options="data"
    :loading="loading"
  ></a-cascader>
</template>
<script lang="ts" setup>
import { useRequest } from "vue-hooks-plus";
import { useStyle } from "@imsjs/ims-ui-hooks";
import { createNetWork } from "@imsjs/ims-ui-utils";
import { ImsCascaderProps } from "@imsjs/ims-ui-types";

const { prefixCls } = useStyle("cascader");

import { isFunction, isObject } from "@vue/shared";

const COMPONENT_NAME = "ImsCascader";
defineOptions({
  name: COMPONENT_NAME,
});

// const loading = ref(false);
const { api, options, params } = defineProps<ImsCascaderProps>();

const { data, loading, run } = useRequest(
  () => {
    console.info(`${COMPONENT_NAME} api =>`, api);
    console.info(`${COMPONENT_NAME} params =>`, params);
    if (isFunction(api)) {
      return api(params);
    }
    if (isObject(api)) {
      const network = createNetWork() as any;
      return network.get({ url: api.uri, params });
    }
  },
  {
    manual: true,
  }
);

const getOptions = () => {
  if (options) {
    // optionsData.value = options;
    data.value = options;
    return;
  } else {
    run();
    return;
  }
};

(async () => {
  getOptions();
})();

watch(
  () => params,
  () => {
    getOptions();
    // run();
  },
  {
    deep: true,
  }
);

watch(
  () => options,
  () => {
    getOptions();
  },
  {
    deep: true,
  }
);
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-cascader";

.@{prefix-cls} {
  --at-apply: min-w-200px w-full;
}
</style>
