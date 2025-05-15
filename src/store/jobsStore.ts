import { create } from 'zustand'
import { FilterState, JobsInterface, SingleJobInterface } from '../types'
import { getJobs, getLocations } from '../services/apiService'

interface JobsState {
  jobs: JobsInterface | null
  locations: string[]
  isLoading: boolean
  error: string | null
  filters: FilterState
  currentPage: number

  // Actions
  fetchJobs: () => Promise<void>
  fetchLocations: () => Promise<void>
  setFilter: (_key: keyof FilterState, _value: string | boolean) => void
  resetFilters: () => void
  loadMore: () => Promise<void>
  getJob: (_id: number) => SingleJobInterface | undefined
}

const initialFilters: FilterState = {
  search: '',
  location: '',
  fullTime: false,
}

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: null,
  locations: [],
  isLoading: false,
  error: null,
  filters: initialFilters,
  currentPage: 1,

  fetchJobs: async () => {
    try {
      set({ isLoading: true, error: null })
      const jobsData = await getJobs(get().filters, get().currentPage)
      set({ jobs: jobsData, isLoading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch jobs',
        isLoading: false,
      })
    }
  },

  fetchLocations: async () => {
    try {
      const locations = await getLocations()
      set({ locations })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch locations',
      })
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1, // Reset to first page when filters change
    }))
  },

  resetFilters: () => {
    set({
      filters: initialFilters,
      currentPage: 1,
    })
  },

  loadMore: async () => {
    if (!get().jobs?.nextPage) return

    try {
      set({ isLoading: true, error: null })
      const nextPage = get().currentPage + 1
      const newJobsData = await getJobs(get().filters, nextPage)

      set((state) => ({
        currentPage: nextPage,
        jobs: state.jobs
          ? {
              ...newJobsData,
              data: [...state.jobs.data, ...newJobsData.data],
            }
          : newJobsData,
        isLoading: false,
      }))
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load more jobs',
        isLoading: false,
      })
    }
  },

  getJob: (id) => {
    return get().jobs?.data.find((job) => job.id === id)
  },
}))
