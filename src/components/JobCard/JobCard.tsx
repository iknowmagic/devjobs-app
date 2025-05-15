import React from 'react'
import { SingleJobInterface } from '../../types'

interface JobCardProps {
  job: SingleJobInterface
  onClick?: (_job: SingleJobInterface) => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div
      className="relative bg-base-100 shadow-md hover:shadow-lg rounded-lg transition-all cursor-pointer"
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

      <div className="px-8 pt-8 pb-6">
        {/* Job Details */}
        <div className="flex gap-3 text-sm text-base-content/70">
          <span>{job.postedAt}</span>
          <span>•</span>
          <span>{job.contract}</span>
        </div>

        <h3 className="mt-2 font-bold hover:text-primary text-lg transition-colors">
          {job.position}
        </h3>

        <p className="mt-1 text-base-content/70">{job.company}</p>

        <p className="mt-8 font-semibold text-primary text-sm">
          {job.location}
        </p>
      </div>
    </div>
  )
}

export default JobCard
