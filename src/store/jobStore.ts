import { create } from 'zustand'

// Types
export interface JobRequirements {
  content: string
  items: string[]
}

export interface Job {
  id: number
  company: string
  logo: string
  logoBackground: string
  position: string
  postedAt: string
  contract: string
  location: string
  website: string
  apply: string
  description: string
  requirements: JobRequirements
  role: JobRequirements
}

export interface JobsResponse {
  data: Job[]
  limit: number
  totalPages: number
  totalItems: number
  prevPage: number | null
  nextPage: number | null
}

export interface JobFilters {
  search: string
  location: string
  fullTimeOnly: boolean
}

interface JobStore {
  // State
  jobs: JobsResponse | null
  selectedJob: Job | null
  isLoading: boolean
  error: string | null
  filters: JobFilters
  locations: string[]
  currentPage: number
  showJobModal: boolean

  // Actions
  fetchJobs: () => Promise<void>
  fetchLocations: () => Promise<void>
  loadMore: () => Promise<void>
  selectJob: (_job: Job | null) => void
  setFilter: (_key: keyof JobFilters, _value: string | boolean) => void
  resetFilters: () => void
  setShowJobModal: (_show: boolean) => void
}

const initialFilters: JobFilters = {
  search: '',
  location: '',
  fullTimeOnly: false,
}

// API functions
async function apiGetJobs(
  filters: JobFilters,
  page: number,
  limit: number,
): Promise<JobsResponse> {
  const params = new URLSearchParams()

  if (filters.search) params.append('search', filters.search)
  if (filters.location) params.append('location', filters.location)
  if (filters.fullTimeOnly) params.append('fullTime', 'true')

  params.append('page', page.toString())
  params.append('limit', limit.toString())

  const response = await fetch(`/api/jobs?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }

  return response.json()
}

async function apiGetLocations(): Promise<string[]> {
  const response = await fetch('/api/locations')

  if (!response.ok) {
    throw new Error('Failed to fetch locations')
  }

  return response.json()
}

export const useJobStore = create<JobStore>((set, get) => ({
  // Initial state
  jobs: null,
  selectedJob: null,
  isLoading: false,
  error: null,
  filters: initialFilters,
  locations: [],
  currentPage: 1,
  showJobModal: false,

  // Actions
  fetchJobs: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await apiGetJobs(get().filters, 1, 12)
      set({
        jobs: data,
        isLoading: false,
        currentPage: 1,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      })
    }
  },

  fetchLocations: async () => {
    try {
      const locations = await apiGetLocations()
      set({ locations })
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch locations',
      })
    }
  },

  loadMore: async () => {
    const { jobs, filters, currentPage } = get()

    if (!jobs?.nextPage) return

    try {
      set({ isLoading: true, error: null })
      const nextPage = currentPage + 1
      const newData = await apiGetJobs(filters, nextPage, 12)

      set({
        jobs: {
          ...newData,
          data: [...(jobs?.data || []), ...newData.data],
        },
        currentPage: nextPage,
        isLoading: false,
      })
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to load more jobs',
        isLoading: false,
      })
    }
  },

  selectJob: (job) => {
    set({
      selectedJob: job,
      showJobModal: job !== null,
    })
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }))
  },

  resetFilters: () => {
    set({ filters: initialFilters })
  },

  setShowJobModal: (show) => {
    set({ showJobModal: show })

    // If closing modal, clear selected job after animation
    if (!show) {
      setTimeout(() => {
        set({ selectedJob: null })
      }, 300)
    }
  },
}))
