import { FilterState, JobsInterface } from '../types'

// Use import.meta.env for Vite or fallback to window.location.origin for production
const API_BASE_URL =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.MODE === 'production'
    ? '' // Empty for production (relative to the root)
    : 'http://localhost:3000' // Use your local dev server port

export async function getJobs(
  filters: FilterState,
  page = 1,
  limit = 12,
): Promise<JobsInterface> {
  const searchParams = new URLSearchParams()

  if (filters.search) searchParams.append('search', filters.search)
  if (filters.location) searchParams.append('location', filters.location)
  if (filters.fullTime) searchParams.append('fullTime', 'true')
  searchParams.append('page', page.toString())
  searchParams.append('limit', limit.toString())

  const queryString = searchParams.toString()
  const response = await fetch(`${API_BASE_URL}/api/getJobs?${queryString}`)

  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }

  return response.json()
}

export async function getLocations(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/getLocations`)

  if (!response.ok) {
    throw new Error('Failed to fetch locations')
  }

  return response.json()
}
