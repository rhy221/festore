import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button"; // Giữ lại button của bạn
import { ArrowRight, ShoppingBag, Instagram, Twitter, Facebook, Sparkles } from "lucide-react";
import NavBar from "@/components/NavBar"; // Import Navbar của bạn

// --- FONT CONFIG ---
import { VT323, Montserrat } from "next/font/google";
const fontPixel = VT323({ weight: "400", subsets: ["latin"] });
const fontMain = Montserrat({ subsets: ["latin"] });

const Footer = () => {
  return (
   <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="col-span-1 md:col-span-1">
              <h2 className={`${fontPixel.className} text-4xl mb-4`}>HHCLOSET</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                The world's premier marketplace for digital fashion assets. Wear the future.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Marketplace</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">All Products</li>
                <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
                <li className="hover:text-white cursor-pointer transition-colors">Digital Wearables</li>
                <li className="hover:text-white cursor-pointer transition-colors">Accessories</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Creators</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Join the Movement</h4>
              <div className="flex gap-2 mb-4">
                 <input 
                    type="email" 
                    placeholder="Enter email" 
                    className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:border-purple-500"
                 />
                 <button className="bg-white text-black p-2 rounded-lg hover:bg-gray-200">
                    <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
              <div className="flex gap-4">
                 <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                 <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                 <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2024 HHCloset. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <span>Privacy Policy</span>
               <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer