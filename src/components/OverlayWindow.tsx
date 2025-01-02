import { FC } from 'react'

const OverlayWindow: FC = () => {
  return (
    <div className="h-screen w-screen bg-white rounded-lg overflow-hidden select-none"
    
    style={{ 
      backgroundColor: '#555555',
      borderRadius: 25,
      padding: 10,   
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'}}
    >
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h2 className="text-sm font-medium">Overlay Window</h2>
      </div>
      <div className="p-4">
        <p className="text-gray-600">Window Content</p>
      </div>
    </div>
  )
}

export default OverlayWindow