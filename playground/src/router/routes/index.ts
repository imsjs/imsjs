import { PAGE_NOT_FOUND_NAME, PAGE_NOT_FOUND_COMPONENT } from "../constant";

// @ts-ignore
const modules = import.meta.glob("./modules/**/*.ts", {
  eager: true,
});

const routeModuleList: any[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || undefined;

  if (mod !== undefined) {
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  }
});

// @ts-ignore
const apps = import.meta.glob("./apps/**/*.ts", {
  eager: true,
});

Object.keys(apps).forEach((key) => {
  const mod = apps[key].default || undefined;

  if (mod !== undefined) {
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  }
});

export const asyncRoutes = [...routeModuleList];

export const RootRoute = {
  path: "/",
  name: "Root",
  component: () => import("@/views/index.vue"),
  meta: {
    title: "App",
  },
};

export const NOT_FOUND_ROUTE = {
  path: "/:pathMatch(.*)*",
  // path:"/:pathMatch(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: PAGE_NOT_FOUND_COMPONENT,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
    hideMenu: true,
  },
};

// Basic routing without permission
export const basicRoutes = [
  RootRoute,
  ...asyncRoutes,
  // NOT_FOUND_ROUTE,
];
