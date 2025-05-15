import React from 'react'
import { SingleJobInterface } from '../../types'

interface JobModalProps {
  job: SingleJobInterface
  isOpen: boolean
  onClose: () => void
}

export const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative flex justify-center items-center p-4 min-h-screen">
        <div className="relative bg-base-100 shadow-xl rounded-lg w-full max-w-3xl">
          {/* Header section with company info */}
          <div className="flex md:flex-row flex-col justify-between items-center p-8 border-b border-base-300">
            <div className="flex items-center mb-4 md:mb-0">
              <div
                className="flex justify-center items-center mr-6 rounded-xl w-16 h-16"
                style={{ backgroundColor: job.logoBackground }}
              >
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div>
                <h2 className="font-bold text-xl">{job.company}</h2>
                <p className="text-base-content/70">{job.website}</p>
              </div>
            </div>

            <a
              href={job.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline btn btn-primary"
            >
              Company Site
            </a>
          </div>

          {/* Job details */}
          <div className="p-8">
            <div className="flex md:flex-row flex-col justify-between md:items-center mb-8">
              <div>
                <div className="flex gap-3 text-sm text-base-content/70">
                  <span>{job.postedAt}</span>
                  <span>•</span>
                  <span>{job.contract}</span>
                </div>

                <h1 className="mt-2 font-bold text-2xl">{job.position}</h1>
                <p className="mt-1 font-semibold text-primary">
                  {job.location}
                </p>
              </div>

              <a
                href={job.apply}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 btn btn-primary"
              >
                Apply Now
              </a>
            </div>

            {/* Job description */}
            <div className="mb-8 max-w-none prose">
              <p>{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="mb-4 font-bold text-xl">Requirements</h3>
              <p className="mb-4">{job.requirements.content}</p>
              <ul className="space-y-2 pl-5 list-disc">
                {job.requirements.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Role */}
            <div>
              <h3 className="mb-4 font-bold text-xl">What You Will Do</h3>
              <p className="mb-4">{job.role.content}</p>
              <ol className="space-y-2 pl-5 list-decimal">
                {job.role.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Footer with apply button */}
          <div className="flex justify-center md:justify-end bg-base-200 p-6 rounded-b-lg">
            <a
              href={job.apply}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto btn btn-primary"
            >
              Apply Now
            </a>
          </div>

          {/* Close button */}
          <button
            className="top-4 right-4 absolute text-base-content/70 hover:text-base-content"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobModal
