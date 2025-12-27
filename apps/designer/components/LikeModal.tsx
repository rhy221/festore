"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { useQuery } from "@tanstack/react-query";
import http from "@/libs/api-client";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";

interface LikeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  designId: string;
}

export function LikeListModal({ isOpen, onClose, designId }: LikeListModalProps) {
  const currentUser = useAuthStore((state) => state.user);

  // Fetch list of likers
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["design-likes", designId],
    queryFn: async () => {
      const res = await http.get(`/products/${designId}/likes`);
      console.log(res.data);
      return res.data;
    },
    enabled: isOpen, // Only fetch when modal is open
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-[#1A1A1A] border-zinc-800 text-white p-0 gap-0">
         <DialogHeader className="sr-only">
          <DialogTitle>Likes</DialogTitle>
        </DialogHeader>
        {/* Header */}
        <div className="flex border-b border-zinc-800 p-4">
          <div className="flex-1 text-center text-sm font-bold text-white uppercase">
            Likes
          </div>
        </div>

        {/* Content List */}
        <ScrollArea className="h-[400px] p-4">
          {isLoading ? (
            <div className="text-center p-4 text-zinc-500">Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center p-4 text-zinc-500">No likes yet.</div>
          ) : (
            <div className="space-y-4">
              {users.map((user: any) => (
                <div key={user._id || user.userId} className="flex items-center justify-between group">
                  <Link href={`/portfolio/${user.userId}`} onClick={onClose} className="flex items-center gap-3 flex-1">
                    <Avatar className="w-10 h-10 border border-zinc-700">
                      <AvatarImage src={user.avatarUrl || "/default-avatar.png"} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:underline">{user.name}</p>
                      <p className="text-[10px] text-zinc-500 line-clamp-1">{user.bio || "No bio yet"}</p>
                    </div>
                  </Link>
                  
                  {/* Optional: Add Follow button logic here if needed, similar to FollowModal */}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 flex justify-center">
           <Button onClick={onClose} className="w-24 bg-white text-black hover:bg-zinc-200 rounded-full font-bold text-xs">
             OK
           </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}