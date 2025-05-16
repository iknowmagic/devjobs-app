import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useThemeStore } from '../store/themeStore'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toggleTheme, isDarkTheme } = useThemeStore()

  return (
    <div className="flex flex-col bg-base-200 min-h-screen">
      {/* Header */}
      <header className="relative">
        {/* Background with gradient */}
        <div
          className="absolute inset-0 rounded-bl-3xl rounded-br-3xl h-32"
          style={{
            background:
              'linear-gradient(90deg, hsl(235, 69%, 61%) 0%, hsl(235, 65%, 48%) 100%)',
          }}
        >
          {/* Decorative pattern */}
          <svg
            className="absolute inset-0 opacity-20 w-full h-full"
            viewBox="0 0 800 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="200" cy="100" r="40" fill="white" />
            <circle cx="400" cy="50" r="60" fill="white" />
            <circle cx="600" cy="120" r="30" fill="white" />
            <circle cx="750" cy="70" r="45" fill="white" />
            <circle cx="100" cy="40" r="25" fill="white" />
            <circle cx="300" cy="150" r="35" fill="white" />
            <circle cx="500" cy="90" r="20" fill="white" />
          </svg>
        </div>

        {/* Content */}
        <div className="z-10 relative mx-auto px-6 md:px-10 lg:px-40 py-8 max-w-7xl">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-white text-2xl md:text-3xl">
              <span className="tracking-wide">dev</span>
              <span className="tracking-tight">jobs</span>
            </h1>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center gap-2 bg-white/20 p-2 rounded-full text-white"
              aria-label={
                isDarkTheme() ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {isDarkTheme() ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow pb-12">{children}</main>

      {/* Footer */}
      <footer className="px-6 py-4 text-sm text-base-content/60 text-center">
        <p>
          © {new Date().getFullYear()} DevJobs • Find your next developer role
        </p>
      </footer>
    </div>
  )
}

export default Layout
