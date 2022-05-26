/**
 * https://tinyurl.com/y6j8ns9s
 */

import { loadingProgress } from '@/store'

import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const store = loadingProgress()
  store.startLoading()

  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  const store = loadingProgress()
  store.finishLoading()

  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const store = loadingProgress()
  store.finishLoading()

  return response
}

const onResponseError = onRequestError

export default (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
