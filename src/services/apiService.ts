/* eslint-disable no-undef */
import { JobFilters, JobsResponse } from '../store/jobStore'

// Helper function to determine the API base URL based on environment
const getApiBaseUrl = (): string => {
  // Check if we're in a Vercel environment
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    return '/api' // Vercel uses /api path for API routes
  }

  // Local development with npm run dev - API routes will be at /api
  return '/api'
}

/**
 * Fetch jobs with optional filtering
 */
export async function getJobs(
  filters: JobFilters,
  page: number = 1,
  limit: number = 12,
): Promise<JobsResponse> {
  const params = new URLSearchParams()

  if (filters.search) params.append('search', filters.search)
  if (filters.location) params.append('location', filters.location)
  if (filters.fullTimeOnly) params.append('fullTime', 'true')

  params.append('page', page.toString())
  params.append('limit', limit.toString())

  const baseUrl = getApiBaseUrl()
  const response = await fetch(`${baseUrl}/jobs?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }

  return response.json()
}

/**
 * Fetch unique job locations
 */
export async function getLocations(): Promise<string[]> {
  const baseUrl = getApiBaseUrl()
  const response = await fetch(`${baseUrl}/locations`)

  if (!response.ok) {
    throw new Error('Failed to fetch locations')
  }

  return response.json()
}
