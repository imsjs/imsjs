import type { AppRouteModule } from "@/router/types";
import { DEFAULT_LAYOUT } from "@/router/constant";

const preffix = "/demo";

const dashboard: AppRouteModule = {
  path: `${preffix}`,
  name: "ms",
  component: DEFAULT_LAYOUT,
  redirect: "/demo/table",
  meta: {
    hideChildrenInMenu: true,
    icon: "simple-icons:about-dot-me",
    title: "dashboard.table",
    orderNo: 999,
  },
  children: [
    {
      path: "table",
      name: "demo.table",
      component: () => import("@/views/demo/table.vue"),
      meta: {
        title: "demo.table",
        icon: "simple-icons:about-dot-me",
      },
    },
    {
      path: "vtable",
      name: "demo.vtable",
      component: () => import("@/views/demo/vtable.vue"),
      meta: {
        title: "demo.table",
        icon: "simple-icons:about-dot-me",
      },
    },
  ],
};

export default dashboard;
