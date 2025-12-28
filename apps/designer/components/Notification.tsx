"use client";

import { useMemo, useRef, useState } from "react";
import { Bell, MessageSquare, Heart, UserPlus, Info, ShoppingBag, Tag, Star, ChevronLeft, ChevronRight, Gavel } from "lucide-react"; // Import thêm icon
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useNotificationSocket } from "@/queries/useNotification";
import { useAuthStore } from "@/stores/authStore";
import http from "@/lib/http";
import { cn } from "@workspace/ui/lib/utils"; // Giả sử bạn có utility cn
import { useRouter } from "next/navigation";

export default function NotificationBell() {
  const authStore = useAuthStore();
  const currentUserId = authStore.user?.id || '';
  const queryClient = useQueryClient();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activityFilter, setActivityFilter] = useState<string>('all');

  // --- LOGIC: FETCHING & SOCKET ---
  useNotificationSocket(currentUserId);

  const { data: notifications = [] } = useQuery<NotificationType[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await http.get(`/notifications?userId=${currentUserId}`);
      return res.data;
    },
    enabled: !!currentUserId
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => http.patch(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] })
  });

  const handleMarkRead = (id: string) => {
    // Optimistic check: chỉ gọi API nếu chưa đọc
    const target = notifications.find(n => n._id === id);
    if (target && !target.isRead) {
      markReadMutation.mutate(id);
    }
  };

  // --- LOGIC: FILTERING ---
  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const activityNotifications = useMemo(() => {
    const activities = notifications.filter(n => 
      ['system', 'comment','rating', 'like', 'follow', 'auction'].includes(n.type)
    );
    return activityFilter === 'all' ? activities : activities.filter(n => n.type === activityFilter);
  }, [notifications, activityFilter]);

  const salesNotifications = useMemo(() => 
    notifications.filter(n => n.type === 'order_purchased'), 
  [notifications]);


  // --- HELPER: RENDER LIST ---
  const renderNotificationList = (list: NotificationType[], emptyMsg: string, emptyIcon: React.ReactNode) => {
    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 gap-3">
          <div className="p-4 bg-white/5 rounded-full">{emptyIcon}</div>
          <p className="text-xs">{emptyMsg}</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col pb-4">
        <div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase bg-[#222] sticky top-0 z-20">Recent</div>
        {list.map(noti => (
          <NotificationItem key={noti._id} notification={noti} onClick={handleMarkRead} setIsOpen={setIsOpen}/>
        ))}
      </div>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white rounded-full">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white border-2 border-black flex items-center justify-center text-[10px]">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-[400px] p-0 bg-[#1A1A1A] border-gray-800 text-white shadow-2xl" align="end">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-800 font-bold tracking-wider text-sm flex justify-between items-center">
            <span>NOTIFICATION</span>
            {/* {unreadCount > 0 && (
              <span className="text-[10px] text-gray-400 cursor-pointer hover:text-white underline">Mark all read</span>
            )} */}
        </div>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="w-full bg-transparent border-b border-gray-800 rounded-none h-12 p-0 grid grid-cols-3">
            {['all', 'activity', 'sales'].map((tab) => (
              <TabsTrigger 
                key={tab} value={tab}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-500 uppercase text-[10px] font-bold"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* === TAB: ACTIVITY === */}
          <TabsContent value="activity" className="m-0 focus:outline-none">
            <div className="flex flex-col h-[450px] w-full bg-[#1A1A1A]">
              <ActivityFilterBar currentFilter={activityFilter} setFilter={setActivityFilter} />
              <ScrollArea className="flex-1 h-[400px] w-full">
                {renderNotificationList(
                  activityNotifications, 
                  "No activity notifications found.", 
                  <Bell className="w-6 h-6 opacity-50" />
                )}
              </ScrollArea>
            </div>
          </TabsContent>

          {/* === TAB: SALES === */}
          <TabsContent value="sales" className="m-0">
             <ScrollArea className="h-[450px]">
                {renderNotificationList(
                   salesNotifications,
                   "No sales yet. Keep listing items!",
                   <ShoppingBag className="w-6 h-6 opacity-50" />
                )}
             </ScrollArea>
          </TabsContent>

          {/* === TAB: ALL === */}
          <TabsContent value="all" className="m-0">
             <ScrollArea className="h-[450px]">
                {renderNotificationList(
                   notifications,
                   "No notifications yet.",
                   <Bell className="w-6 h-6 opacity-50" />
                )}
             </ScrollArea>
          </TabsContent>

        </Tabs>
      </PopoverContent>
    </Popover>
  );
}


interface ActivityFilterBarProps {
  currentFilter: string;
  setFilter: (val: string) => void;
}

export const ActivityFilterBar = ({ currentFilter, setFilter }: ActivityFilterBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 150;
      current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const filters = ['all', 'comment', 'rating', 'follow', 'like', 'auction'];

  return (
    <div className="shrink-0 flex items-center gap-1 px-2 py-3 border-b border-gray-800/50 bg-[#1A1A1A] z-10">
      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 rounded-full hover:bg-gray-800 text-gray-400" onClick={() => scroll('left')}>
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <div 
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold capitalize transition-all whitespace-nowrap border",
              currentFilter === filter 
                ? "bg-white text-black border-white shadow-sm" 
                : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 rounded-full hover:bg-gray-800 text-gray-400" onClick={() => scroll('right')}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};


export interface NotificationType {
  _id: string;
  type: 'comment' | 'rating' | 'like' | 'follow' | 'order_purchased' | 'system' | 'auction';
  title: string;
  message: string;
  thumbnail?: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationItemProps {
  notification: NotificationType;
  onClick: (id: string) => void;
  setIsOpen?: (isOpen: boolean) => void;
}

// Helper: Lấy icon và màu nền badge
const getIconConfig = (type: string) => {
  switch (type) {
    case 'comment': return { icon: <MessageSquare className="w-3 h-3 text-white" />, bg: "bg-blue-500" };
    case 'rating': return { icon: <Star className="w-3 h-3 text-white" />, bg: "bg-yellow-500" };
    case 'like': return { icon: <Heart className="w-3 h-3 text-white" />, bg: "bg-pink-500" };
    case 'follow': return { icon: <UserPlus className="w-3 h-3 text-white" />, bg: "bg-green-500" };
    case 'auction': return { icon: <Gavel className="w-3 h-3 text-white" />, bg: "bg-blue-600" };
    // case 'order_bought': return { icon: <ShoppingBag className="w-3 h-3 text-white" />, bg: "bg-purple-500" };
    case 'order_purchased': return { icon: <Tag className="w-3 h-3 text-white" />, bg: "bg-green-600" };
    default: return { icon: <Bell className="w-3 h-3 text-white" />, bg: "bg-gray-600" };
  }
};

export const NotificationItem = ({ notification, onClick,setIsOpen }: NotificationItemProps) => {
  const { icon, bg } = getIconConfig(notification.type);
  const router = useRouter();

  const handleClick = () => {
    onClick(notification._id);
    
    const targetLink = getNotificationLink(notification);
    if(targetLink) {
      if(setIsOpen)
        setIsOpen(false);
      router.push(targetLink);

    }
  };
  return (
    <div 
      className={cn(
        "group relative flex gap-3 p-4 border-b border-gray-800/40 transition-all cursor-pointer",
        "hover:bg-[#252525]",
        !notification.isRead ? "bg-[#1f2937]/30" : "bg-transparent"
      )}
      onClick={handleClick}
    >
      {/* --- AVATAR SECTION --- */}
      <div className="relative shrink-0 pt-1 self-start">
        <Avatar className="w-10 h-10 border border-gray-700 shadow-sm">
          <AvatarImage src={notification.thumbnail || "/default-avatar.png"} className="object-cover" />
          <AvatarFallback className="bg-gray-800 text-[10px]">USER</AvatarFallback>
        </Avatar>
        
        {/* Icon Badge */}
        <div className={cn(
          "absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1A1A1A]",
          bg
        )}>
          {icon}
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="flex-1 flex flex-col justify-center min-w-0 gap-0.5">
        <div className="text-sm text-gray-300 leading-snug break-words pr-2">
          <span className="font-semibold text-white mr-1 hover:underline decoration-gray-500 underline-offset-2">
            {notification.title}
          </span>
          <span className="text-gray-400 text-xs">
             {/* {notification.type === 'like' ? "liked your post." : 
              notification.type === 'follow' ? "started following you." :  */}
              <span className={cn(notification.type === 'comment' && "italic text-gray-300")}>
                {notification.message}
              </span>
             {/* } */}
          </span>
        </div>

        <p className="text-[10px] text-gray-500 font-medium">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>

      {/* --- STATUS INDICATOR --- */}
      <div className="shrink-0 flex flex-col items-center justify-center pt-1">
        {!notification.isRead && (
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
        )}
      </div>
    </div>
  );
};

export const getNotificationLink = (noti: any) => {
  
  if (noti.type === 'comment' && noti.relatedEntityId) {
    return `/detail/${noti.relatedEntityId}`; 
  }
  if (noti.type === 'rating' && noti.relatedEntityId) {
    return `/detail/${noti.relatedEntityId}`; 
  }
  if (noti.type === 'like' && noti.relatedEntityId) {
    return `/detail/${noti.relatedEntityId}`; 
  }
  if (noti.type === 'follow' && noti.relatedEntityId) {
    return `/portfolio/${noti.relatedEntityId}`; 
  }
  if (noti.type === 'auction'&& noti.relatedEntityId) {
    return `/orders/?search=${noti.relatedEntityId}`; 
  }
  if (noti.type === 'order_purchased' && noti.relatedEntityId) {
    return `/sales/?search=${noti.relatedEntityId}`; 
  }

 

  // ƯU TIÊN 2: Nếu không thuộc các loại trên (ví dụ 'system'), hoặc không có entityId
  // Thì dùng link do BE gửi xuống
  if (noti.link) {
    return noti.link;
  }

  // Fallback cuối cùng
  return '';
};