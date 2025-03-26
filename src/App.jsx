import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex space-x-8">
            <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
              <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
              <img src={reactLogo} className="h-24 w-24" alt="React logo" />
            </a>
          </div>
          
          <h1 className="text-4xl font-bold text-white text-center">
            Welcome to Vite + React
          </h1>
          
          <div className="card max-w-md w-full">
            <div className="flex flex-col items-center space-y-4">
              <button 
                onClick={() => setCount((count) => count + 1)}
                className="btn-primary"
              >
                Count is {count}
              </button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Edit <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">src/App.jsx</code> and save to test HMR
              </p>
            </div>
          </div>
          
          <p className="text-white/80 text-center">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
