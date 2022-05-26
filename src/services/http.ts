import loadingProgressInterceptor from '@/services/helpers/loadingProgressInterceptor'

import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'

import errorInterceptor from './helpers/errorInterceptor'

const cacheConf = {
  max: 500
}

const timeout = 5000

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const adapter = () => {
  if (axios?.defaults?.adapter) {
    return cacheAdapterEnhancer(axios.defaults.adapter, {
      enabledByDefault: false,
      defaultCache: new LRUCache(cacheConf)
    })
  }
}

const dataService = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SETTINGS_API_DATA}`,
  withCredentials: true,
  timeout,
  headers: {
    ...headers
  },
  adapter: adapter()
})

loadingProgressInterceptor(dataService)

export { dataService }
