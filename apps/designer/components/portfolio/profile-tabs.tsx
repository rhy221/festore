"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

interface ProfileTabsProps {
  userId: string; // Cần userId để tạo link đúng (ví dụ: /portfolio/123/info)
}

export function ProfileTabs({ userId }: ProfileTabsProps){
  const pathname = usePathname();

  // Định nghĩa các tabs và đường dẫn tương ứng
  const tabs = [
    { id: 'INFO', label: 'INFO', href: `/portfolio/${userId}/infor`, locked: false },
    { id: 'MODELS', label: 'MODELS', href: `/portfolio/${userId}/models`, locked: false },
    { id: 'FOLLOWING', label: 'FOLLOWING', href: `/portfolio/${userId}/following`, locked: false }, 
    { id: 'LIKES', label: 'LIKES', href: `/portfolio/${userId}/likes`, locked: false },
  ];

  return (
    <div className="w-full border-b border-gray-800 mt-12 mb-8">
      <div className="flex gap-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          // Kiểm tra xem tab này có đang active không
          const isActive = pathname === tab.href;

          // Class chung cho cả Button (locked) và Link (active)
          const baseClasses = "relative pb-4 text-sm font-bold tracking-widest uppercase transition-colors flex items-center gap-2 whitespace-nowrap";
          
          // Xử lý logic hiển thị Locked
          if (tab.locked) {
            return (
              <div
                key={tab.id}
                className={cn(
                  baseClasses,
                  "text-gray-600 cursor-not-allowed opacity-50"
                )}
              >
                {tab.label}
                <Lock size={12} />
              </div>
            );
          }

          // Render Link cho các tab hoạt động
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                baseClasses,
                isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300',
                'cursor-pointer'
              )}
            >
              {tab.label}
              
              {/* Active Indicator (Dấu gạch chân) */}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-in fade-in zoom-in duration-300"></span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};



// import React from 'react';
// import { Lock } from 'lucide-react';

// interface ProfileTabsProps {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
// }

// export const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
//   const tabs = [
//     { id: 'INFO', label: 'INFO', locked: false },
//     { id: 'COLLECTIONS', label: 'COLLECTIONS', locked: false },
//     { id: 'BOARD', label: 'BOARD', locked: false },
//     { id: 'LIKES', label: 'LIKES', locked: false },
//   ];

//   return (
//     <div className="w-full border-b border-gray-800 mt-12 mb-8">
//       <div className="flex gap-8 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => !tab.locked && onTabChange(tab.id)}
//             className={`
//               relative pb-4 text-sm font-bold tracking-widest uppercase transition-colors flex items-center gap-2 whitespace-nowrap
//               ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
//               ${tab.locked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
//             `}
//           >
//             {tab.label}
//             {tab.locked && <Lock size={12} />}
//             {activeTab === tab.id && (
//               <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };