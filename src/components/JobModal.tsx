import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useJobStore } from '../store/jobStore'
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

interface JobModalProps {
  isOpen: boolean
}

const JobModal: React.FC<JobModalProps> = ({ isOpen }) => {
  const { selectedJob, setShowJobModal } = useJobStore()

  if (!selectedJob) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center p-4 overflow-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowJobModal(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="relative bg-base-100 shadow-xl mx-auto rounded-lg w-full max-w-3xl overflow-hidden"
          >
            {/* Company Header */}
            <div className="relative border-b border-base-200">
              {/* Company Logo */}
              <div
                className="left-1/2 absolute flex justify-center items-center rounded-xl w-16 h-16 -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: selectedJob.logoBackground }}
              >
                <img
                  src={selectedJob.logo}
                  alt={`${selectedJob.company} logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Company Details */}
              <div className="flex md:flex-row flex-col justify-between items-center px-8 pt-10 pb-6">
                <div className="mb-4 md:mb-0 md:text-left text-center">
                  <h2 className="font-bold text-xl">{selectedJob.company}</h2>
                  <p className="mt-1 text-base-content/60">
                    {selectedJob.website.replace(/^https?:\/\//, '')}
                  </p>
                </div>

                <a
                  href={selectedJob.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn btn-primary"
                >
                  Company Site
                  <FaExternalLinkAlt className="ml-2" />
                </a>
              </div>
            </div>

            {/* Job Details */}
            <div className="p-8">
              {/* Job Header */}
              <div className="flex md:flex-row flex-col md:justify-between md:items-center mb-8">
                <div>
                  <div className="flex items-center text-sm text-base-content/60">
                    <span>{selectedJob.postedAt}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedJob.contract}</span>
                  </div>

                  <h1 className="mt-2 font-bold text-2xl">
                    {selectedJob.position}
                  </h1>
                  <p className="mt-1 font-semibold text-primary text-sm">
                    {selectedJob.location}
                  </p>
                </div>

                <a
                  href={selectedJob.apply}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 md:mt-0 btn btn-primary"
                >
                  Apply Now
                </a>
              </div>

              {/* Job Description */}
              <div className="mb-8 max-w-none prose">
                <p>{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="mb-4 font-bold text-xl">Requirements</h2>
                <p className="mb-6">{selectedJob.requirements.content}</p>

                <ul className="space-y-2 pl-6 list-disc list-outside">
                  {selectedJob.requirements.items.map((item, index) => (
                    <li key={index} className="pl-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Role */}
              <div>
                <h2 className="mb-4 font-bold text-xl">What You Will Do</h2>
                <p className="mb-6">{selectedJob.role.content}</p>

                <ol className="space-y-2 pl-6 list-decimal list-outside">
                  {selectedJob.role.items.map((item, index) => (
                    <li key={index} className="pl-2">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center bg-base-200 p-6">
              <div className="hidden md:block">
                <h3 className="font-bold">{selectedJob.position}</h3>
                <p className="mt-1 text-sm text-base-content/60">
                  {selectedJob.company}
                </p>
              </div>

              <a
                href={selectedJob.apply}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto btn btn-primary"
              >
                Apply Now
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowJobModal(false)}
              className="top-4 right-4 absolute btn btn-sm btn-circle btn-ghost"
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
