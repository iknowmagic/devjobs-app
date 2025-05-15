import type { IncomingMessage, ServerResponse } from 'http'
import jobsData from './data.json'

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // Extract unique locations and sort them
  const locations = [...new Set(jobsData.map((job) => job.location))].sort()

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(locations))
}
