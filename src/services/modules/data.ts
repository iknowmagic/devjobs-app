import { dataService } from '@/services/http'
import { JobsInterface, LocationsInterface } from '@/../types'

import { AxiosResponse } from 'axios'

export default {
  getLocations: async (): Promise<AxiosResponse<LocationsInterface>> => {
    return dataService.get('/getLocations')
  },
  getJobs: async (): Promise<AxiosResponse<JobsInterface>> => {
    return dataService.get('/getJobs')
  }
}
