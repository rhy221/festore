// 'use client';

// import { useState, useRef } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
// import { Button } from '@workspace/ui/components/button';
// import { Shirt, User, Sparkles, Upload, ArrowRight, CheckCircle2, ImageIcon, RotateCcw } from 'lucide-react';
// import { cn } from '@workspace/ui/lib/utils';
// import { useMutation } from '@tanstack/react-query';
// import http from '@/lib/http'; 
// import { Skeleton } from '@workspace/ui/components/skeleton';
// import toast from 'react-hot-toast';

// interface VirtualTryOnModalProps {
//   productImages: string[];
//   productTitle: string;
//   categorySlug: string; 
// }
// const supportedCategories = ['tops', 'bottoms', 'full-body'];

// export function VirtualTryOnModal({ 
//   productImages, 
//   productTitle, 
//   categorySlug 
// }: VirtualTryOnModalProps) {  const [isOpen, setIsOpen] = useState(false);
//   const isSupported = supportedCategories.includes(categorySlug);

//   // State
//   const [userImage, setUserImage] = useState<File | null>(null);
//   const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
//   // Mặc định chọn ảnh đầu tiên của sản phẩm
//   const [selectedGarmentUrl, setSelectedGarmentUrl] = useState<string>(productImages[0] || '');
//   const [resultImage, setResultImage] = useState<string | null>(null);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const tryOnMutation = useMutation({
//     mutationFn: async () => {
//       const formData = new FormData();
//       if (userImage) formData.append('personImage', userImage);
//       formData.append('garmentUrl', selectedGarmentUrl);
//         formData.append('category', categorySlug);
//       const res = await http.post('/tryon/generate', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 300000,
//       });
//       return res.data; // { imageUrl: "data:image/png;base64,..." }
//     },
//     onSuccess: (data) => {
//       setResultImage(data.imageUrl);
//       toast.success('Try-on successful!');
//     },
//     onError: (error: any) => {
//       toast.error('AI Error: ' + (error?.response?.data?.message || 'Something went wrong'));
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setUserImage(file);
//       setUserImagePreview(URL.createObjectURL(file));
//       setResultImage(null); // Reset kết quả khi upload ảnh người mới
//     }
//   };

//   const handleGarmentSelect = (url: string) => {
//     setSelectedGarmentUrl(url);
//     setResultImage(null); // Reset kết quả khi chọn áo mới
//   };

//   const resetAll = () => {
//     setUserImage(null);
//     setUserImagePreview(null);
//     setResultImage(null);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button 
//           variant="outline"
//           className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 font-bold py-6 rounded-full shadow-lg transition-all hover:scale-[1.02] group"
//         >
//           <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
//           VIRTUAL TRY-ON 
//         </Button>
//       </DialogTrigger>
      
//       <DialogContent className="max-w-6xl bg-zinc-950 border-zinc-800 text-white p-0 overflow-hidden flex flex-col h-[90vh] md:h-[700px]">
        
//         {/* Header */}
//         <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
//           <DialogHeader className="p-0">
//             <DialogTitle className="text-lg font-bold flex items-center gap-2">
//               <Sparkles className="text-violet-500 w-5 h-5" /> 
//               AI Fitting Room <span className="text-zinc-500 text-sm font-normal hidden sm:inline">| {productTitle}</span>
//             </DialogTitle>
//           </DialogHeader>
//           <Button variant="ghost" size="sm" onClick={resetAll} className="text-zinc-400 hover:text-white">
//             <RotateCcw className="w-4 h-4 mr-2" /> Reset
//           </Button>
//         </div>

//         <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
//           {/* LEFT PANEL: CONFIGURATION */}
//           <div className="w-full md:w-[400px] flex flex-col border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/20 overflow-y-auto custom-scrollbar">
//             <div className="p-6 space-y-8">
              
