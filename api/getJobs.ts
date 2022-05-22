import json from './data.json'

import { JobsInterface, SingleJobInterface } from '../types'

const paginator = (
  _data: SingleJobInterface[],
  page: number,
  limit: number
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
    nextPage
  }
}

export default (req, res) => {
  let data: SingleJobInterface[]
  if (req.query.search) {
    const search = req.query.search.toLowerCase()
    data = json.filter(item => {
      return (
        item.company.toLowerCase().includes(search) ||
        item.position.toLowerCase().includes(search)
      )
    })
  } else {
    data = json
  }
  if (req.query.fullTime) {
    data = data.filter(
      (item: SingleJobInterface) => item.contract.toLowerCase() === 'full time'
    )
  }
  const result = paginator(
    data,
    +(req.query.page || 1),
    +(req.query.limit || 12)
  )
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(result))
}
