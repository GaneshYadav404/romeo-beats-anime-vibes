import { useState } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { HomeScreen } from './HomeScreen';
import { SearchScreen } from './SearchScreen';
import { LibraryScreen } from './LibraryScreen';
import { NowPlayingScreen } from './NowPlayingScreen';
import { MiniPlayer } from './MiniPlayer';
import { cn } from '@/lib/utils';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  mood: 'love' | 'chill' | 'energy' | 'default';
  cover: string;
}

const DEMO_SONGS: Song[] = [
  {
    id: 1,
    title: "Heartbeat Symphony",
    artist: "Anime Dreams",
    duration: "3:45",
    mood: "love",
    cover: "/api/placeholder/300/300"
  },
  {
    id: 2,
    title: "Neon Nights",
    artist: "Cyber Romance",
    duration: "4:12",
    mood: "energy",
    cover: "/api/placeholder/300/300"
  },
  {
    id: 3,
    title: "Sakura Falling",
    artist: "Peaceful Vibes",
    duration: "5:20",
    mood: "chill",
    cover: "/api/placeholder/300/300"
  },
  {
    id: 4,
    title: "Digital Love",
    artist: "Future Hearts",
    duration: "3:58",
    mood: "love",
    cover: "/api/placeholder/300/300"
  },
  {
    id: 5,
    title: "Smile Like You Mean It",
    artist: "The Killers",
    duration: "3:54",
    mood: "energy",
    cover: "/api/placeholder/300/300"
  }
];

export const MusicPlayer = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  const handleSongPlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipNext = () => {
    if (!currentSong) return;
    const currentIndex = DEMO_SONGS.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % DEMO_SONGS.length;
    setCurrentSong(DEMO_SONGS[nextIndex]);
  };

  const skipPrevious = () => {
    if (!currentSong) return;
    const currentIndex = DEMO_SONGS.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? DEMO_SONGS.length - 1 : currentIndex - 1;
    setCurrentSong(DEMO_SONGS[prevIndex]);
  };

  const getBackgroundClass = () => {
    if (!currentSong) return 'bg-gradient-to-br from-background via-background to-muted/20';
    
    switch (currentSong.mood) {
      case 'love':
        return 'bg-gradient-to-br from-love/5 via-background to-primary/5';
      case 'chill':
        return 'bg-gradient-to-br from-blue-500/5 via-background to-cyan-400/5';
      case 'energy':
        return 'bg-gradient-to-br from-yellow-500/5 via-background to-orange-400/5';
      default:
        return 'bg-gradient-to-br from-primary/5 via-background to-secondary/5';
    }
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onSongPlay={handleSongPlay} currentSong={currentSong} />;
      case 'search':
        return <SearchScreen onSongPlay={handleSongPlay} />;
      case 'library':
        return <LibraryScreen />;
      case 'liked':
        return <LibraryScreen />;
      default:
        return <HomeScreen onSongPlay={handleSongPlay} currentSong={currentSong} />;
    }
  };

  return (
    <div className={cn("min-h-screen transition-all duration-1000", getBackgroundClass())}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/30 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-love/40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-secondary/30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* App Header */}
      <div className="relative z-10 text-center pt-8 pb-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-love bg-clip-text text-transparent animate-gradient">
          Romeo
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {renderActiveScreen()}
      </div>

      {/* Mini Player */}
      {currentSong && !showFullPlayer && (
        <MiniPlayer
          song={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onOpenFullPlayer={() => setShowFullPlayer(true)}
          onSkipNext={skipNext}
        />
      )}

      {/* Full Screen Player */}
      {currentSong && showFullPlayer && (
        <NowPlayingScreen
          song={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onClose={() => setShowFullPlayer(false)}
          onSkipNext={skipNext}
          onSkipPrevious={skipPrevious}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};