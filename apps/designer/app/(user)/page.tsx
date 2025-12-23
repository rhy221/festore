"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button"; // Giữ lại button của bạn
import { ArrowRight, ShoppingBag, Instagram, Twitter, Facebook, Sparkles } from "lucide-react";
import NavBar from "@/components/NavBar"; // Import Navbar của bạn

// --- FONT CONFIG ---
import { VT323, Montserrat } from "next/font/google";
const fontPixel = VT323({ weight: "400", subsets: ["latin"] });
const fontMain = Montserrat({ subsets: ["latin"] });

export default function Home() {
  // --- 3D HOVER EFFECT LOGIC ---
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className={`min-h-screen bg-[#F3F4F6] text-black ${fontMain.className} selection:bg-purple-200`}>
      
      {/* --- BACKGROUND GRID PATTERN --- */}
      <div
    className="fixed inset-0 z-0 pointer-events-none opacity-50"
    style={{
        backgroundImage: `
          linear-gradient(#9ca3af 1px, transparent 1px), 
          linear-gradient(90deg, #9ca3af 1px, transparent 1px)
        `,
        backgroundSize: '4rem 4rem',
        // Mẹo nhỏ: thêm filter blur nhẹ trực tiếp vào style nếu muốn lưới mềm hơn nữa
        // filter: 'blur(0.5px)' 
    }}
  ></div>

  {/* Lớp 2: Noise Texture phủ lên trên (Tạo độ nhám, chiều sâu) */}
  <div 
    className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
    style={{
        // Sử dụng một ảnh noise pattern nhỏ base64 hoặc url tệp noise
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        
    }}
  ></div>

     
      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-6">
        
        {/* --- HERO SECTION --- */}
        {/* 1. Giảm chiều cao: min-h-[500px] lg:h-[650px] */}
        {/* 2. Căn đáy: items-end (để ảnh nhân vật chạm đáy) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[500px] lg:h-[650px] items-end">
          
          {/* 1. LEFT CONTENT (Title) */}
          {/* Thêm self-center để nội dung chữ vẫn nằm giữa theo chiều dọc */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-20 order-1 lg:order-1 self-center pb-10 lg:pb-0">
            {/* Small Label */}
            {/* <div className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
              [LAB]PROJECT_002
            </div> */}

            {/* Main Pixel Title - Giảm size chữ một chút cho cân đối */}
            <h1 className={`${fontPixel.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] uppercase mb-5`}>
              Redefining <br />
              Fashion in the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Digital Era
              </span>
            </h1>

            <p className="max-w-md text-gray-600 text-sm md:text-base mb-8 font-medium">
              Step into a new realm of fashion with our collection of digital clothes, 
              where imagination meets technology.
            </p>

            {/* Category Cards */}
            {/* <div className="flex gap-4 mt-2">
              {['WOMEN', 'MEN'].map((item) => (
                <div key={item} className="group relative w-28 h-28 sm:w-36 sm:h-36 bg-purple-100/50 rounded-2xl border border-white shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden flex items-end p-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-blue-200/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="font-bold text-xs sm:text-sm tracking-wide z-10 group-hover:translate-x-1 transition-transform">{item}</span>
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-black opacity-20"></div>
                </div>
              ))}
            </div> */}

            {/* Main CTA */}
            <div className="mt-8">
               <Link href="/store">
                  <Button className="rounded-full px-8 py-6 text-base font-bold bg-black text-white hover:bg-gray-800 hover:scale-105 transition-transform shadow-xl">
                    EXPLORE 
                  </Button>
               </Link>
            </div>
          </div>

          {/* 2. CENTER/RIGHT IMAGE (3D Hover Character) */}
          {/* Căn chỉnh lại chiều cao và vị trí */}
          <div 
            className="lg:col-span-5 relative h-[450px] lg:h-full flex items-end justify-center order-2 lg:order-2 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
             {/* Decorative Background - Đẩy xuống dưới một chút */}
             <div className="absolute bottom-10 w-[280px] h-[280px] bg-purple-300 rounded-full blur-[80px] opacity-40 animate-pulse"></div>

             {/* 3D Container - Giữ nguyên logic */}
             <div 
                className="relative w-full h-full flex items-end justify-center transition-transform duration-100 ease-out will-change-transform"
                style={{
                  transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
                  transformOrigin: 'bottom center' // Quan trọng: Xoay từ gốc dưới để chân không bị trượt
                }}
             >
                {/* Character Image */}
                {/* Tăng kích thước tương đối và loại bỏ khoảng trống thừa */}
                <div className="relative w-full h-full max-h-[650px] z-30 drop-shadow-2xl flex items-end justify-center">
                    <div className="relative w-[320px] h-[420px] sm:w-[450px] sm:h-[550px] lg:w-[550px] lg:h-full">
                        <Image
                            src="/home_bg1.png"
                            alt="3D Character"
                            fill
                            className="object-contain object-bottom" // Căn ảnh xuống đáy container
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    
                    {/* Floating Tag */}
                    <div className="absolute bottom-[20%] -left-4 sm:left-4 bg-green-400 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded rotate-[-10deg] shadow-lg animate-bounce">
                      NEW ARRIVAL
                    </div>
                </div>
             </div>

            <div className="absolute -right-4 lg:-right-8 bottom-16 lg:bottom-24 z-40 bg-black/95 backdrop-blur-sm text-white p-5 rounded-2xl w-64 shadow-2xl border border-white/10 transform transition-transform hover:-translate-y-2">
  
  {/* Header: Tiêu đề + Icon trang trí */}
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-lg font-bold">Be a Creator</h3>
    <div className="bg-purple-500/20 p-1.5 rounded-lg">
      <Sparkles className="w-3 h-3 text-purple-400" />
    </div>
  </div>

  {/* Description */}
  <p className="text-gray-400 text-[11px] mb-4 leading-relaxed">
    Upload your digital fashion assets & start earning royalties today.
  </p>
  
  {/* Action Button: Dẫn đến trang đăng ký */}
  <Link href="/auth/register" className="block">
    <div className="group flex items-center justify-between bg-white text-black p-3 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
      <div className="flex flex-col">
        <span className="text-xs font-bold">Join Us</span>
        <span className="text-[9px] text-gray-500">Start selling now</span>
      </div>
      <div className="bg-black text-white rounded-full p-1.5 group-hover:translate-x-1 transition-transform">
         <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  </Link>

</div>
          </div>

        </div>

        {/* --- DECORATIVE ELEMENTS (Crosshairs) --- */}
        <div className="absolute top-40 left-10 text-gray-300 text-2xl font-thin">+</div>
        <div className="absolute bottom-20 right-10 text-gray-300 text-2xl font-thin">+</div>
        <div className="absolute top-20 right-1/3 text-gray-300 text-2xl font-thin">+</div>

      </main>

      {/* --- FOOTER --- */}
      
    </div>
  );
}
// // type Modal = {
// //   id: string;
// //   name: string;
// //   thumbUrl: string;
// // }