//               {/* 1. Upload User Image */}
//               <div className="space-y-3">
//                 <label className="text-sm font-bold text-zinc-300 flex items-center gap-2">
//                   <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white text-xs">1</span>
//                   Upload Your Photo
//                 </label>
//                 <div 
//                   onClick={() => fileInputRef.current?.click()}
//                   className={cn(
//                     "relative w-full aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden",
//                     userImagePreview 
//                       ? "border-violet-500 bg-zinc-900" 
//                       : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500"
//                   )}
//                 >
//                   {userImagePreview ? (
//                     <>
//                       <img src={userImagePreview} alt="User" className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                         <p className="text-sm font-medium text-white flex items-center gap-2">
//                           <Upload className="w-4 h-4" /> Change Photo
//                         </p>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="text-center p-4">
//                       <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
//                         <User className="w-6 h-6 text-zinc-400" />
//                       </div>
//                       <p className="text-sm text-zinc-300 font-medium">Click to upload</p>
//                       <p className="text-xs text-zinc-500 mt-1">Full body photo works best</p>
//                     </div>
//                   )}
//                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
//                 </div>
//               </div>

//               {/* 2. Select Garment from Product Images */}
//               <div className="space-y-3">
//                 <label className="text-sm font-bold text-zinc-300 flex items-center gap-2">
//                   <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white text-xs">2</span>
//                   Select Garment Style
//                 </label>
                
//                 <div className="grid grid-cols-3 gap-2">
//                   {productImages.map((img, idx) => (
//                     <div 
//                       key={idx}
//                       onClick={() => handleGarmentSelect(img)}
//                       className={cn(
//                         "relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
//                         selectedGarmentUrl === img 
//                           ? "border-violet-500 ring-2 ring-violet-500/20 opacity-100" 
//                           : "border-transparent opacity-60 hover:opacity-100"
//                       )}
//                     >
//                       <img src={img} alt={`Variant ${idx}`} className="w-full h-full object-cover" />
//                       {selectedGarmentUrl === img && (
//                         <div className="absolute top-1 right-1 bg-violet-500 rounded-full p-0.5">
//                           <CheckCircle2 className="w-3 h-3 text-white" />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </div>

//             {/* Generate Button */}
//             <div className="p-6 mt-auto border-t border-zinc-800 bg-zinc-900/50 sticky bottom-0">
//               {!isSupported ? (
//                  <div className="text-center p-3 bg-amber-900/20 border border-amber-800 rounded-lg text-amber-200 mb-3 text-sm flex items-center justify-center gap-2">
//                    <span>⚠️</span> 
//                    Virtual Try-On currently supports <b>Tops, Bottoms, and Full Body</b> only. <br/>
//                    Footwear & Accessories are not supported yet.
//                  </div>
//               ) : null}
//               <Button 
//                 onClick={() => tryOnMutation.mutate()} 
//                 disabled={!userImage || !selectedGarmentUrl || tryOnMutation.isPending}
//                 className={cn(
//                   "w-full font-bold py-6 text-base transition-all",
//                   tryOnMutation.isPending 
//                     ? "bg-zinc-800 text-zinc-400 cursor-not-allowed" 
//                     : "bg-white text-black hover:bg-zinc-200"
//                 )}
//               >
//                 {tryOnMutation.isPending ? (
//                   <span className="flex items-center gap-2">
//                     <Loader2 className="w-5 h-5 animate-spin" /> Processing AI...
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     Generate Try-On <ArrowRight className="w-5 h-5" />
//                   </span>
//                 )}
//               </Button>
//             </div>
//           </div>

