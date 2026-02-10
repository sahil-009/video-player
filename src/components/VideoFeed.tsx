import { Video } from '../types'
import { mockVideos } from '../data/mockVideos'
import VideoCard from './VideoCard'

interface VideoFeedProps {
  onVideoSelect: (video: Video) => void
  currentVideoId?: string
}

export default function VideoFeed({ onVideoSelect, currentVideoId }: VideoFeedProps) {
  return (
    <div className="pb-24">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-black via-black/90 to-transparent">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div className="text-red-600 font-extrabold tracking-tight text-xl">NETFLIX</div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Search">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded bg-white/10" />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {mockVideos.map((category) => (
          <div key={category.name}>
            <div className="px-4 mb-3 flex items-baseline justify-between">
              <h2 className="text-lg font-semibold tracking-tight">{category.name}</h2>
            </div>

            <div className="px-4">
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {category.videos.map((video) => (
                  <div key={video.id} className="snap-start flex-shrink-0">
                    <VideoCard
                      video={video}
                      onSelect={onVideoSelect}
                      isPlaying={currentVideoId === video.id}
                      variant="row"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
