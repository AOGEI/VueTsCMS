import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { HYRequestConfig, HYInterceptors } from './type'

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYInterceptors
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        //console.log('请求拦截成功')
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //console.log('响应拦截成功')

        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  // 封装网络请求的方法
  request<T>(config: AxiosRequestConfig): Promise<T> {
    // 返回Promise
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(
          (res) => {
            //console.log(res)
            resolve(res)
            return res
          },
          (err) => {
            return err
          }
        )
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