//           {/* RIGHT PANEL: RESULT PREVIEW */}
//           <div className="flex-1 bg-black flex flex-col relative">
//             <div className="flex-1 flex items-center justify-center p-8">
//               {tryOnMutation.isPending ? (
//                 <div className="text-center space-y-6 max-w-sm">
//                   <div className="relative w-32 h-32 mx-auto">
//                     <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full animate-ping delay-75"></div>
//                     <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Sparkles className="w-10 h-10 text-white animate-pulse" />
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-white font-medium text-xl mb-2">Creating Magic...</h3>
//                     <p className="text-zinc-500">Gemini AI is analyzing body pose and fitting the garment. This may take 10-20 seconds.</p>
//                   </div>
//                 </div>
//               ) : resultImage ? (
//                 <div className="relative h-full w-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
//                   <img 
//                     src={resultImage} 
//                     alt="AI Result" 
//                     className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-zinc-800" 
//                   />
//                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-white border border-white/10">
//                     Generated by AI
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center text-zinc-700 select-none">
//                   <div className="w-24 h-24 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
//                     <ImageIcon className="w-10 h-10 opacity-20" />
//                   </div>
//                   <p className="text-lg font-medium text-zinc-500">Preview Area</p>
//                   <p className="text-sm text-zinc-600">Your generated image will appear here</p>
//                 </div>
//               )}
//             </div>
            
//             {resultImage && (
//               <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex justify-end gap-3">
//                 <Button variant="secondary" onClick={() => window.open(resultImage, '_blank')}>
//                   Download Image
//                 </Button>
//               </div>
//             )}
//           </div>

//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function Loader2({ className }: { className?: string }) {
//   return (
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       width="24" height="24" viewBox="0 0 24 24" 
//       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
//       className={className}
//     >
//       <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//     </svg>
//   );
// }


// 'use client';

// import { useState, useRef } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
// import { Button } from '@workspace/ui/components/button';
// import { User, Sparkles, Upload, ArrowRight, CheckCircle2, ImageIcon, RotateCcw, Download } from 'lucide-react';
// import { cn } from '@workspace/ui/lib/utils';
// import { useMutation } from '@tanstack/react-query';
// import http from '@/lib/http'; 
// import toast from 'react-hot-toast';

// interface VirtualTryOnModalProps {
//   productImages: string[];
//   productTitle: string;
//   categorySlug: string; 
// }

// const supportedCategories = ['tops', 'bottoms', 'full-body'];

// export function VirtualTryOnModal({ 
//   productImages, 
//   productTitle, 
//   categorySlug 
// }: VirtualTryOnModalProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const isSupported = supportedCategories.includes(categorySlug);

//   // State
//   const [userImage, setUserImage] = useState<File | null>(null);
//   const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
//   const [selectedGarmentUrl, setSelectedGarmentUrl] = useState<string>(productImages[0] || '');
//   const [resultImage, setResultImage] = useState<string | null>(null);
//   const [isDownloading, setIsDownloading] = useState(false);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const tryOnMutation = useMutation({
//     mutationFn: async () => {
//       const formData = new FormData();
//       if (userImage) formData.append('personImage', userImage);
//       formData.append('garmentUrl', selectedGarmentUrl);
//       formData.append('category', categorySlug);
//       const res = await http.post('/tryon/generate', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 300000,
//       });
//       return res.data; 
//     },
//     onSuccess: (data) => {
//       setResultImage(data.imageUrl);
//       toast.success('Try-on successful!');
//     },
//     onError: (error: any) => {
//       toast.error('AI Error: ' + (error?.response?.data?.message || 'Something went wrong'));
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setUserImage(file);
//       setUserImagePreview(URL.createObjectURL(file));
//       setResultImage(null);
//     }
//   };

//   const handleGarmentSelect = (url: string) => {
//     setSelectedGarmentUrl(url);
//     setResultImage(null);
//   };

//   const resetAll = () => {
//     setUserImage(null);
//     setUserImagePreview(null);
//     setResultImage(null);
//   };

//   const handleDownload = async () => {
//     if (!resultImage) return;
//     setIsDownloading(true);

