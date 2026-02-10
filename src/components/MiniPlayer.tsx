import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, X } from 'lucide-react'
import { Video } from '../types'

interface MiniPlayerProps {
  video: Video
  onExpand: () => void
  onClose: () => void
}

export default function MiniPlayer({ video, onExpand, onClose }: MiniPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.play().catch(() => {
        setIsPlaying(false)
      })
    } else {
      videoElement.pause()
    }
  }, [isPlaying])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="fixed bottom-4 right-4 w-[90vw] max-w-sm bg-[#1a1a1a] rounded-xl shadow-2xl z-40 overflow-hidden border border-white/10"
    >
      <div className="flex items-center p-2 gap-3">
        {/* Video Preview */}
        <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-contain"
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Info & Controls */}
        <div className="flex-1 min-w-0 flex items-center justify-between">
          <div className='flex-1 min-w-0 mr-2 cursor-pointer' onClick={onExpand}>
            <h4 className="text-white text-sm font-semibold truncate">{video.title}</h4>
            <p className="text-gray-400 text-xs truncate">{video.category}</p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 text-white" fill="currentColor" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      {/* Progress Bar (Optional decoration) */}
      <div className="h-0.5 bg-white/20 w-full">
        <motion.div
          className="h-full bg-red-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: video.duration, ease: "linear", repeat: Infinity }}
        />
      </div>
    </motion.div>
  )
}
