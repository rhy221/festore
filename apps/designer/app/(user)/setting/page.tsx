
import React from 'react';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { KeyRound } from 'lucide-react';

export default function ProfileSettingPage() {
  return (
    <div className="min-h-screen pb-20 pt-8 px-4 lg:px-12 max-w-6xl mx-auto">
      <h1 className="text-sm font-bold tracking-widest uppercase text-white mb-8 border-b border-gray-800 pb-4">
        My Page
      </h1>

      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* 1. Identity Section */}
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-[#1a1a1a] ring-4 ring-[#1a1a1a] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&h=400&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="w-full max-w-xs text-center">
            <input 
              type="text" 
              defaultValue="ghuy9366"
              className="w-full bg-transparent border-b border-gray-500 text-center text-xl text-white pb-2 focus:border-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* 2. Credentials Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Box */}
          <div className="bg-[#121212] p-8 rounded-sm border border-gray-800/50 flex flex-col justify-center h-32">
             <span className="text-[10px] font-bold uppercase tracking-wider text-white mb-2">E-mail</span>
             <span className="text-gray-300">ghuy9366@gmail.com</span>
          </div>

          {/* Password Box */}
          <div className="bg-[#121212] p-8 rounded-sm border border-gray-800/50 flex items-center justify-between h-32 relative group">
             <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white mb-2">Password</span>
                <span className="text-gray-300 text-2xl leading-none mt-1">••••••••</span>
             </div>
             
             <Button variant="outline" size="sm" className="rounded-full px-6 h-8 gap-2 text-[10px] font-bold uppercase border-gray-600 hover:border-white">
               <KeyRound size={12} /> Set
             </Button>

             {/* Blue Tooltip */}
             <div className="absolute top-full right-0 mt-4 w-72 bg-[#0055ff] text-white text-xs p-4 rounded shadow-xl z-10 before:content-[''] before:absolute before:-top-2 before:right-8 before:border-8 before:border-transparent before:border-b-[#0055ff]">
                Set up a password if you want to sign in <span className="font-bold text-[#00c7d3]">CLO-SET</span> with the registered email address that's paired with a software account.
             </div>
          </div>
        </div>

        {/* 3. Notification Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
             <h2 className="text-xs font-bold tracking-widest uppercase text-white">Notification</h2>
             <span className="text-xs font-bold text-white">E-mail</span>
          </div>

          <div className="divide-y divide-gray-800 border-b border-gray-800">
            
            {/* Store Row */}
            <div className="py-6 flex items-start justify-between gap-8">
               <div className="space-y-2 max-w-2xl">
                  <h3 className="font-bold text-white text-sm">Store</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Notify on Pending result for paid item, seller registration, etc. Notify on sold items, order request for view-only items, original copyright and payout/refund information.
                  </p>
               </div>
               <div className="pt-1">
                 <Checkbox checked={true} />
               </div>
            </div>

            {/* Newsletter Row */}
            <div className="py-6 flex items-start justify-between gap-8">
               <div className="space-y-2 max-w-2xl">
                  <h3 className="font-bold text-white text-sm">Newsletter</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    I agree to receive newsletters including updates, offers, and events.
                  </p>
                  <p className="text-gray-600 text-[10px] mt-1">
                    Nov 5, 2025 Declined
                  </p>
               </div>
               <div className="pt-1">
                 <Checkbox checked={false} />
               </div>
            </div>

          </div>
          
          <div className="bg-[#121212] p-4 rounded text-[10px] text-gray-500 leading-relaxed">
            * We will send important business updates such as 'updating our Terms of Service, scheduling service maintenance, issuing receipts, and when a new version is available among your purchased items' regardless of your consent to each notification preference.
          </div>
        </div>

        {/* 4. Delete Account Section */}
        <div className="pt-10 border-t border-gray-800">
           <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-2">Delete Account</h3>
           <p className="text-white text-sm font-bold mb-6">
             If you no longer require access to your account, you can permanently delete it.
           </p>
           <Button className="bg-white text-black hover:bg-gray-200 font-bold text-xs px-8 h-10 rounded-full tracking-wide uppercase">
             Delete My Account
           </Button>
        </div>

      </div>
    </div>
  );
};
