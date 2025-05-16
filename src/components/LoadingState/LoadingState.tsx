import React from 'react'
import { motion } from 'framer-motion'

interface LoadingStateProps {
  message?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading jobs...',
}) => {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="mb-4 border-4 border-primary border-t-transparent rounded-full w-16 h-16"
      />
      <p className="font-medium text-base-content/70">{message}</p>
    </div>
  )
}

export default LoadingState
