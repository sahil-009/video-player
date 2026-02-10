# Video Player App

A mobile-first video player application built with React, TypeScript, and Tailwind CSS, inspired by the YouTube mobile app experience.

## Features

### Core Features
- **Video Feed**: Scrollable list of videos grouped by category
- **Video Cards**: Each card displays thumbnail, title, duration, and category badge
- **Full-Page Video Player**: Custom controls with smooth playback
- **In-Player Video List**: Swipe up to reveal related videos from the same category
- **Drag-to-Minimize**: Drag video down to minimize to a mini-player
- **Responsive Design**: Optimized for both mobile and desktop

### Video Player Controls
- Play/Pause toggle
- Skip forward (+10 seconds) and backward (-10 seconds)
- Seekable progress bar
- Current time / total duration display
- Auto-play on video open

### Mini-Player Features
- Small video preview (continues playing)
- Video title and category display
- Play/Pause control
- Expand to full-screen
- Close button

### User Experience
- Smooth animations and transitions
- Touch and gesture support
- Mobile-first responsive design
- 60fps performance target

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Video**: HTML5 Video API

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd video-player
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── VideoCard.tsx      # Video thumbnail card component
│   ├── VideoFeed.tsx      # Main video feed with categories
│   ├── VideoPlayer.tsx    # Full-screen video player
│   ├── VideoList.tsx      # Related videos list
│   └── MiniPlayer.tsx     # Mini-player component
├── data/
│   └── mockVideos.ts      # Mock video data and categories
├── types.ts               # TypeScript type definitions
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## Video Data

The application uses mock video data with the following structure:
- **Categories**: Trending, Music, Sports, Education
- **Video Properties**: ID, title, duration, thumbnail URL, video URL, category
- **Sample Videos**: Uses free sample videos from Google's repository

## Features Implementation

### Mobile-First Design
- Responsive grid layout that adapts to screen size
- Touch-friendly controls and gestures
- Optimized for mobile viewing experience

### Gesture Support
- **Tap to Play/Pause**: Click anywhere on the video
- **Swipe Up**: Show related videos list
- **Drag Down**: Minimize to mini-player (drag threshold: 100px)

### Performance Optimizations
- Efficient React component structure
- Optimized re-renders with proper state management
- Smooth CSS transitions and animations
- Lazy loading ready architecture

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Proper ARIA labels
- High contrast UI elements

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Note: Video playback requires browser support for HTML5 video and MP4 format.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Future Enhancements

### Bonus Features (Not Implemented)
- [ ] Auto-play Next with countdown
- [ ] Virtual scrolling for large datasets
- [ ] Picture-in-Picture API support
- [ ] Enhanced skip button animations
- [ ] HLS video format support
- [ ] Video quality selection
- [ ] Fullscreen mode
- [ ] Volume controls
- [ ] Playback speed controls
- [ ] Video search functionality
- [ ] User preferences
- [ ] Watch history
- [ ] Favorites/bookmarks

## License

This project is open source and available under the [MIT License](LICENSE).

## Demo

Check out the live demo: [Deployment URL]

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
