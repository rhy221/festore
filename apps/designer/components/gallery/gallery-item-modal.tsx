'use client';

import { X, Heart, Bookmark, Share2, Download, Info } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar';
import { useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  creator: string;
  likes: number;
  views: number;
  category: string;
}

interface GalleryItemModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export function GalleryItemModal({ item, onClose }: GalleryItemModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex items-center justify-center">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-900">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-white/60">{item.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
                  {item.creator.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-white font-medium">{item.creator}</p>
                <p className="text-white/60 text-sm">Creator</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Follow
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {likeCount.toLocaleString()}
                </p>
                <p className="text-white/60 text-xs">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {item.views.toLocaleString()}
                </p>
                <p className="text-white/60 text-xs">Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">28</p>
                <p className="text-white/60 text-xs">Downloads</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={handleLike}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                  isLiked
                    ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                Like
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-cyan-500/20 text-cyan-500 border border-cyan-500/30'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                Save
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">License</span>
                <span className="text-white text-sm">Standard</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Resolution</span>
                <span className="text-white text-sm">4K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Format</span>
                <span className="text-white text-sm">PNG</span>
              </div>
              <button className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm pt-2 border-t border-white/10">
                <Info className="w-4 h-4" />
                More details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
