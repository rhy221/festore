import React, { useRef, useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { UserProfileResType } from '@/schemas/user.schema';

interface ProfileBannerProps {
  user: UserProfileResType;
  isEditable: boolean;
  onUpdate?: (file: File) => Promise<any>; 
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({ user, isEditable, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    if (!isUploading) {
        fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file && onUpdate) {
      try {
        setIsUploading(true); // Bắt đầu loading
        await onUpdate(file); // Chờ function ở cha chạy xong (bao gồm cả invalidateQueries)
      } catch (error) {
        console.error("Banner upload failed", error);
      } finally {
        setIsUploading(false); // Tắt loading
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  return (
    <div className="relative w-full h-48 md:h-64 lg:h-72 bg-[#1a1a1a] rounded-xl overflow-hidden group border border-gray-800/50">
      
      {/* --- Image Display --- */}
      {user.bannerUrl ? (
        <img 
          src={user.bannerUrl} 
          alt="Banner" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#151515] text-gray-600 gap-2">
           <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center opacity-20">
             <ImageIcon size={24} />
           </div>
        </div>
      )}

      {/* Loading Overlay cho Banner (Hiển thị khi đang upload) */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center text-white">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <span className="text-sm font-medium">Updating Banner...</span>
            </div>
        </div>
      )}

      {/* --- Overlay Actions (Only in Edit Mode & Not Uploading) --- */}
      {isEditable && !isUploading && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-3">
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />

              <Button 
                onClick={handleUploadClick}
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-bold uppercase text-xs px-6 rounded-full h-9 transition-colors"
              >
                Upload Banner
              </Button>
            </div>
            <p className="text-gray-400 text-[10px] mt-1 font-medium tracking-wide">(Optimal Image Size: 1920*400 pixels)</p>
          </div>
        </div>
      )}

      
    </div>
  );
};

// import React from 'react';
// import { User } from './types';
// import { Button } from '@workspace/ui/components/button';
// import { Image as ImageIcon } from 'lucide-react';
// import { UserProfileResType } from '@/schema/user.schema';

// interface ProfileBannerProps {
//   user: UserProfileResType;
//   isEditable: boolean;
// }

// export const ProfileBanner: React.FC<ProfileBannerProps> = ({ user, isEditable }) => {
//   return (
//     <div className="relative w-full h-48 md:h-64 lg:h-72 bg-[#1a1a1a] rounded-xl overflow-hidden group border border-gray-800/50">
//       {user.bannerUrl ? (
//         <img 
//           src={user.bannerUrl} 
//           alt="Banner" 
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//         />
//       ) : (
//         <div className="w-full h-full flex flex-col items-center justify-center bg-[#151515] text-gray-600 gap-2">
//            {/* Empty State Pattern */}
//            <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center opacity-20">
//              <ImageIcon size={24} />
//            </div>
//         </div>
//       )}

//       {/* Overlay Actions (Only in Edit Mode) */}
//       {isEditable && (
//         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
//           <div className="flex flex-col items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//             <div className="flex gap-3">
//               {/* <Button className="bg-white text-black hover:bg-gray-200 font-bold text-xs px-6 rounded-full h-9">
//                 BANNER GUIDE
//               </Button> */}
//               <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-bold uppercase text-xs px-6 rounded-full h-9">
//                 Upload
//               </Button>
//             </div>
//             <p className="text-gray-400 text-[10px] mt-1 font-medium tracking-wide">(Optimal Image Size: 1920*400 pixels)</p>
//           </div>
//         </div>
//       )}

//       {/* 'More' Bubbles - Bottom Right (Decoration from screenshot) */}
//       {!isEditable && (
//         <div className="absolute bottom-4 right-4 flex items-center animate-in fade-in duration-700 delay-300">
//            <div className="flex -space-x-3">
//                {[1,2,3].map(i => (
//                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#151515] bg-gray-700 overflow-hidden relative">
//                    <img src={`https://picsum.photos/seed/${i+50}/100`} className="w-full h-full object-cover opacity-70" />
//                  </div>
//                ))}
//                <div className="w-8 h-8 rounded-full border-2 border-[#151515] bg-black/80 backdrop-blur-md flex items-center justify-center z-10">
//                  <span className="text-white text-[10px] font-bold">+4</span>
//                </div>
//            </div>
//         </div>
//       )}
//     </div>
//   );
// };
