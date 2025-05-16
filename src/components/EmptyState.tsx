import React from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'

interface EmptyStateProps {
  title: string
  message: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-center items-center py-16 text-center"
    >
      <div className="flex justify-center items-center bg-base-200 mb-4 rounded-full w-16 h-16">
        <FaSearch className="opacity-60 w-6 h-6 text-primary" />
      </div>

      <h2 className="mb-2 font-bold text-xl">{title}</h2>
      <p className="max-w-md text-base-content/60">{message}</p>
    </motion.div>
  )
}

export default EmptyState
