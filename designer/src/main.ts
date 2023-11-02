import { createApp } from "vue";
import App from "./App.vue";
import "vue-json-pretty/lib/styles.css";

import "@/assets/styles/index.less";

import { setupRouter } from "@/router";

import { Icon } from "@iconify/vue";

import Antd from "ant-design-vue";

// ims-ui 样式使用了 unocss 所有这里可以不引入
// import "virtual:uno.css";

import ImsUI from "@imsjs/ims-ui";

(async function bootstrap() {
  // if(window)

  const app = createApp(App);

  app.component("Icon", Icon);

  // 注册ims-ui
  app.use(Antd);
  app.use(ImsUI);

  // Configure routing
  setupRouter(app);

  await app.mount("#app");
})();
