import React, { useState } from 'react'
import { useJobStore } from '../store/jobStore'
import { motion } from 'framer-motion'
import { FaSearch, FaMapMarkerAlt, FaFilter } from 'react-icons/fa'

interface SearchBarProps {
  onSearch: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { filters, setFilter, resetFilters, locations } = useJobStore()

  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState(filters.search)
  const [location, setLocation] = useState(filters.location)
  const [fullTimeOnly, setFullTimeOnly] = useState(filters.fullTimeOnly)

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setFilter('search', searchTerm)
    setFilter('location', location)
    setFilter('fullTimeOnly', fullTimeOnly)

    onSearch()
    setShowFilters(false)
  }

  // Handle reset filters
  const handleReset = () => {
    setSearchTerm('')
    setLocation('')
    setFullTimeOnly(false)
    resetFilters()
    onSearch()
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="z-20 relative -mt-6 md:-mt-8"
    >
      <div className="bg-base-100 shadow-lg rounded-lg overflow-hidden">
        {/* Desktop Search Layout */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex divide-x divide-base-200"
        >
          {/* Title/Company Search */}
          <div className="flex flex-1 items-center px-6 py-4">
            <FaSearch className="mr-3 text-primary" />
            <input
              type="text"
              placeholder="Filter by title, company..."
              className="bg-transparent focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Location Search */}
          <div className="flex flex-1 items-center px-6 py-4">
            <FaMapMarkerAlt className="mr-3 text-primary" />
            <select
              className="bg-transparent focus:outline-none w-full appearance-none cursor-pointer"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Full-time Toggle and Search Button */}
          <div className="flex flex-1 justify-between items-center px-6 py-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-3 checkbox checkbox-primary"
                checked={fullTimeOnly}
                onChange={(e) => setFullTimeOnly(e.target.checked)}
              />
              <span>Full Time Only</span>
            </label>

            <div className="flex gap-2">
              {(searchTerm || location || fullTimeOnly) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-ghost btn-sm"
                >
                  Clear
                </button>
              )}
              <button type="submit" className="px-6 btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Mobile Search Layout */}
        <div className="md:hidden">
          <form onSubmit={handleSubmit}>
            {/* Basic Search Bar */}
            <div className="flex items-center p-4">
              <FaSearch className="mr-3 text-primary" />
              <input
                type="text"
                placeholder="Search by title or company..."
                className="flex-1 bg-transparent focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Filter Toggle Button */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="mr-1 btn btn-ghost btn-sm btn-circle"
              >
                <FaFilter className={showFilters ? 'text-primary' : ''} />
              </button>

              {/* Search Button */}
              <button
                type="submit"
                className="btn btn-primary btn-sm btn-circle"
              >
                <FaSearch />
              </button>
            </div>

            {/* Expanded Filter Section */}
            {showFilters && (
              <div className="p-4 border-t border-base-200">
                {/* Location Filter */}
                <div className="mb-4">
                  <div className="flex items-center pb-2">
                    <FaMapMarkerAlt className="mr-3 text-primary" />
                    <select
                      className="bg-transparent focus:outline-none w-full appearance-none"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Full-time Toggle */}
                <div className="flex justify-between items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-3 checkbox checkbox-primary"
                      checked={fullTimeOnly}
                      onChange={(e) => setFullTimeOnly(e.target.checked)}
                    />
                    <span>Full Time Only</span>
                  </label>

                  <div className="flex gap-2">
                    {(searchTerm || location || fullTimeOnly) && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-ghost btn-sm"
                      >
                        Clear
                      </button>
                    )}
                    <button type="submit" className="btn btn-primary btn-sm">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default SearchBar
