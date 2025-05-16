import React from 'react'
import { motion } from 'framer-motion'
import { Job } from '../store/jobStore'
import JobCard from './JobCard'

interface JobListProps {
  jobs: Job[]
  hasMore: boolean
  isLoadingMore: boolean
  onLoadMore: () => void
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  hasMore,
  isLoadingMore,
  onLoadMore,
}) => {
  // Animation variants for staggered list
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </motion.div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-10 btn btn-primary"
          >
            {isLoadingMore ? (
              <>
                <span className="loading loading-spinner"></span>
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </motion.button>
        </div>
      )}
    </div>
  )
}

export default JobList
