import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import {
  Play, Pause, SkipBack, SkipForward, Minimize2,
  ChevronUp, ChevronDown
} from 'lucide-react'
import { Video } from '../types'
import { getVideosByCategory } from '../data/mockVideos'
import VideoList from './VideoList'

interface VideoPlayerProps {
  video: Video
  onMinimize: () => void
  onClose: () => void
  onVideoSelect: (video: Video) => void
}

export default function VideoPlayer({ video, onMinimize, onClose, onVideoSelect }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showVideoList, setShowVideoList] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [showSkipIndicator, setShowSkipIndicator] = useState<'forward' | 'backward' | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerControls = useAnimation()
  const playlistControls = useAnimation()
  const hideControlsTimerRef = useRef<number | null>(null)
  const lastTapRef = useRef<{ at: number; x: number } | null>(null)

  // Auto-play next logic
  useEffect(() => {
    if (currentTime > 0 && currentTime >= duration - 0.5) {
      const relatedVideos = getVideosByCategory(video.category)
      const currentIndex = relatedVideos.findIndex(v => v.id === video.id)
      if (currentIndex !== -1 && currentIndex < relatedVideos.length - 1) {
        onVideoSelect(relatedVideos[currentIndex + 1])
      }
    }
  }, [currentTime, duration, video, onVideoSelect]) // Added dependencies

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const updateTime = () => setCurrentTime(videoElement.currentTime)
    const updateDuration = () => setDuration(videoElement.duration)

    videoElement.addEventListener('timeupdate', updateTime)
    videoElement.addEventListener('loadedmetadata', updateDuration)

    if (isPlaying) {
      videoElement.play().catch(() => setIsPlaying(false))
    } else {
      videoElement.pause()
    }

    return () => {
      videoElement.removeEventListener('timeupdate', updateTime)
      videoElement.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [isPlaying, video])

  useEffect(() => {
    return () => {
      if (hideControlsTimerRef.current) {
        window.clearTimeout(hideControlsTimerRef.current)
      }
    }
  }, [])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
    }
  }

  const showControlsTemporarily = () => {
    setControlsVisible(true)
    if (hideControlsTimerRef.current) {
      window.clearTimeout(hideControlsTimerRef.current)
    }
    if (isPlaying) {
      hideControlsTimerRef.current = window.setTimeout(() => {
        setControlsVisible(false)
      }, 2500)
    }
  }

  const skipWithIndicator = (dir: 'forward' | 'backward') => {
    if (dir === 'forward') skipForward()
    else skipBackward()
    setShowSkipIndicator(dir)
    window.setTimeout(() => setShowSkipIndicator(null), 700)
    showControlsTemporarily()
  }

  // Handle Drag to Minimize
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 100) {
      onMinimize()
    } else {
      playerControls.start({ y: 0 })
    }
  }

  // Handle Playlist Swipe
  const handlePlaylistDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -50) {
      setShowVideoList(true)
      playlistControls.start({ y: 0 }) // Animate to open position
    } else if (info.offset.y > 50) {
      setShowVideoList(false)
      playlistControls.start({ y: '100%' }) // Animate to closed position
    }
  }

  const handleOverlayTap = (xRatio: number) => {
    const now = Date.now()
    const last = lastTapRef.current
    if (last && now - last.at < 300 && Math.abs(last.x - xRatio) < 0.08) {
      if (xRatio < 0.33) skipWithIndicator('backward')
      else if (xRatio > 0.67) skipWithIndicator('forward')
      lastTapRef.current = null
      return
    }
    lastTapRef.current = { at: now, x: xRatio }
    setControlsVisible((v) => {
      const next = !v
      if (next) showControlsTemporarily()
      return next
    })
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xRatio = (e.clientX - rect.left) / rect.width
    handleOverlayTap(xRatio)
  }

  const handleOverlayTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0]
    if (!touch) return
    const rect = e.currentTarget.getBoundingClientRect()
    const xRatio = (touch.clientX - rect.left) / rect.width
    handleOverlayTap(xRatio)
  }

  useEffect(() => {
    showControlsTemporarily()
  }, [isPlaying])

  // Reset playlist visibility on video change
  useEffect(() => {
    setShowVideoList(false);
  }, [video.id]);

  const relatedVideos = getVideosByCategory(video.category)

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ touchAction: 'none' }} // Crucial for preventing browser scroll interference
    >
      <div className="flex-1 relative min-h-0 bg-black">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="absolute inset-0 w-full h-full object-contain"
          playsInline
        />

        {/* Interaction Overlay */}
        <div
          className="absolute inset-0"
          onClick={handleOverlayClick}
          onTouchEnd={handleOverlayTouchEnd}
          onMouseMove={showControlsTemporarily}
        >

          {/* Skip Indicators */}
          {showSkipIndicator && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="flex items-center space-x-2 bg-black/60 px-6 py-3 rounded-full backdrop-blur-sm animate-pulse">
                {showSkipIndicator === 'backward' ? (
                  <>
                    <SkipBack className="w-8 h-8 text-white" fill="currentColor" />
                    <span className="text-white text-lg font-bold">-10s</span>
                  </>
                ) : (
                  <>
                    <span className="text-white text-lg font-bold">+10s</span>
                    <SkipForward className="w-8 h-8 text-white" fill="currentColor" />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Controls Container */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-between ${controlsVisible ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ pointerEvents: controlsVisible ? 'auto' : 'none' }}
          >
            {/* Top Bar */}
            <div className="bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between">
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
              >
                <ChevronDown className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={onMinimize}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
              >
                <Minimize2 className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Center Play/Pause */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-8 pointer-events-auto">
                <button
                  onClick={(ev) => {
                    ev.stopPropagation()
                    skipWithIndicator('backward')
                  }}
                  className="p-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  <SkipBack className="w-8 h-8 text-white" fill="currentColor" />
                </button>

                <button
                  onClick={(ev) => {
                    ev.stopPropagation()
                    setIsPlaying((p) => !p)
                  }}
                  className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" fill="currentColor" />
                  ) : (
                    <Play className="w-10 h-10 text-white" fill="currentColor" />
                  )}
                </button>

                <button
                  onClick={(ev) => {
                    ev.stopPropagation()
                    skipWithIndicator('forward')
                  }}
                  className="p-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  <SkipForward className="w-8 h-8 text-white" fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-8 pt-12">
              <div className="mb-4">
                <h1 className="text-white text-lg font-bold line-clamp-1">{video.title}</h1>
                <p className="text-gray-300 text-sm">{video.category}</p>
              </div>

              {/* Progress Bar */}
              <div className="group relative h-10 flex items-center">
                {/* Seek Bar Background */}
                <div className="relative w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-red-600 rounded-full"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>

                {/* Range Input (Invisible HIT area) */}
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(ev) => {
                    ev.stopPropagation()
                    handleSeek(ev)
                    showControlsTemporarily()
                  }}
                  onMouseDown={(ev) => ev.stopPropagation()}
                  onTouchStart={(ev) => ev.stopPropagation()}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {/* Scrubber Knob */}
                <div
                  className="absolute w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg pointer-events-none transition-transform group-hover:scale-125"
                  style={{ left: `calc(${duration ? (currentTime / duration) * 100 : 0}% - 8px)` }}
                />
              </div>

              <div className="flex justify-between text-xs font-medium text-gray-300 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className='flex justify-center mt-4'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVideoList(!showVideoList);
                  }}
                  className="text-white/80 text-sm flex flex-col items-center gap-1 animate-bounce"
                >
                  <ChevronUp className="w-5 h-5" />
                  <span className="text-xs font-medium">More Videos</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Video List Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: showVideoList ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handlePlaylistDragEnd}
        className="absolute inset-x-0 bottom-0 top-[30vh] bg-[#1a1a1a] rounded-t-3xl z-50 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/10"
      >
        {/* Drag Handle */}
        <div
          className="w-full h-8 flex items-center justify-center cursor-grab active:cursor-grabbing flex-shrink-0"
          onClick={() => setShowVideoList(false)}
        >
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Up Next</h3>
          </div>
          <VideoList
            videos={relatedVideos}
            currentVideoId={video.id}
            onVideoSelect={(v) => {
              onVideoSelect(v);
              // Don't close the list immediately for better UX
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
