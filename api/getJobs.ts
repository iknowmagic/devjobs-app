import type { VercelRequest, VercelResponse } from '@vercel/node'
import jobsData from './data.json'
import { JobsInterface, SingleJobInterface } from '../src/types'

const paginator = (
  _data: SingleJobInterface[],
  page: number,
  limit: number,
): JobsInterface => {
  const actualLimit = !+limit || +limit > 50 ? 50 : +limit
  const actualPage = +page || 1
  const offset = (actualPage - 1) * actualLimit
  const data = _data.slice(offset).slice(0, actualLimit)
  const totalItems = _data.length
  const totalPages = Math.ceil(totalItems / actualLimit)
  const prevPage = actualPage > 1 ? actualPage - 1 : null
  const nextPage = totalPages > actualPage ? actualPage + 1 : null

  return {
    data,
    limit: actualLimit,
    totalPages,
    totalItems,
    prevPage,
    nextPage,
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  let data: SingleJobInterface[] = [...jobsData]

  // Handle search
  if (typeof req.query.search === 'string') {
    const search = req.query.search.toLowerCase()
    data = data.filter((item) => {
      return (
        item.company.toLowerCase().includes(search) ||
        item.position.toLowerCase().includes(search)
      )
    })
  }

  // Handle fullTime filter
  if (req.query.fullTime === 'true') {
    data = data.filter(
      (item: SingleJobInterface) => item.contract.toLowerCase() === 'full time',
    )
  }

  // Handle location filter
  if (typeof req.query.location === 'string' && req.query.location !== '') {
    const locationQuery = req.query.location.toLowerCase()
    data = data.filter(
      (item: SingleJobInterface) =>
        item.location.toLowerCase() === locationQuery,
    )
  }

  const result = paginator(
    data,
    +(req.query.page || 1),
    +(req.query.limit || 12),
  )

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(result)
}
