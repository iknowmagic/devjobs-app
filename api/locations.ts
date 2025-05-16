import { IncomingMessage, ServerResponse } from 'http'
import jobsData from './data.json'

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // Extract unique locations and sort alphabetically
  const uniqueLocations = [
    ...new Set(jobsData.map((job) => job.location)),
  ].sort()

  // Send response
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(uniqueLocations))
}
