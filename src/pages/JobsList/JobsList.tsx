import React, { useEffect, useState } from 'react'
import { useJobsStore } from '../../store/jobsStore'
import SearchBar from '../../components/SearchBar'
import JobCard from '../../components/JobCard'
import JobModal from '../../components/JobModal'
import { SingleJobInterface } from '../../types'
import Navbar from '../../components/Navbar'

const JobsList: React.FC = () => {
  const { jobs, isLoading, error, fetchJobs, loadMore } = useJobsStore()
  const [selectedJob, setSelectedJob] = useState<SingleJobInterface | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleJobClick = (job: SingleJobInterface) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Header with background */}
      <div className="flex justify-between items-start bg-primary px-6 py-8 h-40">
        <div className="text-primary-content">
          <h1 className="font-bold text-2xl">DevJobs</h1>
        </div>

        {/* Theme toggle from your existing components */}
        <div className="flex items-center">
          <Navbar />
        </div>
      </div>

      {/* Search bar */}
      <SearchBar />

      <div className="mx-auto px-4 py-12 container">
        {isLoading && !jobs && (
          <div className="flex justify-center">
            <span className="text-primary loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-md alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current w-6 h-6 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {jobs && jobs.data.length === 0 && (
          <div className="py-12 text-center">
            <h2 className="font-semibold text-xl">No jobs found</h2>
            <p className="mt-2 text-base-content/70">
              Try adjusting your search filters
            </p>
          </div>
        )}

        {jobs && jobs.data.length > 0 && (
          <>
            <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {jobs.data.map((job) => (
                <JobCard key={job.id} job={job} onClick={handleJobClick} />
              ))}
            </div>

            {jobs.nextPage && (
              <div className="flex justify-center mt-8">
                <button
                  className="btn btn-primary"
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Job details modal */}
      {selectedJob && (
        <JobModal job={selectedJob} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  )
}

export default JobsList
