import { useState, useEffect } from 'react';
import { ChevronDown, MoreHorizontal, Heart, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Share, List } from 'lucide-react';
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
}

interface NowPlayingScreenProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
}

export const NowPlayingScreen = ({ 
  song, 
  isPlaying, 
  onTogglePlay, 
  onClose,
  onSkipNext,
  onSkipPrevious
}: NowPlayingScreenProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4:00 in seconds
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getBackgroundClass = () => {
    switch (song.mood) {
      case 'love':
        return 'bg-gradient-to-b from-love/30 via-love/10 to-background';
      case 'chill':
        return 'bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-background';
      case 'energy':
        return 'bg-gradient-to-b from-yellow-500/30 via-yellow-500/10 to-background';
      default:
        return 'bg-gradient-to-b from-primary/30 via-primary/10 to-background';
    }
  };

  const getMoodAccent = () => {
    switch (song.mood) {
      case 'love':
        return 'text-love';
      case 'chill':
        return 'text-blue-400';
      case 'energy':
        return 'text-yellow-400';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className={cn("fixed inset-0 z-50 transition-all duration-700", getBackgroundClass())}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-white/30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-white/10 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm"
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
          
          <div className="text-center">
            <p className="text-sm font-medium">PLAYING FROM PLAYLIST</p>
            <p className="text-xs text-muted-foreground">Anime Favorites</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm"
          >
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>

        {/* Album Art */}
        <div className="flex-1 flex items-center justify-center px-8 py-8">
          <div className="relative">
            <div className={cn(
              "w-80 h-80 rounded-3xl shadow-2xl flex items-center justify-center text-8xl transition-all duration-700",
              "bg-gradient-to-br from-background/20 to-background/10 backdrop-blur-sm border border-white/20",
              isPlaying && "animate-pulse-glow"
            )}>
              🎵
            </div>
            {isPlaying && (
              <div className="absolute inset-0 rounded-3xl bg-white/10 animate-ping"></div>
            )}
          </div>
        </div>

        {/* Song Info */}
        <div className="px-8 mb-6">
          <h1 className="text-2xl font-bold mb-2 text-center">{song.title}</h1>
          <p className="text-lg text-muted-foreground text-center mb-4">{song.artist}</p>
          
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={cn("w-8 h-8", isLiked && "text-love")}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn("w-6 h-6", isLiked && "fill-current")} />
            </Button>
            
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 mb-6">
          <div className="mb-2">
            <Slider
              value={[currentTime]}
              onValueChange={(value) => setCurrentTime(value[0])}
              max={duration}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{song.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="px-8 mb-8">
          <div className="flex items-center justify-center gap-6 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className={cn("w-10 h-10", isShuffled && getMoodAccent())}
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <Shuffle className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12"
              onClick={onSkipPrevious}
            >
              <SkipBack className="w-6 h-6" />
            </Button>

            <Button
              className={cn(
                "w-16 h-16 rounded-full shadow-2xl transition-all hover:scale-110",
                song.mood === 'love' && "bg-gradient-to-r from-love to-primary shadow-love/30",
                song.mood === 'chill' && "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-blue-500/30",
                song.mood === 'energy' && "bg-gradient-to-r from-yellow-500 to-orange-400 shadow-yellow-500/30",
                song.mood === 'default' && "bg-gradient-to-r from-primary to-secondary shadow-primary/30"
              )}
              onClick={onTogglePlay}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12"
              onClick={onSkipNext}
            >
              <SkipForward className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("w-10 h-10 relative", repeatMode !== 'off' && getMoodAccent())}
              onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
            >
              <Repeat className="w-5 h-5" />
              {repeatMode === 'one' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-xs flex items-center justify-center text-white">
                  1
                </span>
              )}
            </Button>
          </div>

          {/* Volume & Queue */}
          <div className="flex items-center justify-between">
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

            <Button variant="ghost" size="icon" className="w-10 h-10">
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};