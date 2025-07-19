import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  mood: 'love' | 'chill' | 'energy' | 'default';
  cover: string;
  audioUrl?: string;
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
  }
];

export const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState<Song>(DEMO_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4:00 in seconds
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipNext = () => {
    const currentIndex = DEMO_SONGS.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % DEMO_SONGS.length;
    setCurrentSong(DEMO_SONGS[nextIndex]);
    setCurrentTime(0);
  };

  const skipPrevious = () => {
    const currentIndex = DEMO_SONGS.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? DEMO_SONGS.length - 1 : currentIndex - 1;
    setCurrentSong(DEMO_SONGS[prevIndex]);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getBackgroundClass = () => {
    switch (currentSong.mood) {
      case 'love':
        return 'bg-gradient-to-br from-love/20 via-primary/10 to-background';
      case 'chill':
        return 'bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-background';
      case 'energy':
        return 'bg-gradient-to-br from-yellow-500/20 via-orange-400/10 to-background';
      default:
        return 'bg-gradient-to-br from-primary/20 via-secondary/10 to-background';
    }
  };

  const getMoodGlow = () => {
    switch (currentSong.mood) {
      case 'love':
        return 'glow-love';
      case 'chill':
        return 'shadow-lg shadow-blue-500/20';
      case 'energy':
        return 'shadow-lg shadow-yellow-500/20';
      default:
        return 'glow-primary';
    }
  };

  return (
    <div className={cn("min-h-screen transition-all duration-1000", getBackgroundClass())}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/30 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-love/40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-secondary/30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-love bg-clip-text text-transparent animate-gradient">
            Romeo
          </h1>
          <p className="text-muted-foreground mt-2">Your Anime Music Experience</p>
        </div>

        {/* Main Player */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Song Display */}
          <div className="lg:col-span-2">
            <div className={cn("card-3d rounded-3xl p-8 relative overflow-hidden", getMoodGlow())}>
              {/* Album Art */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className={cn("w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-love/20 flex items-center justify-center text-4xl animate-pulse-glow", isPlaying && "animate-spin")}>
                    🎵
                  </div>
                  {isPlaying && (
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{currentSong.title}</h2>
                  <p className="text-xl text-muted-foreground mb-4">{currentSong.artist}</p>
                  <div className="flex items-center gap-3">
                    <span className={cn("px-3 py-1 rounded-full text-sm font-medium",
                      currentSong.mood === 'love' && "bg-love/20 text-love-foreground",
                      currentSong.mood === 'chill' && "bg-blue-500/20 text-blue-100",
                      currentSong.mood === 'energy' && "bg-yellow-500/20 text-yellow-100",
                      currentSong.mood === 'default' && "bg-primary/20 text-primary-foreground"
                    )}>
                      {currentSong.mood}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-love transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{currentSong.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("w-12 h-12 rounded-full transition-all", isShuffled && "text-primary")}
                  onClick={() => setIsShuffled(!isShuffled)}
                >
                  <Shuffle className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-14 h-14 rounded-full hover:scale-110 transition-transform"
                  onClick={skipPrevious}
                >
                  <SkipBack className="w-6 h-6" />
                </Button>

                <Button
                  className={cn(
                    "w-16 h-16 rounded-full transition-all hover:scale-110",
                    currentSong.mood === 'love' && "btn-love",
                    currentSong.mood === 'chill' && "btn-chill",
                    currentSong.mood === 'energy' && "btn-energy",
                    currentSong.mood === 'default' && "bg-gradient-to-r from-primary to-secondary"
                  )}
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-14 h-14 rounded-full hover:scale-110 transition-transform"
                  onClick={skipNext}
                >
                  <SkipForward className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("w-12 h-12 rounded-full transition-all", repeatMode !== 'off' && "text-primary")}
                  onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
                >
                  <Repeat className="w-5 h-5" />
                  {repeatMode === 'one' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-xs">1</span>}
                </Button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("transition-all", isLiked && "text-love")}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                </Button>

                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5" />
                  <div className="w-24">
                    <Slider
                      value={[volume]}
                      onValueChange={(value) => setVolume(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="card-3d rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-4">Now Playing</h3>
            <div className="space-y-3">
              {DEMO_SONGS.map((song) => (
                <div
                  key={song.id}
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-all hover:bg-muted/50",
                    currentSong.id === song.id && "bg-primary/20 border border-primary/30"
                  )}
                  onClick={() => setCurrentSong(song)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-love/20 flex items-center justify-center">
                      🎵
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{song.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{song.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};