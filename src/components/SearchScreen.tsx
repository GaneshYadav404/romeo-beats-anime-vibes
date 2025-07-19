import { useState } from 'react';
import { Search, Clock, TrendingUp, Music } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  mood: 'love' | 'chill' | 'energy' | 'default';
  cover: string;
}

interface SearchScreenProps {
  onSongPlay: (song: Song) => void;
}

const RECENT_SEARCHES = [
  'The Killers - Smile Like You Mean It',
  'Anime Opening Songs',
  'Lo-fi Hip Hop',
  'Japanese City Pop',
  'Studio Ghibli Music'
];

const BROWSE_CATEGORIES = [
  { id: 'anime', title: 'Anime', color: 'from-pink-500/20 to-purple-500/10', emoji: '🎌' },
  { id: 'jpop', title: 'J-Pop', color: 'from-blue-500/20 to-cyan-400/10', emoji: '🎌' },
  { id: 'lofi', title: 'Lo-Fi', color: 'from-green-500/20 to-teal-400/10', emoji: '🌿' },
  { id: 'city-pop', title: 'City Pop', color: 'from-yellow-500/20 to-orange-400/10', emoji: '🌆' },
  { id: 'rock', title: 'Rock', color: 'from-red-500/20 to-pink-400/10', emoji: '🎸' },
  { id: 'electronic', title: 'Electronic', color: 'from-purple-500/20 to-indigo-400/10', emoji: '⚡' },
];

const TRENDING_SONGS: Song[] = [
  {
    id: 5,
    title: "Smile Like You Mean It",
    artist: "The Killers",
    duration: "3:54",
    mood: "energy",
    cover: "/api/placeholder/300/300"
  },
  {
    id: 6,
    title: "Your Name Theme",
    artist: "RADWIMPS",
    duration: "4:32",
    mood: "love",
    cover: "/api/placeholder/300/300"
  },
  {
    id: 7,
    title: "Plastic Love",
    artist: "Mariya Takeuchi",
    duration: "4:19",
    mood: "chill",
    cover: "/api/placeholder/300/300"
  }
];

export const SearchScreen = ({ onSongPlay }: SearchScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };

  const filteredSongs = searchQuery 
    ? TRENDING_SONGS.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="pb-24 pt-6">
      {/* Search Header */}
      <div className="px-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-12 bg-muted/50 border-0 text-base"
          />
        </div>
      </div>

      {!isSearching ? (
        <>
          {/* Recent Searches */}
          <div className="px-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent searches
            </h2>
            <div className="space-y-3">
              {RECENT_SEARCHES.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="flex items-center gap-4 w-full text-left p-2 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{search}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Browse All */}
          <div className="px-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Browse all</h2>
            <div className="grid grid-cols-2 gap-3">
              {BROWSE_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "aspect-square rounded-xl p-4 flex flex-col justify-between transition-all hover:scale-105",
                    `bg-gradient-to-br ${category.color}`,
                    "glass border border-white/10"
                  )}
                >
                  <h3 className="text-lg font-bold text-left">{category.title}</h3>
                  <div className="text-2xl self-end">{category.emoji}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="px-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending now
            </h2>
            <div className="space-y-3">
              {TRENDING_SONGS.map((song) => (
                <div
                  key={song.id}
                  onClick={() => onSongPlay(song)}
                  className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-muted/30 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-love/20 flex items-center justify-center text-xl">
                    🎵
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{song.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{song.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Search Results */
        <div className="px-6">
          {filteredSongs.length > 0 ? (
            <>
              <h2 className="text-lg font-semibold mb-4">Search results</h2>
              <div className="space-y-3">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => onSongPlay(song)}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-muted/30 cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-love/20 flex items-center justify-center text-xl">
                      🎵
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{song.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>
                    <Music className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};