import React, { useEffect, useState } from 'react'
import { useJobsStore } from '../../store/jobsStore'

export const SearchBar: React.FC = () => {
  const { filters, setFilter, fetchJobs, fetchLocations, locations } =
    useJobsStore()

  const [searchTerm, setSearchTerm] = useState(filters.search)
  const [location, setLocation] = useState(filters.location)
  const [fullTime, setFullTime] = useState(filters.fullTime)
  const [isExpanded, setIsExpanded] = useState(false)

  // Fetch locations when component mounts
  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFilter('search', searchTerm)
    setFilter('location', location)
    setFilter('fullTime', fullTime)
    fetchJobs()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="z-10 relative bg-base-100 shadow-md mx-4 md:mx-10 lg:mx-40 -mt-8 rounded-lg"
    >
      <div className="flex md:flex-row flex-col">
        {/* Title/Company Search */}
        <div className="flex flex-1 items-center p-4 md:border-r border-b border-base-300 md:border-b-0">
          <svg
            className="mr-4 w-6 h-6 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Filter by title, companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
          />
        </div>

        {/* Desktop filters */}
        <div className="hidden md:flex md:flex-row flex-1">
          {/* Location Filter */}
          <div className="flex flex-1 items-center p-4 border-r border-base-300">
            <svg
              className="mr-4 w-6 h-6 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent focus:outline-none w-full"
            >
              <option value="">Filter by location...</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Full Time Filter and Search Button */}
          <div className="flex flex-1 justify-between items-center p-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fullTime"
                checked={fullTime}
                onChange={(e) => setFullTime(e.target.checked)}
                className="mr-3 checkbox checkbox-primary"
              />
              <label htmlFor="fullTime" className="font-medium text-sm">
                Full Time Only
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden flex justify-between items-center p-4">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-ghost btn-sm"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span className="ml-2">Filter</span>
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </div>
      </div>

      {/* Mobile expanded filters */}
      {isExpanded && (
        <div className="md:hidden p-4 border-t border-base-300">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full select-bordered select"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mobile-fullTime"
                checked={fullTime}
                onChange={(e) => setFullTime(e.target.checked)}
                className="mr-3 checkbox checkbox-primary"
              />
              <label htmlFor="mobile-fullTime" className="font-medium text-sm">
                Full Time Only
              </label>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default SearchBar
