import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = (error: {
  response: AxiosResponse
}): Promise<AxiosError> => {
  return Promise.reject(error)
}

export default (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
