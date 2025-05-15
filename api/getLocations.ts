import type { VercelRequest, VercelResponse } from '@vercel/node'
import jobsData from './data.json'

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Extract unique locations and sort them
  const locations = [...new Set(jobsData.map((job) => job.location))].sort()

  res.status(200).json(locations)
}
