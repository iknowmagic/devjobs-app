import React from 'react'
import { SingleJobInterface } from '../../types'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

interface JobModalProps {
  job: SingleJobInterface
  isOpen: boolean
  onClose: () => void
}

export const JobModal: React.FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className="z-10 relative bg-base-100 shadow-xl my-8 rounded-lg w-full max-w-3xl"
          >
            {/* Header section with company info */}
            <div className="relative -mt-6">
              <div
                className="top-0 left-1/2 absolute flex justify-center items-center rounded-xl w-16 h-16 -translate-x-1/2 -translate-y-1/2 transform"
                style={{ backgroundColor: job.logoBackground }}
              >
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>

            <div className="flex md:flex-row flex-col justify-between md:items-center px-8 pt-10 pb-6 border-b border-base-200">
              <div className="mb-4 md:mb-0 md:text-left text-center">
                <h2 className="font-bold text-xl">{job.company}</h2>
                <p className="mt-1 text-base-content/60">
                  {job.website.replace('https://', '')}
                </p>
              </div>

              <a
                href={job.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-outline btn btn-primary"
              >
                Company Site
                <FaExternalLinkAlt className="opacity-70 group-hover:opacity-100 ml-2" />
              </a>
            </div>

            {/* Job details */}
            <div className="p-8">
              <div className="flex md:flex-row flex-col justify-between md:items-center mb-8">
                <div>
                  <div className="flex gap-3 text-sm text-base-content/60">
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
                <ul className="space-y-3 pl-5 text-base-content/80 list-disc">
                  {job.requirements.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Role */}
              <div>
                <h3 className="mb-4 font-bold text-xl">What You Will Do</h3>
                <p className="mb-4">{job.role.content}</p>
                <ol className="space-y-3 pl-5 text-base-content/80 list-decimal">
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
                className="min-w-32 btn btn-primary"
              >
                Apply Now
              </a>
            </div>

            {/* Close button */}
            <button
              className="top-4 right-4 absolute btn btn-circle btn-ghost"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default JobModal
