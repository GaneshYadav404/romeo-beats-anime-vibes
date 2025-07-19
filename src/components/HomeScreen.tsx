import { Play, Clock, Heart } from 'lucide-react';
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

interface HomeScreenProps {
  onSongPlay: (song: Song) => void;
  currentSong?: Song;
}

const RECENTLY_PLAYED: Song[] = [
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
  }
];

const MADE_FOR_YOU = [
  {
    id: 'anime-hits',
    title: 'Anime Hits 2024',
    description: 'Your favorite anime openings',
    cover: '🎌',
    mood: 'energy'
  },
  {
    id: 'love-ballads',
    title: 'Love Ballads',
    description: 'Romantic anime soundtracks',
    cover: '💕',
    mood: 'love'
  },
  {
    id: 'chill-beats',
    title: 'Chill Vibes',
    description: 'Lo-fi anime study music',
    cover: '🌸',
    mood: 'chill'
  }
];

export const HomeScreen = ({ onSongPlay, currentSong }: HomeScreenProps) => {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getMoodGradient = (mood: string) => {
    switch (mood) {
      case 'love':
        return 'bg-gradient-to-br from-love/20 to-primary/10';
      case 'chill':
        return 'bg-gradient-to-br from-blue-500/20 to-cyan-400/10';
      case 'energy':
        return 'bg-gradient-to-br from-yellow-500/20 to-orange-400/10';
      default:
        return 'bg-gradient-to-br from-primary/20 to-secondary/10';
    }
  };

  return (
    <div className="pb-24 pt-6">
      {/* Header */}
      <div className="px-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{getTimeGreeting()}</h1>
        <p className="text-muted-foreground">What would you like to listen to?</p>
      </div>

      {/* Quick Play Cards */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {RECENTLY_PLAYED.slice(0, 4).map((song) => (
            <button
              key={song.id}
              onClick={() => onSongPlay(song)}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-all hover:scale-105",
                getMoodGradient(song.mood),
                "glass border border-white/10"
              )}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-love/20 flex items-center justify-center text-lg">
                🎵
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-medium text-sm truncate">{song.title}</p>
                <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Made For You */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Made for You</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {MADE_FOR_YOU.map((playlist) => (
            <div key={playlist.id} className="flex-shrink-0 w-40">
              <div className={cn(
                "aspect-square rounded-2xl p-6 mb-3 flex items-center justify-center text-4xl transition-all hover:scale-105 cursor-pointer",
                getMoodGradient(playlist.mood),
                "glass border border-white/10"
              )}>
                {playlist.cover}
              </div>
              <h3 className="font-medium text-sm mb-1">{playlist.title}</h3>
              <p className="text-xs text-muted-foreground">{playlist.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Recently Played</h2>
        <div className="space-y-3">
          {RECENTLY_PLAYED.map((song) => (
            <div
              key={song.id}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-muted/30 cursor-pointer",
                currentSong?.id === song.id && "bg-primary/10 border border-primary/20"
              )}
              onClick={() => onSongPlay(song)}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-love/20 flex items-center justify-center text-xl">
                🎵
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{song.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jump Back In */}
      <div className="px-6">
        <h2 className="text-xl font-bold mb-4">Jump back in</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {['Workout Mix', 'Study Session', 'Night Drive'].map((title, index) => (
            <div key={title} className="flex-shrink-0 w-32">
              <div className={cn(
                "aspect-square rounded-xl mb-3 flex items-center justify-center text-2xl transition-all hover:scale-105 cursor-pointer",
                index === 0 && "bg-gradient-to-br from-yellow-500/20 to-orange-400/10",
                index === 1 && "bg-gradient-to-br from-blue-500/20 to-cyan-400/10", 
                index === 2 && "bg-gradient-to-br from-purple-500/20 to-pink-400/10",
                "glass border border-white/10"
              )}>
                {index === 0 && '💪'}
                {index === 1 && '📚'}
                {index === 2 && '🌙'}
              </div>
              <p className="font-medium text-sm">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};