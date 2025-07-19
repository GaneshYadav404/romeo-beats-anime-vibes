import { Grid, List, Download, Clock, Heart, Music, Mic, Radio, Podcast } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LIBRARY_SECTIONS = [
  { id: 'recently-played', title: 'Recently played', icon: Clock, count: 50 },
  { id: 'liked-songs', title: 'Liked Songs', icon: Heart, count: 124, gradient: 'from-love/20 to-primary/10' },
  { id: 'downloaded', title: 'Downloaded Music', icon: Download, count: 23 },
  { id: 'playlists', title: 'Made by you', icon: Music, count: 8 },
  { id: 'artists', title: 'Artists', icon: Mic, count: 15 },
  { id: 'albums', title: 'Albums', icon: Music, count: 32 },
  { id: 'podcasts', title: 'Podcasts & Shows', icon: Podcast, count: 3 },
  { id: 'stations', title: 'Stations', icon: Radio, count: 12 },
];

const YOUR_PLAYLISTS = [
  {
    id: 1,
    name: 'Anime Favorites',
    songCount: 47,
    cover: '🎌',
    gradient: 'from-pink-500/20 to-purple-500/10'
  },
  {
    id: 2,
    name: 'Late Night Vibes',
    songCount: 32,
    cover: '🌙',
    gradient: 'from-blue-500/20 to-indigo-500/10'
  },
  {
    id: 3,
    name: 'Study Session',
    songCount: 28,
    cover: '📚',
    gradient: 'from-green-500/20 to-teal-500/10'
  },
  {
    id: 4,
    name: 'Workout Energy',
    songCount: 55,
    cover: '💪',
    gradient: 'from-orange-500/20 to-red-500/10'
  }
];

export const LibraryScreen = () => {
  return (
    <div className="pb-24 pt-6">
      {/* Header */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Your Library</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Grid className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {LIBRARY_SECTIONS.slice(0, 4).map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-105",
                  section.gradient || "bg-gradient-to-br from-primary/10 to-secondary/5",
                  "glass border border-white/10"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6",
                  section.id === 'liked-songs' && "text-love fill-current"
                )} />
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-sm truncate">{section.title}</p>
                  <p className="text-xs text-muted-foreground">{section.count} items</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recently Created */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Recently created</h2>
        <div className="space-y-3">
          {YOUR_PLAYLISTS.slice(0, 2).map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-muted/30 cursor-pointer"
            >
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
                `bg-gradient-to-br ${playlist.gradient}`,
                "glass border border-white/10"
              )}>
                {playlist.cover}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{playlist.name}</h3>
                <p className="text-sm text-muted-foreground">{playlist.songCount} songs</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Made by You */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Made by you</h2>
        <div className="space-y-3">
          {YOUR_PLAYLISTS.map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-muted/30 cursor-pointer"
            >
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-xl",
                `bg-gradient-to-br ${playlist.gradient}`,
                "glass border border-white/10"
              )}>
                {playlist.cover}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{playlist.name}</h3>
                <p className="text-xs text-muted-foreground">{playlist.songCount} songs</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Categories */}
      <div className="px-6">
        <h2 className="text-lg font-semibold mb-4">Browse</h2>
        <div className="space-y-2">
          {LIBRARY_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                className="flex items-center gap-4 w-full p-3 rounded-xl transition-all hover:bg-muted/30 text-left"
              >
                <Icon className={cn(
                  "w-6 h-6",
                  section.id === 'liked-songs' && "text-love fill-current"
                )} />
                <div className="flex-1">
                  <p className="font-medium">{section.title}</p>
                </div>
                <span className="text-sm text-muted-foreground">{section.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};