// // let modals: Modal[] = 
// // [
// //   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// //   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// //   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// //   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// //   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// //   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// //   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// //   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// // ]


// // function Modal({name, thumbUrl}: Modal) {
// //   return (
// //       <Card className="overflow-hidden py-0 ">
// //         <div className="flex flex-col">
// //           <div className="relative w-full h-40">
// //             <Image src={thumbUrl} alt="Thumb" fill/>
// //           </div>
// //           <div className="px-4 py-2">
// //             <h3>{name}</h3>
// //           </div>
// //         </div>
// //       </Card>    
// //   )
// // }

// // function ModalListing({modals}: {modals:Modal[]})
// // {
// //   return (
// //     <div className="grid grid-cols-4 grid-flow-row gap-4 w-full">
// //       {modals.map((m, index) => (
// //         <Modal key={index} {...m}/>
// //       ))}
// //     </div>
// //   )
// // }

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@workspace/ui/components/button";
// import { ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";
// import NavBar from "@/components/NavBar";

// // --- FONT CONFIG ---
// import { VT323, Montserrat } from "next/font/google";
// const fontPixel = VT323({ weight: "400", subsets: ["latin"] });
// const fontMain = Montserrat({ subsets: ["latin"] });

// export default function Home() {
//   // --- 3D HOVER EFFECT LOGIC (Optional, giữ lại nếu muốn kết hợp) ---
//   const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     // ... (logic xoay cũ, có thể giữ hoặc bỏ tùy bạn)
//   };
//   const handleMouseLeave = () => {
//      setRotate({ x: 0, y: 0 });
//   };

//   return (
//     <div className={`min-h-screen bg-[#F3F4F6] text-black ${fontMain.className} selection:bg-purple-200`}>
      
//       <style jsx global>{`
//   /* Animation Glitch Layer 1 (Màu đỏ/cyan) */
//   @keyframes glitch-anim-1 {
//     0% { clip-path: inset(20% 0 80% 0); transform: translate(-10px, 5px); }
//     20% { clip-path: inset(60% 0 10% 0); transform: translate(10px, -5px); }
//     40% { clip-path: inset(40% 0 50% 0); transform: translate(-10px, 10px); }
//     60% { clip-path: inset(80% 0 5% 0); transform: translate(10px, -10px); }
//     80% { clip-path: inset(10% 0 70% 0); transform: translate(-5px, 5px); }
//     100% { clip-path: inset(30% 0 20% 0); transform: translate(5px, -5px); }
//   }

