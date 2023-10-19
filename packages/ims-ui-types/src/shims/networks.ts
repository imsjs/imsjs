import type { Alova, AlovaOptions } from "alova";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export const nrlTypes = ["AXIOS", "ALOVA"] as const;

/** 网络请求库类型 */
export type NrlType = (typeof nrlTypes)[number];

export type ErrorMessageMode = "none" | "modal" | "message" | undefined;
export type SuccessMessageMode = ErrorMessageMode;

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Success message prompt type
  successMessageMode?: SuccessMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;

  withAuthorizationRefreshToken?: boolean;

  withAuthorizationAccessToken?: boolean;
}

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}
export interface Result<T = any> {
  code: number;
  type: "success" | "error" | "warning";
  message: string;
  data: T;
}

export interface ApiResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  meta?: object;
  links: object;
  debug?: object;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

// export interface NetWorkOptions AlovaOptions;

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig;

  /**
   * @description: 处理响应数据
   */
  transformResponseHook?: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (
    axiosInstance: AxiosResponse,
    error: Error
  ) => void;
}

// export

export type CreateNetworkOptions = CreateAxiosOptions | AlovaOptions;
