import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import VideoFeed from './components/VideoFeed'
import VideoPlayer from './components/VideoPlayer'
import MiniPlayer from './components/MiniPlayer'
import { Video } from './types'

function App() {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [isMiniPlayer, setIsMiniPlayer] = useState(false)

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video)
    setIsMiniPlayer(false)
  }

  const handleMinimize = () => {
    setIsMiniPlayer(true)
  }

  const handleExpand = () => {
    setIsMiniPlayer(false)
  }

  const handleClose = () => {
    setCurrentVideo(null)
    setIsMiniPlayer(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {currentVideo && !isMiniPlayer && (
          <VideoPlayer
            key="full-player"
            video={currentVideo}
            onMinimize={handleMinimize}
            onClose={handleClose}
            onVideoSelect={handleVideoSelect}
          />
        )}
      </AnimatePresence>

      <VideoFeed
        onVideoSelect={handleVideoSelect}
        currentVideoId={currentVideo?.id}
      />

      <AnimatePresence>
        {currentVideo && isMiniPlayer && (
          <MiniPlayer
            key="mini-player"
            video={currentVideo}
            onExpand={handleExpand}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
