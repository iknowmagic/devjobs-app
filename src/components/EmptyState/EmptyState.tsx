import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  title?: string
  message?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No jobs found',
  message = 'Try adjusting your search filters',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-center items-center px-4 py-16 text-center"
    >
      <div className="flex justify-center items-center bg-base-200 mb-4 rounded-full w-16 h-16">
        <FaSearch className="opacity-50 w-8 h-8 text-primary" />
      </div>
      <h2 className="mb-2 font-bold text-xl">{title}</h2>
      <p className="max-w-md text-base-content/60">{message}</p>
    </motion.div>
  )
}

export default EmptyState
