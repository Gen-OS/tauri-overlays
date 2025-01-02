import { useState } from 'react'

interface Props {
  onWindowCreate: () => void
}

export const FloatingIcon = ({ onWindowCreate }: Props) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false)
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (Math.abs(e.clientX - startPos.x) > 5 || Math.abs(e.clientY - startPos.y) > 5) {
      setIsDragging(true)
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) {
      onWindowCreate()
    }
  }

  return (
    <div 
      className="w-32 h-32 cursor-pointer flex items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ 
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <img data-tauri-drag-region
        src="/logo.svg" 
        alt="Logo"
        width="128"
        height="128"
        className="select-none pointer-events-none"
        draggable="false"
      />
    </div>
  )
}

export default FloatingIcon