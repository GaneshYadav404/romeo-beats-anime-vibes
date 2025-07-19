import { Play, Pause, SkipForward, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  mood: 'love' | 'chill' | 'energy' | 'default';
  cover: string;
}

interface MiniPlayerProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenFullPlayer: () => void;
  onSkipNext: () => void;
}

export const MiniPlayer = ({ 
  song, 
  isPlaying, 
  onTogglePlay, 
  onOpenFullPlayer,
  onSkipNext 
}: MiniPlayerProps) => {
  const getMoodGradient = () => {
    switch (song.mood) {
      case 'love':
        return 'from-love/20 to-primary/10';
      case 'chill':
        return 'from-blue-500/20 to-cyan-400/10';
      case 'energy':
        return 'from-yellow-500/20 to-orange-400/10';
      default:
        return 'from-primary/20 to-secondary/10';
    }
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 px-4 max-w-lg mx-auto">
      <div 
        onClick={onOpenFullPlayer}
        className={cn(
          "flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all hover:scale-105",
          `bg-gradient-to-r ${getMoodGradient()}`,
          "glass border border-white/20 shadow-2xl backdrop-blur-lg"
        )}
      >
        {/* Album Art */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-love/20 flex items-center justify-center text-lg flex-shrink-0">
          🎵
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{song.title}</h3>
          <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-love hover:bg-love/20"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 hover:bg-background/20"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 hover:bg-background/20"
            onClick={(e) => {
              e.stopPropagation();
              onSkipNext();
            }}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};