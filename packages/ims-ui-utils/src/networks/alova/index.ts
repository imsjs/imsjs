import { createAlova } from "alova";
import VueHook from "alova/vue";
import GlobalFetch from "alova/GlobalFetch";

// alova instance
const alova = createAlova({
  baseURL: "/api",
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  beforeRequest(request) {
    request.config.headers["Authorization-Refresh-Token"] = "vvvv";
    // console.info(request.config);
  },
  responded: {
    async onSuccess(response, method) {
      // console.info('response =>', response);
      const { status, statusText } = response;
      if (status >= 400) {
        throw new Error(statusText);
      }
      //   console.info('response.status =>', status);
      const json = await response.json();
      //   console.info('response.json =>', json);
      const { code, message, data, meta } = json;
      //   console.info('response.json.code =>', code);
      //   console.info('response.json.message =>', message);
      //   console.info('response.json.data =>', data);
      //   console.info('response.json.meta =>', meta);

      if (code !== 0) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(message);
      }
      //   response.headers.aa = 'vvv';
      //   console.info('method =>', method);

      return data;
    },
    onError(error, method) {
      console.info("onError.error =>", error);
      console.info("onError.method =>", method);
    },
  },
});

export { alova };

export default alova;
