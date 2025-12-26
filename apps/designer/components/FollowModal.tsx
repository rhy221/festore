// components/portfolio/follow-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/lib/Http";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@workspace/ui/lib/utils";
import { useFollowDesignerMutation } from "@/queries/useProduct";
import { useAuth } from "@/hooks/useAuth";

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  defaultType: "followers" | "following"; // Đổi tên prop này để rõ nghĩa hơn
}

export function FollowModal({ isOpen, onClose, userId, defaultType }: FollowModalProps) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);
  const {execute} = useAuth()

  
  // State quản lý tab đang active bên trong modal
  const [activeTab, setActiveTab] = useState<"followers" | "following">(defaultType);

  // Reset active tab khi modal mở lại với defaultType mới
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultType);
    }
  }, [isOpen, defaultType]);

  // 1. Fetch danh sách dựa trên activeTab
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["follow-list", userId, activeTab], // Key thay đổi theo tab
    queryFn: async () => {
      const endpoint = activeTab === "followers" 
        ? `/users/${userId}/followers` 
        : `/users/${userId}/following`;
      const res = await http.get(endpoint);
      return res.data;
    },
    enabled: isOpen, // Chỉ fetch khi mở modal
  });

  // 2. Hàm Follow/Unfollow nhanh
  const followMutation = useFollowDesignerMutation();

  const handleFollow = async (id: string) => {
    execute(async () => {
      if(followMutation.isPending) return;
    try {
        await followMutation.mutateAsync(id);
        queryClient.invalidateQueries({queryKey: ["follow-list", userId, activeTab]});
    }
    catch(err){
        console.error(err);
    }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-[#1A1A1A] border-zinc-800 text-white p-0 gap-0 overflow-hidden">
        
        {/* FIX LỖI ACCESSIBILITY: Thêm DialogTitle ẩn */}
        <DialogHeader className="sr-only">
          <DialogTitle>List of {activeTab}</DialogTitle>
        </DialogHeader>

        {/* Custom Header Tabs */}
        <div className="flex border-b border-zinc-800">
          <div 
            onClick={() => setActiveTab("followers")}
            className={cn(
              "flex-1 p-4 text-center text-sm font-bold cursor-pointer transition-colors",
              activeTab === 'followers' 
                ? 'text-white border-b-2 border-white bg-zinc-800/50' 
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
            )}
          >
            FOLLOWER
          </div>
          <div 
            onClick={() => setActiveTab("following")}
            className={cn(
              "flex-1 p-4 text-center text-sm font-bold cursor-pointer transition-colors",
              activeTab === 'following' 
                ? 'text-white border-b-2 border-white bg-zinc-800/50' 
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
            )}
          >
            FOLLOWING
          </div>
        </div>

        {/* Content List */}
        <ScrollArea className="h-[400px] p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-2">
               <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin"></div>
               <p className="text-xs text-zinc-500">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center p-8 text-zinc-500 text-sm">
               {activeTab === 'followers' ? "No followers yet." : "Not following anyone yet."}
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user: any) => (
                <div key={user._id || user.userId} className="flex items-center justify-between group/item">
                  <Link 
                    href={`/portfolio/${user.userId}`} 
                    onClick={onClose} 
                    className="flex items-center gap-3 group flex-1 min-w-0" // min-w-0 để text truncate hoạt động
                  >
                    <Avatar className="w-10 h-10 border border-zinc-700 shrink-0">
                      <AvatarImage src={user.avatarUrl || "/default-avatar.png"}/>
                      <AvatarFallback className="bg-zinc-800 text-zinc-400 font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-zinc-500 truncate max-w-[180px]">
                        {user.bio || "Designer"}
                      </p>
                    </div>
                  </Link>
                  
                  {/* Nút Follow Action */}
                 {currentUser?.id !== user.userId && ( 
        <Button 
          // Nếu isFollowing = true -> variant outline/ghost, Text "Following"
          // Nếu isFollowing = false -> variant default (đen/trắng), Text "Follow"
          variant={user.isFollowing ? "outline" : "default"}
          onClick={() => handleFollow(user.userId)}
        >
           {user.isFollowing ? "Following" : "Follow"}
        </Button>
     )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 flex justify-center bg-[#1A1A1A]">
           <Button 
             onClick={onClose} 
             className="w-24 h-8 bg-white text-black hover:bg-zinc-200 rounded-full font-bold text-xs shadow-lg transition-transform active:scale-95"
           >
             OK
           </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}