import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { Outlet } from 'react-router-dom'

function App() {
  const [windowCount, setWindowCount] = useState(0)

  const createNewWindow = async () => {
    const options = {
      title: `overlay-${windowCount + 1}`,
      width: 300,
      height: 200,
      x: 100 + (windowCount * 20),
      y: 100 + (windowCount * 20)
    }

    try {
      await invoke('create_overlay_window', { options })
      setWindowCount(prev => prev + 1)
    } catch (e) {
      console.error('Failed to create window:', e)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-blue-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Window Controls</h1>
          <div className="text-sm text-gray-600 mb-4">
            Window Count: {windowCount}
          </div>
          <button
            onClick={createNewWindow}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Create New Window
          </button>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default App