import React from 'react';
import { Lock } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'INFO', label: 'INFO', locked: false },
    { id: 'COLLECTIONS', label: 'COLLECTIONS', locked: false },
    { id: 'GAMEWEAR', label: 'GAMEWEAR', locked: true },
    { id: 'BOARD', label: 'BOARD', locked: false },
    { id: 'LIKES', label: 'LIKES', locked: false },
  ];

  return (
    <div className="w-full border-b border-gray-800 mt-12 mb-8">
      <div className="flex gap-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.locked && onTabChange(tab.id)}
            className={`
              relative pb-4 text-sm font-bold tracking-widest uppercase transition-colors flex items-center gap-2 whitespace-nowrap
              ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              ${tab.locked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
          >
            {tab.label}
            {tab.locked && <Lock size={12} />}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};