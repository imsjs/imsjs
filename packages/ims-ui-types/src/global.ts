import type { VNodeChild, PropType as VuePropType, Ref } from "vue";

import type { NrlType } from "./shims/networks";

declare global {
  // define global

  /**
   * 任意类型的异步函数
   */
  type AnyPromiseFunction = (...arg: any[]) => PromiseLike<any>;

  /**
   * 任意类型的普通函数
   */
  type AnyNormalFunction = (...arg: any[]) => any;

  /**
   * 任意类型的函数
   */
  type AnyFunction = AnyNormalFunction | AnyPromiseFunction;

  /**
   *  T | null 包装
   */
  type Nullable<T> = T | null;

  type PartialReturnType<T extends (...args: unknown[]) => unknown> = Partial<
    ReturnType<T>
  >;
  /** MaybeRef vvvxx */
  type MaybeRef<T> = T | Ref<T>;

  // type Recordable<T> = Record<string, T>;
  type TimeoutHandle = ReturnType<typeof setTimeout>;
  type IntervalHandle = ReturnType<typeof setInterval>;

  /**
   * 字符串类型对象（只读）
   */
  interface ReadonlyRecordable<T = any> {
    readonly [key: string]: T;
  }

  type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }

  interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
  }

  type RefType<T> = T | null;

  type LabelValueOptions = {
    label: string;
    value: any;
    [key: string]: string | number | boolean;
  }[];

  type EmitType = (event: string, ...args: any[]) => void;

  type TargetContext = "_self" | "_blank";

  interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
  }

  type ComponentRef<T extends HTMLElement = HTMLDivElement> =
    ComponentElRef<T> | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  // import.meta
  interface ImportMetaEnv extends ViteEnv {
    __: never;
  }
  interface ViteEnv {
    VITE_USE_MOCK: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_DROP_CONSOLE: boolean;
    VITE_USE_HTTPS: boolean;
    VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_USE_IMAGEMIN: boolean;
  }

  // type NRL = ['AXIOS', 'ALOVA'] as const;

  interface GlobConfig {
    // Site title
    title: string;
    // Service interface url
    apiUrl: string;
    // Upload url
    uploadUrl?: string;
    //  Service interface url prefix
    urlPrefix?: string;
    // Project abbreviation
    shortName: string;
  }
  interface GlobEnvConfig {
    // VITE_NRL 网络请求库
    VITE_NRL: NrlType;
    // Site title
    VITE_GLOB_APP_TITLE: string;
    // Service interface url
    VITE_GLOB_API_URL: string;
    // Service interface url prefix
    VITE_GLOB_API_URL_PREFIX?: string;
    // Project abbreviation
    VITE_GLOB_APP_SHORT_NAME: string;
    // Upload url
    VITE_GLOB_UPLOAD_URL?: string;
  }
}
