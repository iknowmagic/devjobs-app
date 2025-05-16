import type { IncomingMessage, ServerResponse } from 'http'
import jobsData from './data.json'
import { parse } from 'url'

interface JobRequirements {
  content: string
  items: string[]
}

interface Job {
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

interface JobsResponse {
  data: Job[]
  limit: number
  totalPages: number
  totalItems: number
  prevPage: number | null
  nextPage: number | null
}

// Helper function to paginate results
const paginate = (data: Job[], page: number, limit: number): JobsResponse => {
  const actualPage = Math.max(1, page)
  const actualLimit = Math.min(Math.max(1, limit), 50) // Limit between 1-50

  const startIndex = (actualPage - 1) * actualLimit
  const endIndex = startIndex + actualLimit

  const paginatedData = data.slice(startIndex, endIndex)
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / actualLimit)

  return {
    data: paginatedData,
    limit: actualLimit,
    totalPages,
    totalItems,
    prevPage: actualPage > 1 ? actualPage - 1 : null,
    nextPage: actualPage < totalPages ? actualPage + 1 : null,
  }
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // Parse URL and query parameters
  const { query } = parse(req.url || '', true)

  // Get query parameters with default values
  const search = ((query.search as string) || '').toLowerCase()
  const location = ((query.location as string) || '').toLowerCase()
  const fullTime = query.fullTime === 'true'
  const page = parseInt((query.page as string) || '1', 10)
  const limit = parseInt((query.limit as string) || '12', 10)

  // Filter jobs based on search criteria
  let filteredJobs = [...jobsData] as Job[]

  // Apply search filter (company or position)
  if (search) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.company.toLowerCase().includes(search) ||
        job.position.toLowerCase().includes(search),
    )
  }

  // Apply location filter
  if (location) {
    filteredJobs = filteredJobs.filter(
      (job) => job.location.toLowerCase() === location,
    )
  }

  // Apply full-time filter
  if (fullTime) {
    filteredJobs = filteredJobs.filter(
      (job) => job.contract.toLowerCase() === 'full time',
    )
  }

  // Paginate results
  const result = paginate(filteredJobs, page, limit)

  // Send response
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(result))
}
