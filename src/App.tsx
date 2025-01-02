import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api'

function App() {
  const [overlayCount, setOverlayCount] = useState(0)
  
  useEffect(() => {
    console.log('App mounted')
  }, [])

  const createNewOverlay = async () => {
    const options = {
      title: `overlay-${overlayCount + 1}`,
      width: 300,
      height: 200,
      x: 100,
      y: 100
    }

    try {
      console.log('Creating overlay with options:', options)
      await invoke('create_overlay_window', { options })
      setOverlayCount(prev => prev + 1)
      console.log('Successfully created overlay')
    } catch (e) {
      console.error('Failed to create overlay:', e)
    }
  }

  return (
    <div className="fixed inset-0 bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Overlay Controls</h1>
        <button
          onClick={createNewOverlay}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Create New Overlay ({overlayCount})
        </button>
      </div>
    </div>
  )
}

export default App