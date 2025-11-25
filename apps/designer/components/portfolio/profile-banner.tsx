
import React from 'react';
import { User } from './types';
import { Button } from '@workspace/ui/components/button';
import { Image as ImageIcon } from 'lucide-react';

interface ProfileBannerProps {
  user: User;
  isEditable: boolean;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({ user, isEditable }) => {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-72 bg-[#1a1a1a] rounded-xl overflow-hidden group border border-gray-800/50">
      {user.bannerUrl ? (
        <img 
          src={user.bannerUrl} 
          alt="Banner" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#151515] text-gray-600 gap-2">
           {/* Empty State Pattern */}
           <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center opacity-20">
             <ImageIcon size={24} />
           </div>
        </div>
      )}

      {/* Overlay Actions (Only in Edit Mode) */}
      {isEditable && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-3">
              <Button className="bg-white text-black hover:bg-gray-200 font-bold text-xs px-6 rounded-full h-9">
                BANNER GUIDE
              </Button>
              <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-bold uppercase text-xs px-6 rounded-full h-9">
                Upload
              </Button>
            </div>
            <p className="text-gray-400 text-[10px] mt-1 font-medium tracking-wide">(Optimal Image Size: 1920*400 pixels)</p>
          </div>
        </div>
      )}

      {/* 'More' Bubbles - Bottom Right (Decoration from screenshot) */}
      {!isEditable && (
        <div className="absolute bottom-4 right-4 flex items-center animate-in fade-in duration-700 delay-300">
           <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-[#151515] bg-gray-700 overflow-hidden relative">
                   <img src={`https://picsum.photos/seed/${i+50}/100`} className="w-full h-full object-cover opacity-70" />
                 </div>
               ))}
               <div className="w-8 h-8 rounded-full border-2 border-[#151515] bg-black/80 backdrop-blur-md flex items-center justify-center z-10">
                 <span className="text-white text-[10px] font-bold">+4</span>
               </div>
           </div>
        </div>
      )}
    </div>
  );
};
