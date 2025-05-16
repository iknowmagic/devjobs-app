import React, { useEffect, useState } from 'react'
import { useJobsStore } from '../../store/jobsStore'
import { SingleJobInterface } from '../../types'
import { motion } from 'framer-motion'

// Components
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import JobCard from '../../components/JobCard'
import JobModal from '../../components/JobModal'
import LoadingState from '../../components/LoadingState'
import EmptyState from '../../components/EmptyState'

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

  // Calculate container animations for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="flex flex-col bg-base-200 min-h-screen">
      {/* Header */}
      <Header />

      {/* Search bar */}
      <SearchBar />

      {/* Main content */}
      <main className="flex-grow px-4 md:px-10 lg:px-40 py-8 md:py-16">
        {/* Error state */}
        {error && (
          <div className="shadow-md mx-auto mt-8 max-w-md text-error-content alert alert-error">
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

        {/* Loading state */}
        {isLoading && !jobs && <LoadingState />}

        {/* Empty state */}
        {jobs && jobs.data.length === 0 && <EmptyState />}

        {/* Jobs grid */}
        {jobs && jobs.data.length > 0 && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="gap-x-6 gap-y-16 md:gap-y-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {jobs.data.map((job) => (
                <JobCard key={job.id} job={job} onClick={handleJobClick} />
              ))}
            </motion.div>

            {/* Load more */}
            {jobs.nextPage && (
              <div className="flex justify-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 btn btn-primary"
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Loading...
                    </>
                  ) : (
                    'Load More Jobs'
                  )}
                </motion.button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-sm text-base-content/60 text-center">
        <p>
          © {new Date().getFullYear()} DevJobs App • Find your next developer
          job
        </p>
      </footer>

      {/* Job details modal */}
      {selectedJob && (
        <JobModal job={selectedJob} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  )
}

export default JobsList
