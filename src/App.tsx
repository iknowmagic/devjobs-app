import { useEffect } from 'react'
import JobsList from './pages/JobsList'
import { useThemeStore } from './components/ThemeToggle/themeStore'

function App() {
  const { theme } = useThemeStore()

  // Set initial theme
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  return (
    <div className="app">
      <JobsList />
    </div>
  )
}

export default App
