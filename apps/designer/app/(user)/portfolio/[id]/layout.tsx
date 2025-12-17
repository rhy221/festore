"use client"
import React, { useState, useRef, use, useEffect } from 'react';
import { ProfileBanner } from '@/components/portfolio/profile-banner';
import { ProfileTabs } from '@/components/portfolio/profile-tabs';
import { Share2, Camera, Loader2 } from 'lucide-react'; // Import Loader2
import { useUserPortfolio } from '@/queries/useUser';
import { useUserPortfolioEditing } from '@/queries/useUser'; 
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query'; // Import QueryClient
import { Button } from '@workspace/ui/components/button';
import { useFollowDesignerMutation } from '@/queries/useProduct';
import { useAuth } from '@/hooks/useAuth';
import { set } from 'date-fns';
import { copyToClipboard } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default function PortfolioLayout({ children, params }: LayoutProps) {
  const { id } = use(params);
  const queryClient = useQueryClient(); // Khởi tạo queryClient
  
  const currentUser = useAuthStore((state) => state.user);
  
  // Lưu ý: Đảm bảo key này khớp với key trong hook useUserPortfolio của bạn
  const QUERY_KEY = ["userPortfolio", id]; 

  const {execute} = useAuth();

  const { data: userPortfolio, isLoading: userPortfolioLoading } = useUserPortfolio(id);
  const updateUserPortfolioMutation = useUserPortfolioEditing();
    const followMutation = useFollowDesignerMutation();

    const handleFollow = async () => {
    execute( async() => {
      if (followMutation.isPending) return;
    try {
      const result = await followMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      console.log('Follow result:', result);
    } catch (err) {
      console.error('Follow error:', err);
    }
    })
    
  };

  const isOwner = currentUser?.id === id;

  const avatarInputRef = useRef<HTMLInputElement>(null);
  // State loading riêng cho Avatar
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  // --- Xử lý Upload Avatar ---
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size too large (max 5MB)");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file); 

    try {
      setIsAvatarUploading(true); // Bật loading
      await updateUserPortfolioMutation.mutateAsync(formData);
      
      // QUAN TRỌNG: Làm mới dữ liệu ngay lập tức
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      
      toast.success('Avatar updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update Avatar');
    } finally {
      setIsAvatarUploading(false); // Tắt loading
      // Reset input để có thể chọn lại cùng 1 file
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  // --- Hàm trigger input avatar ---
  const onAvatarClick = () => {
    if (isOwner && !isAvatarUploading && avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  // --- Xử lý Upload Banner (Truyền xuống component con) ---
  const onBannerUpdate = async (file: File) => {
      const formData = new FormData();
      formData.append('banner', file);
      
      // Gọi mutation
      await updateUserPortfolioMutation.mutateAsync(formData);
      
      // QUAN TRỌNG: Làm mới dữ liệu ngay lập tức sau khi upload banner xong
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
  }

  if (userPortfolioLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-8 lg:px-20 lg:py-12 bg-zinc-950 text-white selection:bg-primary selection:text-black">
      <main className="container mx-auto px-0 lg:px-12 pt-8">
        
        {/* Profile Header Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          
          {/* Left: Avatar & Info */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6">
              
              {/* Avatar Section */}
              <div className="relative group">
                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-[#1a1a1a] ring-4 ring-[#0f0f10] relative">
                  <img 
                    src={userPortfolio?.avatarUrl || '/default-avatar.png'} 
                    alt={userPortfolio?.name || 'User Avatar'} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Loading Spinner Overlay cho Avatar */}
                  {isAvatarUploading && (
                    <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
                       <Loader2 className="animate-spin text-white" size={32} />
                    </div>
                  )}
                </div>
                
                {/* Chỉ hiện overlay Edit nếu là Owner và KHÔNG đang upload */}
                {isOwner && !isAvatarUploading && (
                  <>
                    <div 
                      onClick={onAvatarClick}
                      className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                    >
                      <div className="flex flex-col items-center">
                        <Camera size={20} />
                        <span className="text-xs font-bold mt-1">EDIT</span>
                      </div>
                    </div>
                    {/* Hidden Input for Avatar */}
                    <input 
                      type="file" 
                      ref={avatarInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </>
                )}
              </div>

              {/* User Details */}
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl font-bold text-white mb-2">{userPortfolio?.name}</h1>
                
                <div className="flex items-center gap-5 text-sm">
                  <div className="flex flex-col lg:flex-row lg:gap-1">
                    <span className="text-white font-bold">{userPortfolio?.followerCount?.toLocaleString() || 0}</span>
                    <span className="text-gray-500">Follower</span>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:gap-1">
                    <span className="text-white font-bold">{userPortfolio?.followingCount?.toLocaleString() || 0}</span>
                    <span className="text-gray-500">Following</span>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:gap-1">
                    <span className="text-white font-bold">{userPortfolio?.totalDesigns?.toLocaleString() || 0}</span>
                    <span className="text-gray-500">Models</span>
                  </div>
                </div>
                {!isOwner && <Button 
                    onClick={handleFollow}
                className={`w-full ${
                        userPortfolio?.isFollowing ? 'bg-blue-600  text-white':
                        ''
                }`}>
                    {!userPortfolio?.isFollowing ? 'Follow' : 'Following'}</Button>}
              </div>
            </div>
          </div>

          {/* Right: Banner */}
          <div className="flex-1">
             <ProfileBanner 
                user={userPortfolio!} 
                isEditable={isOwner} 
                onUpdate={onBannerUpdate} // Truyền hàm đã có invalidateQueries
             />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="relative">
           <ProfileTabs userId={id} />
           <button className="absolute right-0 top-0 -mt-2 text-gray-500 hover:text-white p-2"
           onClick={() => {copyToClipboard()}}>
              <Share2 size={18} />
           </button>
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[400px] flex gap-2">
          {children}
        </div>

      </main>
    </div>
  );
};


// "use client"
// import React, { useState, useEffect, use } from 'react';
// import { User, Collection } from '@/components/portfolio/types';
// import { ProfileBanner } from '@/components/portfolio/profile-banner';
// import { ProfileTabs } from '@/components/portfolio/profile-tabs';
// import { Button } from '@workspace/ui/components/button';
// import { Input } from '@workspace/ui/components/input';
// import { ItemCard } from '@/components/portfolio/item-card';
// import { Share2, ChevronRight, MoreHorizontal } from 'lucide-react';
// import Statics from '../../profile/statics';
// import { useUserPortfolio } from '@/queries/useUser';



// interface LayoutProps {
//   children: React.ReactNode;
//   params: Promise<{ id: string }>;
// }

// export default function PortfolioLayout({ children, params }: LayoutProps) {
//   const {id} = use(params);
// const {data: userPortfolio, isLoading: userPortfolioLoading} = useUserPortfolio(id);
  
// if(userPortfolioLoading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }
//   return (
//     <div className="min-h-screen px-20 py-12  bg-zinc-950 text-white selection:bg-primary selection:text-black">
      

//       <main className="container mx-auto px-4 lg:px-12 pt-8">
        
//         {/* Profile Header Section */}
//         <div className="flex flex-col lg:flex-row gap-8 mb-8">
          
//           {/* Left: Avatar & Info */}
//           <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
//             <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6">
//               {/* Avatar */}
//               <div className="relative group">
//                 <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-[#1a1a1a] ring-4 ring-[#0f0f10]">
//                   <img 
//                     src={userPortfolio?.avatarUrl} 
//                     alt={userPortfolio?.name || 'User Avatar'} 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
          
//                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//                      <span className="text-xs font-bold">EDIT</span>
//                    </div>
                
                
//               </div>

//               {/* User Details */}
//               <div className="flex-1">
//                 <h1 className="text-3xl font-bold text-white mb-2">{userPortfolio?.name}</h1>
                
//                 {/* {userPortfolio.headline && (
//                   <p className="text-gray-400 text-sm mb-4 leading-relaxed">{userPortfolio.headline}</p>
//                 )} */}
                
//                 <div className="flex items-center gap-5 text-sm">
//                   <div className="flex flex-col lg:flex-row lg:gap-1">
//                     <span className="text-white font-bold">{userPortfolio?.followerCount.toLocaleString()}</span>
//                     <span className="text-gray-500">Follower</span>
//                   </div>
//                   <div className="flex flex-col lg:flex-row lg:gap-1">
//                     <span className="text-white font-bold">{userPortfolio?.followingCount.toLocaleString()}</span>
//                     <span className="text-gray-500">Following</span>
//                   </div>
//                   <div className="flex flex-col lg:flex-row lg:gap-1">
//                     <span className="text-white font-bold">{userPortfolio?.totalDesigns.toLocaleString()}</span>
//                     <span className="text-gray-500">Models</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

            
//           </div>

//           {/* Right: Banner */}
//           <div className="flex-1">
//              <ProfileBanner user={userPortfolio!} isEditable={true} />
//           </div>
//         </div>

//         {/* Tabs Navigation */}
//         <div className="relative">
//            <ProfileTabs userId={id} />
//            <button className="absolute right-0 top-0 -mt-2 text-gray-500 hover:text-white p-2">
//               <Share2 size={18} />
//            </button>
//         </div>

//         {/* Tab Content Area */}
//         <div className="min-h-[400px] flex gap-2">
//           {children}
        

//         </div>

//       </main>
//     </div>
//   );
// };


