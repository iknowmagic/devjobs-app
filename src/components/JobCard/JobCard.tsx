import React from 'react'
import { SingleJobInterface } from '../../types'
import { motion } from 'framer-motion'

interface JobCardProps {
  job: SingleJobInterface
  onClick?: (_job: SingleJobInterface) => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative flex flex-col bg-base-100 shadow-md rounded-lg h-full overflow-hidden cursor-pointer"
      onClick={() => onClick?.(job)}
      data-testid="job-card"
    >
      {/* Company Logo */}
      <div
        className="-top-6 left-8 absolute flex justify-center items-center rounded-xl w-12 h-12"
        style={{ backgroundColor: job.logoBackground }}
      >
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-6 h-6 object-contain"
        />
      </div>

      <div className="flex flex-col flex-grow p-8 pt-12">
        {/* Job Details */}
        <div className="flex gap-3 text-sm text-base-content/60">
          <span>{job.postedAt}</span>
          <span>•</span>
          <span>{job.contract}</span>
        </div>

        <h3 className="mt-3 font-bold hover:text-primary text-lg transition-colors">
          {job.position}
        </h3>

        <p className="mt-1 text-base-content/70">{job.company}</p>

        <div className="mt-auto pt-8">
          <p className="font-semibold text-primary text-sm">{job.location}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default JobCard
