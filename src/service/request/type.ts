import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface HYInterceptors {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: AxiosResponse) => AxiosResponse
  responseFailureFn?: (err: any) => any
}

export interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYInterceptors
}
