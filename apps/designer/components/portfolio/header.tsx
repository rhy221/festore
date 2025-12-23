import React from 'react';
import { ShoppingCart, Bell, Grid, Upload, Search } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f0f10] border-b border-[#27272a] h-16 flex items-center px-4 lg:px-8">
      <div className="flex items-center gap-8 flex-1">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 font-bold text-2xl tracking-tighter">
          <span className="text-primary">CO</span>
          <span className="text-white">NNECT</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Store</a>
          <a href="#" className="hover:text-white transition-colors">Gallery</a>
          <a href="#" className="hover:text-white transition-colors">Contest</a>
          <a href="#" className="hover:text-white transition-colors">Community</a>
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            Apps <span className="text-[10px] opacity-50">▼</span>
          </button>
          <div className="h-4 w-[1px] bg-gray-700 mx-2"></div>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Gamewear <span className="text-[10px]">↗</span>
          </a>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button variant="default" size="sm" className="hidden sm:inline-flex font-bold">
          UPLOAD
        </Button>
        
        <div className="flex items-center gap-4 text-gray-400">
          <button className="hover:text-white relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-gray-700 text-[10px] text-white w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </button>
          <button className="hover:text-white">
            <Bell size={20} />
          </button>
          
          {/* User Avatar Tiny */}
          <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden border border-gray-700 cursor-pointer">
             <img src="https://picsum.photos/id/64/100/100" alt="User" className="w-full h-full object-cover" />
          </div>
          
          <button className="hover:text-white">
            <Grid size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};