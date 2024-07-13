//定义接口
interface RuntimeConfig {
  public: {
    baseUrl?: string;
    [key: string]: any;
  };
}
type FetchType = typeof $fetch;
export type FetchOptions = Parameters<FetchType>[1];
export const useClientReq = <T>(url: string, opts?: FetchOptions) => {
  const runtimeConfig: RuntimeConfig = useRuntimeConfig();
  //默认把token存储在cookie中
  const token = useCookie<string | undefined>('token');

  const defaultOptions: FetchOptions = {
    baseURL: runtimeConfig.public.baseUrl,
    onRequest({ options }) {
      // 设置请求头
      options.headers = (options.headers || {}) as { [key: string]: string };
      // console.log("request", options);
      //默认使用token认证,需要添加token到请求头
      if (token.value) {
        options.headers.Authorization = 'Bearer ' + token.value;
      }
    },
    onResponse({ response }) {
      // console.log("response", response);
      //我这里后端返回的code是200,根据后端返回的code变更条件
      if (+response.status === 200 && +response._data.code !== 200) {
        ElMessage.error(response._data.msg || '服务器返回错误');
      }
    },
    onResponseError({ response }) {
      // console.log("responseerror", response);
      ElMessage.error(response._data.msg || '服务器返回错误');
    }
  };

  return $fetch<T>(url, { ...defaultOptions, ...opts } as any);
};
