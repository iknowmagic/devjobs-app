import React, { useEffect, useState } from 'react'
import { useJobsStore } from '../../store/jobsStore'
import { FaSearch, FaMapMarkerAlt, FaFilter } from 'react-icons/fa'

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

  const applyFilters = () => {
    setFilter('search', searchTerm)
    setFilter('location', location)
    setFilter('fullTime', fullTime)
    fetchJobs()
    setIsExpanded(false)
  }

  return (
    <div className="z-10 relative -mt-6 md:-mt-8 px-4 md:px-10 lg:px-40">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow-md rounded-lg overflow-hidden"
      >
        {/* Desktop Layout */}
        <div className="hidden md:flex divide-x divide-base-200">
          {/* Title/Company Search */}
          <div className="flex flex-1 items-center p-6">
            <FaSearch className="mr-4 w-5 h-5 text-primary" />
            <input
              type="text"
              placeholder="Filter by title, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-base"
            />
          </div>

          {/* Location Filter */}
          <div className="flex flex-1 items-center p-6">
            <FaMapMarkerAlt className="mr-4 w-5 h-5 text-primary" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-base appearance-none cursor-pointer"
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
          <div className="flex flex-1 justify-between items-center gap-4 p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={fullTime}
                onChange={(e) => setFullTime(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <span className="font-bold text-base">Full Time Only</span>
            </label>
            <button type="submit" className="px-8 text-base btn btn-primary">
              Search
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center p-4">
          <input
            type="text"
            placeholder="Filter by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent mr-2 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-ghost btn-circle"
          >
            <FaFilter className="text-primary" />
          </button>
          <button type="submit" className="ml-2 btn btn-primary btn-circle">
            <FaSearch />
          </button>
        </div>

        {/* Mobile Expanded Filters */}
        {isExpanded && (
          <div className="md:hidden bg-base-100 p-4 border-t border-base-200">
            <div className="mb-4">
              <div className="flex items-center pb-2 border-b border-base-200">
                <FaMapMarkerAlt className="mr-3 w-4 h-4 text-primary" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent focus:outline-none w-full appearance-none"
                >
                  <option value="">Filter by location...</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={fullTime}
                  onChange={(e) => setFullTime(e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                <span className="font-bold">Full Time Only</span>
              </label>

              <button
                type="button"
                onClick={applyFilters}
                className="w-full btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchBar
