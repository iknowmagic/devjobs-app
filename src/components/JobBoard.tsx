import React, { useEffect } from 'react'
import { useJobStore } from '../store/jobStore'
import SearchBar from './SearchBar'
import JobList from './JobList'
import JobModal from './JobModal'
import EmptyState from './EmptyState'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'

const JobBoard: React.FC = () => {
  const {
    jobs,
    isLoading,
    error,
    fetchJobs,
    fetchLocations,
    loadMore,
    showJobModal,
  } = useJobStore()

  // Fetch jobs and locations on component mount
  useEffect(() => {
    fetchJobs()
    fetchLocations()
  }, [fetchJobs, fetchLocations])

  // Handle search submission
  const handleSearch = () => {
    fetchJobs()
  }

  return (
    <div className="relative mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
      {/* Search Section */}
      <SearchBar onSearch={handleSearch} />

      {/* Content Section */}
      <div className="mt-8 md:mt-12">
        {/* Error State */}
        {error && <ErrorState message={error} />}

        {/* Loading State - First load */}
        {isLoading && !jobs && <LoadingState />}

        {/* Empty State */}
        {jobs && jobs.data.length === 0 && (
          <EmptyState
            title="No jobs found"
            message="Try adjusting your search filters or check back later for new opportunities."
          />
        )}

        {/* Job List */}
        {jobs && jobs.data.length > 0 && (
          <JobList
            jobs={jobs.data}
            hasMore={!!jobs.nextPage}
            isLoadingMore={isLoading && !!jobs.data.length}
            onLoadMore={loadMore}
          />
        )}
      </div>

      {/* Job Modal */}
      <JobModal isOpen={showJobModal} />
    </div>
  )
}

export default JobBoard
