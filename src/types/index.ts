export interface Requirements {
  content: string
  items: string[]
}

export interface SingleJobInterface {
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
  requirements: Requirements
  role: Requirements
}

export interface JobsInterface {
  data: SingleJobInterface[]
  limit: number
  totalPages: number
  totalItems: number
  prevPage: null | number
  nextPage: null | number
}

export interface FilterState {
  search: string
  location: string
  fullTime: boolean
}
