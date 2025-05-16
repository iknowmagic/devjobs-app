import React from 'react'
import { ThemeToggle } from '../ThemeToggle'

export const Header: React.FC = () => {
  return (
    <header className="relative">
      {/* Curved Header Background */}
      <div
        className="absolute inset-0 bg-primary rounded-bl-[20px] rounded-br-[20px] h-28 md:h-32 lg:h-36"
        style={{
          background: 'linear-gradient(90deg, #5964E0 0%, #7C5DFA 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="top-1/2 left-1/4 absolute bg-white rounded-full w-12 h-12"></div>
          <div className="top-1/3 right-1/3 absolute bg-white rounded-full w-20 h-20"></div>
          <div className="bottom-1/4 left-1/2 absolute bg-white rounded-full w-16 h-16"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative flex justify-between items-center px-6 md:px-10 lg:px-40 py-8">
        <h1 className="font-bold text-white text-2xl md:text-3xl">
          <span className="tracking-tight">dev</span>
          <span className="tracking-tighter">jobs</span>
        </h1>

        <ThemeToggle size="md" className="bg-white/10 p-2 rounded-lg" />
      </div>
    </header>
  )
}

export default Header
