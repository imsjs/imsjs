import type { AppRouteModule } from "@/router/types";
import { DEFAULT_LAYOUT, EMPTY_LAYOUT } from "@/router/constant";

const preffix = "/demo";

const dashboard: AppRouteModule = {
  path: `${preffix}`,
  name: "ms",
  component: EMPTY_LAYOUT,
  redirect: "/demo/preview",
  meta: {
    hideChildrenInMenu: true,
    icon: "simple-icons:about-dot-me",
    title: "dashboard.table",
    orderNo: 999,
  },
  children: [
    // {
    //   path: "table",
    //   name: "demo.table",
    //   component: () => import("@/views/demo/table.vue"),
    //   meta: {
    //     title: "demo.table",
    //     icon: "simple-icons:about-dot-me",
    //   },
    // },
    // {
    //   path: "vtable",
    //   name: "demo.vtable",
    //   component: () => import("@/views/demo/vtable.vue"),
    //   meta: {
    //     title: "demo.table",
    //     icon: "simple-icons:about-dot-me",
    //   },
    // },
    // {
    //   path: "editor",
    //   name: "demo.editor",
    //   component: () => import("@/views/demo/editor.vue"),
    //   meta: {
    //     title: "demo.editor",
    //     icon: "simple-icons:about-dot-me",
    //   },
    // },
    {
      path: "preview",
      name: "demo.preview",
      component: () => import("@/views/demo/preview.vue"),
      meta: {
        title: "demo.preview",
        icon: "simple-icons:about-dot-me",
      },
    },
  ],
};

export default dashboard;
