"use client"
import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Info, Smile } from 'lucide-react';

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState<'ORDER' | 'PAYOUT' | 'INFO'>('ORDER');

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white container mx-auto px-40 py-12 ">
      {/* Main Tabs */}
      <div className="flex gap-8 mb-10">
        {['ORDER', 'PAYOUT', 'INFO'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`text-xl font-bold tracking-wider transition-colors ${
              activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'ORDER' && <OrderTab />}
      {activeTab === 'PAYOUT' && <PayoutTab />}
      {activeTab === 'INFO' && <div className="text-gray-500 p-8 text-center">Info Content Placeholder</div>}
    </div>
  );
};

const OrderTab: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* Filter Section */}
      <div className="bg-[#121212] border border-gray-800/50 rounded p-6 space-y-6">
        {/* Row 1: Keyword */}
        <div className="space-y-2">
          <label className="text-xs text-gray-400 font-bold">Keyword</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Order ID, Item Name" 
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>

        <div className="h-[1px] bg-gray-800 w-full" />

        {/* Row 2: Filters */}
        <div className="flex flex-col md:flex-row gap-6 items-end relative">
          <div className="space-y-2 flex-1">
            <label className="text-xs text-gray-400 font-bold">Date (UTC)</label>
            <div className="relative">
              <div className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-4 py-3 text-sm text-gray-300 flex items-center justify-between cursor-pointer hover:border-gray-500">
                <span>Nov 1, 2025 - Nov 21, 2025</span>
                <Calendar size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          <div className="space-y-2 w-full md:w-40">
            <label className="text-xs text-gray-400 font-bold">Store</label>
            <div className="relative">
              <div className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-4 py-3 text-sm text-primary flex items-center justify-between cursor-pointer">
                <span>All</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="space-y-2 w-full md:w-40">
             <label className="text-xs text-gray-400 font-bold">Paid Option</label>
             <div className="relative">
              <div className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-4 py-3 text-sm text-primary flex items-center justify-between cursor-pointer">
                <span>All</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

           <div className="flex items-center gap-4 ml-auto pb-1">
              <button className="text-xs font-bold text-white hover:text-gray-300 uppercase">Reset</button>
              <button className="text-white hover:text-primary transition-colors">
                <Search size={24} />
              </button>
           </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-[#202022] rounded p-8 flex gap-12 items-center">
         <div>
            <p className="text-xs text-gray-500 font-bold mb-1">Items</p>
            <p className="text-xl font-bold">0</p>
         </div>
         <div>
            <p className="text-xs text-gray-500 font-bold mb-1">Sales</p>
            <p className="text-xl font-bold">$0.00</p>
         </div>
      </div>

      {/* Table Section */}
      <div>
         <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2 border-b border-gray-600 pb-1 cursor-pointer">
               <span className="text-sm">20</span>
               <ChevronDown size={14} />
            </div>
         </div>

         <div className="w-full">
            {/* Header */}
            <div className="flex items-center border-y border-gray-700 py-4 text-xs font-bold text-white">
               <div className="w-20 pl-4">No.</div>
               <div className="flex-1 flex items-center gap-2">
                 Item Information / Use Cases
                 <Info size={12} className="text-gray-500" />
               </div>
               <div className="w-40 text-right">Revenue</div>
               <div className="w-40 text-right pr-4">Date (UTC)</div>
            </div>

            {/* Empty State Row */}
            <div className="py-12 text-center text-gray-600 text-sm border-b border-gray-800">
               No data available
            </div>
         </div>
      </div>
    </div>
  );
};

const PayoutTab: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-10">
       {/* Top Cards */}
       <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          
          {/* Total Card */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded p-6 flex flex-col justify-between h-40">
             <div>
               <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-lg">Total</h3>
                  <span className="text-[10px] text-gray-500">Payout up to the previous month.</span>
               </div>
               <p className="text-xs text-gray-500 font-bold mt-4 mb-1">Amount</p>
               <p className="text-2xl font-medium">$0.00</p>
             </div>
          </div>

          {/* Current Range Card */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded p-6 h-40">
             <div className="flex items-center gap-2 mb-6">
               <span className="text-primary font-bold text-sm">Oct 1, 2025 ~ Oct 31, 2025</span>
               <span className="text-[10px] text-gray-500">Expected Revenue for this month.</span>
             </div>

             <div className="flex gap-12 items-start">
                <div>
                  <p className="text-xs text-white font-bold mb-1">Expected Amount</p>
                  <p className="text-xl font-medium">$0.00</p>
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                         <p className="text-xs text-white font-bold mb-1">Expected Payout Date</p>
                         <p className="text-sm text-gray-400">-</p>
                      </div>
                      <div className="text-right">
                         <div className="flex justify-between text-[10px] text-gray-500 w-64 mb-1">
                            <span>$0.00</span>
                            <span>$50.00</span>
                         </div>
                         <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-500 w-0"></div>
                         </div>
                         <p className="text-[10px] text-gray-500 mt-1">Paid when expected amount is $50.00 or more</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* List Section */}
       <div>
          <p className="text-xs text-gray-400 mb-4">Total: 0</p>
          <div className="w-full">
              {/* Header */}
              <div className="flex items-center border-y border-gray-700 py-4 text-xs font-bold text-white">
                 <div className="w-1/4 pl-4">Payout Date</div>
                 <div className="w-1/4">Period</div>
                 <div className="w-1/4 text-right">Amount</div>
                 <div className="w-1/4 text-right pr-4">Detail</div>
              </div>

              {/* Empty State Placeholder */}
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                  {/* Custom Icon resembling the screenshot */}
                  <div className="w-12 h-12 border-2 border-white rounded-lg flex items-end justify-center pb-2 relative">
                      <div className="w-1 h-3 bg-white absolute top-2"></div>
                      <div className="w-6 h-3 border-b-2 border-white rounded-full"></div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};