//     try {
//         window.open(resultImage, '_blank');
//         const response = await fetch(resultImage);
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
        
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `try-on-${productTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
//         document.body.appendChild(link);
//         link.click();
        
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//         toast.success("Image downloaded!");
//     } catch (error) {
//         console.error("Download failed:", error);
//         toast.error("Could not auto-download. Please save the image from the new tab.");
//     } finally {
//         setIsDownloading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button 
//           variant="outline"
//           className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 font-bold py-6 rounded-full shadow-lg transition-all hover:scale-[1.02] group"
//         >
//           <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
//           VIRTUAL TRY-ON 
//         </Button>
//       </DialogTrigger>
      
//       {/* UPDATE 1: Điều chỉnh kích thước DialogContent */}
//       {/* w-[95vw]: chiếm 95% chiều rộng màn hình (fix lỗi right panel nhỏ) */}
//       {/* h-[90vh]: chiếm 90% chiều cao (fix lỗi lồi ra ngoài) */}
//       <DialogContent className="w-[95vw] max-w-[90rem] h-[90vh] p-0 gap-0 bg-zinc-950 border-zinc-800 text-white overflow-hidden flex flex-col">
        
//         {/* Header */}
//         {/* flex-shrink-0 để header không bị co lại khi màn hình thấp */}
//         <div className="p-4 pr-12 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 relative flex-shrink-0">
//           <DialogHeader className="p-0 space-y-0">
//             <DialogTitle className="text-lg font-bold flex items-center gap-2">
//               <Sparkles className="text-violet-500 w-5 h-5" /> 
//               AI Fitting Room <span className="text-zinc-500 text-sm font-normal hidden sm:inline">| {productTitle}</span>
//             </DialogTitle>
//           </DialogHeader>
          
//           <Button variant="ghost" size="sm" onClick={resetAll} className="text-zinc-400 hover:text-white hover:bg-zinc-800 mr-2">
//             <RotateCcw className="w-4 h-4 mr-2" /> Reset
//           </Button>
//         </div>

//         {/* Content Body */}
//         {/* w-full h-full overflow-hidden để nội dung nằm gọn bên trong */}
//         <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
          
//           {/* LEFT PANEL */}
//           {/* md:w-[340px]: Cố định chiều rộng vừa đủ để nhường chỗ cho Right Panel */}
//           <div className="w-full md:w-[340px] flex flex-col border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/20 flex-shrink-0 h-[40%] md:h-full">
//             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              
//               {/* 1. Upload User Image */}
//               <div className="space-y-3">
//                 <label className="text-sm font-bold text-zinc-300 flex items-center gap-2">
//                   <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white text-xs">1</span>
//                   Upload Your Photo
//                 </label>
//                 <div 
//                   onClick={() => fileInputRef.current?.click()}
//                   className={cn(
//                     "relative w-full aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden bg-zinc-900/50",
//                     userImagePreview 
//                       ? "border-violet-500" 
//                       : "border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500"
//                   )}
//                 >
//                   {userImagePreview ? (
//                     <>
//                       <img src={userImagePreview} alt="User" className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                         <p className="text-sm font-medium text-white flex items-center gap-2">
//                           <Upload className="w-4 h-4" /> Change Photo
//                         </p>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="text-center p-4">
//                       <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
//                         <User className="w-6 h-6 text-zinc-400" />
//                       </div>
//                       <p className="text-sm text-zinc-300 font-medium">Click to upload</p>
//                     </div>
//                   )}
//                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
//                 </div>
//               </div>

//               {/* 2. Select Garment */}
//               <div className="space-y-3">
//                 <label className="text-sm font-bold text-zinc-300 flex items-center gap-2">
//                   <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white text-xs">2</span>
//                   Select Garment Style
//                 </label>
//                 <div className="grid grid-cols-3 gap-2">
//                   {productImages.map((img, idx) => (
//                     <div 
//                       key={idx}
//                       onClick={() => handleGarmentSelect(img)}
//                       className={cn(
//                         "relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
//                         selectedGarmentUrl === img 
//                           ? "border-violet-500 ring-2 ring-violet-500/20 opacity-100" 
//                           : "border-transparent opacity-60 hover:opacity-100"
//                       )}
//                     >
//                       <img src={img} alt={`Variant ${idx}`} className="w-full h-full object-cover" />
//                       {selectedGarmentUrl === img && (
//                         <div className="absolute top-1 right-1 bg-violet-500 rounded-full p-0.5">
//                           <CheckCircle2 className="w-3 h-3 text-white" />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Generate Button Footer */}
//             <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900/50 sticky bottom-0 z-10">
//               {!isSupported && (
//                  <div className="text-center p-2 bg-amber-900/20 border border-amber-800 rounded-lg text-amber-200 mb-2 text-xs flex items-center justify-center gap-2">
//                    <span>⚠️</span> 
//                    <span>Supported: <b>Tops, Bottoms, Full Body</b> only.</span>
//                  </div>
//               )}
//               <Button 
//                 onClick={() => tryOnMutation.mutate()} 
//                 disabled={!userImage || !selectedGarmentUrl || tryOnMutation.isPending || !isSupported}
//                 className={cn(
//                   "w-full font-bold py-4 md:py-6 text-base transition-all",
//                   tryOnMutation.isPending || !isSupported
//                     ? "bg-zinc-800 text-zinc-400 cursor-not-allowed" 
//                     : "bg-white text-black hover:bg-zinc-200"
//                 )}
//               >
//                 {tryOnMutation.isPending ? (
//                   <span className="flex items-center gap-2">
//                     <Loader2 className="w-5 h-5 animate-spin" /> Processing...
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     Generate Try-On <ArrowRight className="w-5 h-5" />
//                   </span>
//                 )}
//               </Button>
//             </div>
//           </div>

//           {/* RIGHT PANEL: RESULT PREVIEW */}
//           {/* UPDATE 2: Dùng flex-1 và w-0 để nó chiếm toàn bộ không gian còn lại */}
//           <div className="flex-1 w-0 h-[60%] md:h-full bg-black/95 flex flex-col relative">
            
//             {/* Vùng hiển thị ảnh: Chiếm hết không gian, padding nhỏ */}
//             <div className="flex-1 w-full h-full relative overflow-hidden p-2 flex items-center justify-center">
//               {tryOnMutation.isPending ? (
//                 <div className="text-center space-y-6 max-w-sm z-10">
//                    {/* Loader UI giữ nguyên */}
//                    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
//                     <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full animate-ping delay-75"></div>
//                     <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white animate-pulse" />
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-white font-medium text-lg md:text-xl mb-2">Creating Magic...</h3>
//                     <p className="text-zinc-500 text-sm"> AI is fitting the garment.</p>
//                   </div>
//                 </div>
//               ) : resultImage ? (
//                 // UPDATE 3: Ảnh full size
//                 <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
//                   <img 
//                     src={resultImage} 
//                     alt="AI Result" 
//                     className="w-full h-full object-contain" 
//                   />
//                 </div>
//               ) : (
//                 <div className="text-center text-zinc-700 select-none">
//                   <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
//                     <ImageIcon className="w-8 h-8 md:w-10 md:h-10 opacity-20" />
//                   </div>
//                   <p className="text-base md:text-lg font-medium text-zinc-500">Preview Area</p>
//                   <p className="text-xs md:text-sm text-zinc-600">Generated image will appear here</p>
//                 </div>
//               )}
//             </div>
            
//             {/* Download Button overlay */}
//             {resultImage && (
//               <div className="absolute bottom-4 right-4 z-20">
//                 <Button 
//                     variant="secondary" 
//                     onClick={handleDownload}
//                     disabled={isDownloading}
//                     className="bg-white/90 backdrop-blur text-black hover:bg-white shadow-xl border border-white/20"
//                 >
//                   {isDownloading ? (
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   ) : (
//                       <Download className="w-4 h-4 mr-2" />
//                   )}
//                   Download
//                 </Button>
//               </div>
//             )}
            
//             {/* Watermark overlay */}
//              {resultImage && (
//                 <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-3 py-1 rounded-full text-[10px] md:text-xs text-white/80 border border-white/10 pointer-events-none">
//                   Generated by AI
//                 </div>
//              )}
//           </div>

//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function Loader2({ className }: { className?: string }) {
//   return (
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       width="24" height="24" viewBox="0 0 24 24" 
//       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
//       className={className}
//     >
//       <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//     </svg>
//   );
// }


'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
import { Button } from '@workspace/ui/components/button';
import { User, Sparkles, Upload, ArrowRight, CheckCircle2, ImageIcon, RotateCcw, Download } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { useMutation } from '@tanstack/react-query';
import http from '@/lib/http'; 
import toast from 'react-hot-toast';

interface VirtualTryOnModalProps {
  productImages: string[];
  productTitle: string;
  categorySlug: string;
  size?: string; 
}

const supportedCategories = ['tops', 'bottoms', 'full-body'];

export function VirtualTryOnModal({ 
  productImages, 
  productTitle, 
  categorySlug ,
  size
}: VirtualTryOnModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isSupported = supportedCategories.includes(categorySlug);

  // State
  const [userImage, setUserImage] = useState<File | null>(null);
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
  const [selectedGarmentUrl, setSelectedGarmentUrl] = useState<string>(productImages[0] || '');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tryOnMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (userImage) formData.append('personImage', userImage);
      formData.append('garmentUrl', selectedGarmentUrl);
      formData.append('category', categorySlug);
      const res = await http.post('/tryon/generate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 300000,
      });
      return res.data; 
    },
    onSuccess: (data) => {
      setResultImage(data.imageUrl);
      toast.success('Try-on successful!');
    },
    onError: (error: any) => {
      toast.error('AI Error: ' + (error?.response?.data?.message || 'Something went wrong'));
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserImage(file);
      setUserImagePreview(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  const handleGarmentSelect = (url: string) => {
    setSelectedGarmentUrl(url);
    setResultImage(null);
  };

  const resetAll = () => {
    setUserImage(null);
    setUserImagePreview(null);
    setResultImage(null);
  };

  const handleDownload = async () => {
    if (!resultImage) return;
    setIsDownloading(true);

    try {
        window.open(resultImage, '_blank');
        const response = await fetch(resultImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `try-on-${productTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Image downloaded!");
    } catch (error) {
        console.error("Download failed:", error);
        toast.error("Could not auto-download. Please save the image from the new tab.");
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {size === "icon" ? (
        <Button 
          variant="outline"
          size={"icon"}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-full h-10 w-10 md:h-12 md:w-12 border border-border shadow-lg transition-all hover:scale-[1.02] group"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-spin" />
        </Button>
        ):
        (
           <Button 
          variant="outline"
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 font-bold py-6 rounded-full shadow-lg transition-all hover:scale-[1.02] group"
        >
          <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
          VIRTUAL TRY-ON 
        </Button>
        )}
       
      </DialogTrigger>
      
      {/* UPDATE: Dialog chính */}
      <DialogContent className="sm:max-w-[60rem] h-[90vh] p-0 gap-0 bg-zinc-950 border-zinc-800 text-white overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 pr-12 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 relative flex-shrink-0">
          <DialogHeader className="p-0 space-y-0">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="text-violet-500 w-5 h-5" /> 
              AI Fitting Room <span className="text-zinc-500 text-sm font-normal hidden sm:inline">| {productTitle}</span>
            </DialogTitle>
          </DialogHeader>
          
          <Button variant="ghost" size="sm" onClick={resetAll} className="text-zinc-400 hover:text-white hover:bg-zinc-800 mr-2">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>

        {/* Content Wrapper */}
        {/* UPDATE CSS: 
            - Mobile: flex-col + overflow-y-auto (cho phép cuộn toàn bộ nội dung dọc)
            - Desktop (lg): flex-row + overflow-hidden (chia đôi màn hình, cuộn riêng từng phần)
        */}
        <div className="w-full h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          
          {/* LEFT PANEL: CONFIGURATION */}
          {/* UPDATE CSS:
             - Bỏ h-[40%].
             - Mobile: h-auto (tự giãn theo nội dung để không bị đè nút)
             - Desktop: w-[400px] cố định
          */}
          <div className="w-full lg:w-[400px] flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/20 flex-shrink-0 h-auto lg:h-full">
            
            {/* Scrollable Form Area */}
            {/* Trên Desktop thì scroll vùng này. Trên mobile thì nó tự dài ra */}
            <div className="flex-1 p-6 space-y-8 lg:overflow-y-auto custom-scrollbar">
              
              {/* 1. Upload User Image */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white text-xs">1</span>
                  Upload Your Photo
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "relative w-full aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden bg-zinc-900/50",
                    userImagePreview 
                      ? "border-violet-500" 
                      : "border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500"
                  )}
                >
                  {userImagePreview ? (
                    <>
                      <img src={userImagePreview} alt="User" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium text-white flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Change Photo
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                        <User className="w-6 h-6 text-zinc-400" />
                      </div>
                      <p className="text-sm text-zinc-300 font-medium">Click to upload</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>

              {/* 2. Select Garment */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white text-xs">2</span>
                  Select Garment Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {productImages.map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleGarmentSelect(img)}
                      className={cn(
                        "relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                        selectedGarmentUrl === img 
                          ? "border-violet-500 ring-2 ring-violet-500/20 opacity-100" 
                          : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt={`Variant ${idx}`} className="w-full h-full object-cover" />
                      {selectedGarmentUrl === img && (
                        <div className="absolute top-1 right-1 bg-violet-500 rounded-full p-0.5">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Footer Button */}
            <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900/50 sticky bottom-0 z-10">
              {!isSupported && (
                 <div className="text-center p-2 bg-amber-900/20 border border-amber-800 rounded-lg text-amber-200 mb-2 text-xs flex items-center justify-center gap-2">
                   <span>⚠️</span> 
                   <span>Supported: <b>Tops, Bottoms, Full Body</b> only.</span>
                 </div>
              )}
              <Button 
                onClick={() => tryOnMutation.mutate()} 
                disabled={!userImage || !selectedGarmentUrl || tryOnMutation.isPending || !isSupported}
                className={cn(
                  "w-full font-bold py-4 md:py-6 text-base transition-all",
                  tryOnMutation.isPending || !isSupported
                    ? "bg-zinc-800 text-zinc-400 cursor-not-allowed" 
                    : "bg-white text-black hover:bg-zinc-200"
                )}
              >
                {tryOnMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Generate Try-On <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* RIGHT PANEL: RESULT PREVIEW */}
          {/* UPDATE CSS:
              - Mobile: min-h-[500px] để đảm bảo vùng ảnh đủ lớn, nằm dưới left panel.
              - Desktop: flex-1 (chiếm hết phần còn lại bên phải).
          */}
          <div className="w-full lg:flex-1 bg-black/95 flex flex-col relative min-h-[500px] lg:min-h-0 lg:h-full">
            
            <div className="flex-1 w-full h-full relative overflow-hidden p-2 flex items-center justify-center">
              {tryOnMutation.isPending ? (
                <div className="text-center space-y-6 max-w-sm z-10">
                   <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                    <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full animate-ping delay-75"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg md:text-xl mb-2">Creating Magic...</h3>
                    <p className="text-zinc-500 text-sm">AI is fitting the garment.</p>
                  </div>
                </div>
              ) : resultImage ? (
                <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
                  <img 
                    src={resultImage} 
                    alt="AI Result" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              ) : (
                <div className="text-center text-zinc-700 select-none">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                    <ImageIcon className="w-8 h-8 md:w-10 md:h-10 opacity-20" />
                  </div>
                  <p className="text-base md:text-lg font-medium text-zinc-500">Preview Area</p>
                  <p className="text-xs md:text-sm text-zinc-600">Generated image will appear here</p>
                </div>
              )}
            </div>
            
            {resultImage && (
              <div className="absolute bottom-4 right-4 z-20">
                <Button 
                    variant="secondary" 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-white/90 backdrop-blur text-black hover:bg-white shadow-xl border border-white/20"
                >
                  {isDownloading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                      <Download className="w-4 h-4 mr-2" />
                  )}
                  Download
                </Button>
              </div>
            )}
            
             {resultImage && (
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-3 py-1 rounded-full text-[10px] md:text-xs text-white/80 border border-white/10 pointer-events-none">
                  Generated by AI
                </div>
             )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

function Loader2({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}