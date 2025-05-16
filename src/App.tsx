import { useEffect } from 'react'
import { useThemeStore } from './store/themeStore'
import Layout from './components/Layout'
import JobBoard from './components/JobBoard'

function App() {
  const { theme } = useThemeStore()

  // Apply theme when component mounts or theme changes
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  return (
    <Layout>
      <JobBoard />
    </Layout>
  )
}

export default App
