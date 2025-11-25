import React from 'react';
import { Settings } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-[#27272a] py-4 px-8 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-wider">
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white flex items-center gap-1">
            Cookies <Settings size={12} />
          </a>
          <a href="#" className="hover:text-white">Help Center</a>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="hover:text-white">English ▼</button>
        </div>
      </div>
    </footer>
  );
};