//   /* Animation Glitch Layer 2 (Màu xanh/magenta) */
//   @keyframes glitch-anim-2 {
//     0% { clip-path: inset(10% 0 60% 0); transform: translate(10px, -5px); }
//     20% { clip-path: inset(30% 0 20% 0); transform: translate(-10px, 5px); }
//     40% { clip-path: inset(70% 0 10% 0); transform: translate(10px, -10px); }
//     60% { clip-path: inset(20% 0 50% 0); transform: translate(-10px, 10px); }
//     80% { clip-path: inset(50% 0 30% 0); transform: translate(5px, -5px); }
//     100% { clip-path: inset(0% 0 90% 0); transform: translate(-5px, 5px); }
//   }
  
//   /* Khi hover: Hiện layer glitch và chạy animation */
//   .glitch-container:hover .glitch-layer-1 {
//     opacity: 1 !important;
//     animation: glitch-anim-1 0.3s infinite linear alternate-reverse;
//   }
//   .glitch-container:hover .glitch-layer-2 {
//     opacity: 1 !important;
//     animation: glitch-anim-2 0.3s infinite linear alternate-reverse;
//   }
  
//   /* Khi hover: Ảnh gốc hơi mờ đi và rung nhẹ để tạo cảm giác nhiễu */
//   .glitch-container:hover .glitch-main {
//      filter: brightness(1.1) contrast(1.2); /* Tăng tương phản */
//      transform: scale(1.01);
//   }
// `}</style>

//       {/* --- BACKGROUND PATTERN --- */}
//       <div
//         className="fixed inset-0 z-0 pointer-events-none opacity-50"
//         style={{
//             backgroundImage: `
//               linear-gradient(#9ca3af 1px, transparent 1px), 
//               linear-gradient(90deg, #9ca3af 1px, transparent 1px)
//             `,
//             backgroundSize: '4rem 4rem',
//         }}
//       ></div>

//       {/* --- NAVBAR --- */}
//       <div className="sticky top-0 z-50 w-full bg-[#F3F4F6]/80 backdrop-blur-md border-b border-gray-200">
//         <NavBar />
//       </div>

//       <main className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-6">
        
//         {/* --- HERO SECTION --- */}
//         <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[500px] lg:h-[650px] items-end">
          
//           {/* 1. LEFT CONTENT */}
//           <div className="lg:col-span-7 flex flex-col justify-center relative z-20 order-1 lg:order-1 self-center pb-10 lg:pb-0">
//             <div className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
//               [LAB]PROJECT_002
//             </div>

//             <h1 className={`${fontPixel.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] uppercase mb-5`}>
//               Redefining <br />
//               Fashion in the <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
//                 Digital Era
//               </span>
//             </h1>

//             <p className="max-w-md text-gray-600 text-sm md:text-base mb-8 font-medium">
//               Step into a new realm of fashion with our collection of digital clothes, 
//               where imagination meets technology.
//             </p>

//             {/* Category Cards */}
//             <div className="flex gap-4 mt-2">
//               {['WOMEN', 'MEN'].map((item) => (
//                 <div key={item} className="group relative w-28 h-28 sm:w-36 sm:h-36 bg-purple-100/50 rounded-2xl border border-white shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden flex items-end p-3">
//                   <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-blue-200/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                   <span className="font-bold text-xs sm:text-sm tracking-wide z-10 group-hover:translate-x-1 transition-transform">{item}</span>
//                   <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-black opacity-20"></div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8">
//                <Link href="/explore">
//                   <Button className="rounded-full px-8 py-6 text-base font-bold bg-black text-white hover:bg-gray-800 hover:scale-105 transition-transform shadow-xl">
//                     EXPLORE COLLECTION
//                   </Button>
//                </Link>
//             </div>
//           </div>

//           {/* 2. CENTER/RIGHT IMAGE (GLITCH EFFECT) */}
//           <div className="lg:col-span-5 relative h-[500px] lg:h-full flex flex-col justify-end items-center order-2 lg:order-2">
             
//              {/* Decorative Background */}
//              <div className="absolute bottom-20 w-[300px] h-[300px] bg-purple-300 rounded-full blur-[90px] opacity-40 animate-pulse pointer-events-none"></div>

//            {/* GLITCH CONTAINER */}
// <div className="relative w-full h-full flex flex-col justify-end items-center glitch-container group cursor-pointer">
  
