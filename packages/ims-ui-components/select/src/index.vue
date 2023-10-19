<template>
  <a-select
    :class="prefixCls"
    v-bind="$attrs"
    :options="data"
    :loading="loading"
  ></a-select>
</template>
<script lang="ts" setup>
import { useRequest } from "vue-hooks-plus";
import { useStyle } from "@imsjs/ims-ui-hooks";
import { createNetWork } from "@imsjs/ims-ui-utils";
import { ImsSelectProps } from "@imsjs/ims-ui-types";

const { prefixCls } = useStyle("select");

import { isFunction, isObject } from "@vue/shared";

const COMPONENT_NAME = "ImsSelect";
defineOptions({
  name: COMPONENT_NAME,
});

// const loading = ref(false);
const { api, options, params } = defineProps<ImsSelectProps>();

const { data, loading, run } = useRequest(
  () => {
    console.info("api =>", api);
    if (isFunction(api)) {
      return api(params);
    }
    if (isObject(api)) {
      const network = createNetWork();
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
@prefix-cls: ~"@{namespace}-select";

.@{prefix-cls} {
  --at-apply: min-w-100px w-full;
}
</style>
