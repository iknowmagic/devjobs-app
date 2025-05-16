import React from 'react'
import { motion } from 'framer-motion'
import { Job, useJobStore } from '../store/jobStore'

interface JobCardProps {
  job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { selectJob } = useJobStore()

  // Animation for card
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
      onClick={() => selectJob(job)}
      className="relative bg-base-100 shadow-md rounded-lg h-full overflow-hidden cursor-pointer"
    >
      {/* Company Logo */}
      <div
        className="left-8 absolute flex justify-center items-center rounded-xl w-12 h-12 -translate-y-1/2"
        style={{ backgroundColor: job.logoBackground }}
      >
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-6 h-6 object-contain"
        />
      </div>

      {/* Card Content */}
      <div className="p-8 pt-8">
        {/* Job Meta */}
        <div className="flex items-center text-sm text-base-content/60">
          <span>{job.postedAt}</span>
          <span className="mx-2">•</span>
          <span>{job.contract}</span>
        </div>

        {/* Job Title */}
        <h2 className="mt-2 font-bold hover:text-primary text-lg transition-colors">
          {job.position}
        </h2>

        {/* Company Name */}
        <p className="mt-1 text-base-content/70">{job.company}</p>

        {/* Location */}
        <p className="mt-6 font-semibold text-primary text-sm">
          {job.location}
        </p>
      </div>
    </motion.div>
  )
}

export default JobCard