//   {/* Character Image Wrapper */}
//   <div className="relative w-full h-[90%] lg:h-full z-30 drop-shadow-2xl flex items-end justify-center">
//       <div className="relative w-[340px] h-[460px] sm:w-[480px] sm:h-[600px] lg:w-[600px] lg:h-full">
          
//           {/* LAYER 1: Red/Cyan Glitch (Đã đưa lên z-40) */}
//           <div className="glitch-layer-1 absolute inset-0 z-40 opacity-0 mix-blend-exclusion pointer-events-none">
//                 <Image
//                   src="/home_bg1.png"
//                   alt="Glitch Layer 1"
//                   fill
//                   className="object-contain object-bottom filter hue-rotate-90 opacity-90" 
//                   priority
//               />
//           </div>

//           {/* LAYER 2: Blue/Magenta Glitch (Đã đưa lên z-50) */}
//           <div className="glitch-layer-2 absolute inset-0 z-50 opacity-0 mix-blend-exclusion pointer-events-none">
//                 <Image
//                   src="/home_bg1.png"
//                   alt="Glitch Layer 2"
//                   fill
//                   className="object-contain object-bottom filter hue-rotate-180 opacity-90"
//                   priority
//               />
//           </div>

//           {/* LAYER 3: MAIN IMAGE (z-30, nằm dưới 2 layer kia) */}
//           <Image
//               src="/home_bg1.png"
//               alt="3D Character"
//               fill
//               className="object-contain object-bottom glitch-main transition-all duration-100 relative z-30"
//               priority
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           />
//       </div>
      
//       {/* Floating Tag */}
//       <div className="absolute bottom-[15%] -left-2 sm:left-4 bg-green-400 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded rotate-[-10deg] shadow-lg group-hover:animate-ping z-[60]">
//         GLITCH MODE
//       </div>
//   </div>
// </div>

//              {/* Floating Stats Card (Giữ nguyên) */}
//              <div className="absolute -right-4 lg:-right-8 bottom-16 lg:bottom-24 z-40 bg-black text-white p-5 rounded-2xl w-56 shadow-2xl transform transition-transform hover:-translate-y-2">
//                 <div className="flex justify-between items-start mb-1">
//                     <h3 className="text-3xl font-bold">3K+</h3>
//                     <div className="text-[9px] border border-gray-600 rounded-full px-1.5 py-0.5">R</div>
//                 </div>
//                 <p className="text-gray-400 text-[10px] mb-3">Happy Clients worldwide</p>
                
//                 <div className="flex items-center gap-2 bg-gray-800/50 p-1.5 rounded-lg">
//                    <div className="flex -space-x-2">
//                       {[1,2,3].map(i => (
//                         <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 border-2 border-black"></div>
//                       ))}
//                    </div>
//                    <ArrowRight className="w-3 h-3 text-white ml-auto" />
//                 </div>
//              </div>
//           </div>

//         </div>

//         {/* ... (DECORATIVE ELEMENTS) ... */}
//          <div className="absolute top-40 left-10 text-gray-300 text-2xl font-thin">+</div>
//          <div className="absolute bottom-20 right-10 text-gray-300 text-2xl font-thin">+</div>
//          <div className="absolute top-20 right-1/3 text-gray-300 text-2xl font-thin">+</div>

//       </main>

//       {/* --- FOOTER --- */}
//       <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800 relative z-20">
//          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
//                <div className="col-span-1 md:col-span-1">
//                   <h2 className={`${fontPixel.className} text-4xl mb-4`}>DI.THREADS</h2>
//                   <p className="text-gray-400 text-sm leading-relaxed">The world's premier marketplace for digital fashion assets.</p>
//                </div>
//                {/* ... (Các cột khác của footer giữ nguyên) ... */}
//                <div>
//                   <h4 className="font-bold mb-4 text-lg">Marketplace</h4>
//                   <ul className="space-y-2 text-gray-400 text-sm">
//                      <li>All Products</li>
//                   </ul>
//                </div>
//                <div>
//                   <h4 className="font-bold mb-4 text-lg">Company</h4>
//                   <ul className="space-y-2 text-gray-400 text-sm">
//                      <li>About Us</li>
//                   </ul>
//                </div>
//                <div>
//                   <h4 className="font-bold mb-4 text-lg">Newsletter</h4>
//                   <div className="flex gap-2">
//                       <input type="email" placeholder="Email" className="bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm w-full" />
//                       <button className="bg-white text-black p-2 rounded-lg"><ArrowRight className="w-4 h-4" /></button>
//                   </div>
//                </div>
//             </div>
//             <div className="border-t border-gray-800 pt-8 flex justify-between text-xs text-gray-500">
//                <p>&copy; 2024 Di.Threads.</p>
//             </div>
//          </div>
//       </footer>
//     </div>
//   );
// }
