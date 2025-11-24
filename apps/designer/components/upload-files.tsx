"use client"
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import Image from "next/image";
import { FileBox, File as FileIcon, Plus, X } from "lucide-react";


export function UploadFiles() {
    
    return (
        <div className="flex flex-col gap-4">
            <h2>Images</h2>
            <UploadImages />
            <h2>Model</h2>
            <UploadModel />
        </div>
    )
}

export function EditFiles() {
    
    return (
        <div className="flex flex-col gap-4">
            <h2>Images</h2>
            <EditImages />
            <h2>Model</h2>
            <EditModel />
        </div>
    )
}
export function UploadImages() {
  const { setValue, watch } = useFormContext();
  const images = watch("images");
  
  const [previews, setPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // --- FIX: Tạo Fingerprint để tránh vòng lặp useEffect ---
  // Chỉ khi tên, size hoặc lastModified của các file thay đổi thì chuỗi này mới đổi
  const imagesFingerprint = useMemo(() => {
    return (images || []).map((f: File) => `${f.name}-${f.size}-${f.lastModified}`).join(',');
  }, [images]);

  // Xử lý chọn ảnh
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      const currentImages = (watch("images") || []) as File[];
      setValue("images", [...currentImages, ...selected], { shouldValidate: true });
      
      if (fileRef.current) {
        fileRef.current.value = ""; 
      }
    }
  };

  // Xử lý xóa ảnh
  const onRemoveImage = (indexToRemove: number) => {
    const currentImages = (watch("images") || []) as File[];
    const newImages = currentImages.filter((_, index) => index !== indexToRemove);
    setValue("images", newImages, { shouldValidate: true, shouldDirty: true });
  };

  // Effect quản lý Preview
  useEffect(() => {
    const currentImages = (images || []) as File[];
    
    if (currentImages.length === 0) {
      setPreviews([]);
      return;
    }

    const newUrls = currentImages.map((file) => URL.createObjectURL(file));
    setPreviews(newUrls);

    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    
    // QUAN TRỌNG: Dùng fingerprint làm dependency thay vì mảng images
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesFingerprint]); 

  return (
    <div className="flex gap-3 flex-wrap">
      <Input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleSelect}
        className="hidden"
      />

      {previews.map((src, i) => (
        <div key={src} className="w-28 h-28 relative border rounded-md overflow-hidden group">
          <Image src={src} alt="preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onRemoveImage(i)}
            className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => fileRef.current?.click()}
        className="w-28 h-28 bg-white border-dashed"
      >
        <Plus className="w-6 h-6 text-gray-400" />
      </Button>
    </div>
  );
}

export function UploadModel() {
  const { setValue, watch } = useFormContext();
  // Lấy mảng models, mặc định rỗng
  const models = (watch("models") || []) as File[];
  const currentFile = models[0]; // Chỉ lấy file đầu tiên vì quy định chọn 1 file

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Ghi đè mảng models bằng mảng chỉ chứa 1 file mới
      setValue("models", [file], { shouldValidate: true, shouldDirty: true });
      
      // Reset input để chọn lại được file cũ nếu cần
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setValue("models", [], { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-3">
      <Input
        ref={fileRef}
        type="file"
        accept=".glb,.gltf" // Giới hạn đuôi file 3D
        onChange={handleSelect}
        className="hidden"
      />

      {currentFile ? (
        /* UI khi ĐÃ có file */
        <div className="relative w-40 h-40 border rounded-md flex flex-col items-center justify-center bg-gray-50 group">
            <FileIcon className="w-10 h-10 text-blue-500 mb-2" />
            <span className="text-xs text-gray-600 px-2 text-center break-all line-clamp-2">
                {currentFile.name}
            </span>
            <span className="text-[10px] text-gray-400 mt-1">
                {(currentFile.size / 1024 / 1024).toFixed(2)} MB
            </span>

            <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 p-1 bg-white hover:bg-red-500 hover:text-white text-gray-500 border rounded-full transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
      ) : (
        /* UI khi CHƯA có file (Nút Upload) */
        <Button
          type="button"
          variant="outline"
          onClick={() => fileRef.current?.click()}
          className="w-40 h-40 bg-white border-dashed flex flex-col gap-2"
        >
          <Plus className="w-8 h-8 text-gray-400" />
          <span className="text-xs text-gray-500">Upload 3D Model</span>
        </Button>
      )}
    </div>
  );
}

// export function UploadImages() {

//   const {setValue, watch} = useFormContext();
//   const images = watch("images");   
//   const [previews, setPreviews] = useState<string[]>([]);
//   const fileRef = useRef<HTMLInputElement | null>(null);

//   const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = Array.from(e.target.files || []);
//     setValue("images", [...images, ...selected]); 
  
//   };
//   const onRemoveImage = () => {

//   }
//   useEffect(() => {
//     if (!images || images.length === 0) {
//       previews.forEach((url) => URL.revokeObjectURL(url));
//       setPreviews([]);
//       return;
//     }

//     const urls = images.map((f: File) => URL.createObjectURL(f));
//     setPreviews(urls);

//   }, [images]);

//   return (
//     <div className="flex gap-3 flex-wrap">
//       <Input
//         ref={fileRef}
//         type="file"
//         accept="image/*"
//         multiple
//         onChange={handleSelect}
//         className="hidden"
//       />

//       {/* Preview */}
//         {previews.map((src, i) => (
//           <div key={i} className="w-28 h-28 relative border rounded-md overflow-hidden group">
//             <Image src={src} alt="preview" fill className="object-cover" />
//             <button onClick={onRemoveImage}
//                         className="absolute -top-1 -right-1 p-2 text-white/50 hover:text-red-500  rounded-full transition-colors opacity-0 group-hover:opacity-100"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//           </div>
//         ))}
      
//       <Button variant="outline" onClick={() => fileRef.current?.click()} className="w-28 h-28 bg-white">
//         <Plus />
//       </Button>

      
//     </div>
//   );
// }

// export function UploadModel() {

//   const {setValue, watch} = useFormContext();
//    const models = watch("models");  
//   const [previews, setPreviews] = useState<string[]>([]);
//   const fileRef = useRef<HTMLInputElement | null>(null);

//   const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // const selected = e.target.files?.item(0);
//     // setValue("models", selected || null);
//     const selected = Array.from(e.target.files || []);
//     setValue("models", [...selected]); 
//   };

//   useEffect(() => {
//     if (!models || models.length === 0) {
//       previews.forEach((url) => URL.revokeObjectURL(url));
//       setPreviews([]);
//       return;
//     }

//     const urls = models.map((f: File) => f.name);
//     setPreviews(urls);
//   }, [models]);

//   return (
//     <div className="flex gap-3 flex-wrap">
//       <Input
//         ref={fileRef}
//         type="file"
//         onChange={handleSelect}
//         className="hidden"
//       />

//       {/* Preview */}

      
//       <Button
//   variant="outline"
//   onClick={() => fileRef.current?.click()}
//   className="w-40 h-40 bg-white"
// >
//   {!previews ? (
//     <Plus />
//   ) : (
//     <div className="flex flex-col w-full items-center justify-center text-center px-1">
//       <File />
//       <span className="block max-w-[90%] truncate text-xs mt-1">
//         {previews}
//       </span>
//     </div>
//   )}
// </Button>

      
//     </div>
//   );
// }


export function EditImages() {
  const { setValue, watch } = useFormContext();
  
  const newImages = (watch("images") || []) as File[];
  const oldImages = (watch("oldImages") || []) as string[];
  
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // --- GIẢI PHÁP SỬA LỖI Ở ĐÂY ---
  // Tạo ra một chuỗi "vân tay" (fingerprint) đại diện cho các file.
  // Chuỗi này chỉ thay đổi khi nội dung file thực sự thay đổi (thêm/bớt).
  const imagesFingerprint = useMemo(() => {
    return newImages.map(f => `${f.name}-${f.size}-${f.lastModified}`).join(',');
  }, [newImages]);
  // -------------------------------

  // 1. Xử lý chọn ảnh MỚI
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      // Nối file mới vào danh sách hiện tại
      setValue("images", [...newImages, ...selected], { shouldValidate: true, shouldDirty: true });
      
      if (fileRef.current) fileRef.current.value = ""; 
    }
  };

  // 2. Xóa ảnh MỚI
  const onRemoveNewImage = (indexToRemove: number) => {
    const updatedNewImages = newImages.filter((_, index) => index !== indexToRemove);
    setValue("images", updatedNewImages, { shouldValidate: true, shouldDirty: true });
  };

  // 3. Xóa ảnh CŨ
  const onRemoveOldImage = (indexToRemove: number) => {
    const updatedOldImages = oldImages.filter((_, index) => index !== indexToRemove);
    setValue("oldImages", updatedOldImages, { shouldValidate: true, shouldDirty: true });
  };

  // 4. Effect tạo preview URL
  useEffect(() => {
    if (newImages.length === 0) {
      setNewImagePreviews([]);
      return;
    }

    // Tạo URLs
    const newUrls = newImages.map((file) => URL.createObjectURL(file));
    setNewImagePreviews(newUrls);

    // Cleanup
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    
    // QUAN TRỌNG: Thay [newImages] bằng [imagesFingerprint]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesFingerprint]); 

  return (
    <div className="flex gap-3 flex-wrap">
      <Input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleSelect}
        className="hidden"
      />

      {/* Render Old Images */}
      {oldImages.map((url, i) => (
        <div key={`old-${url}-${i}`} className="w-28 h-28 relative border rounded-md overflow-hidden group">
          <Image src={url} alt="old-preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onRemoveOldImage(i)}
            className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-[10px] px-1">Old</span>
        </div>
      ))}

      {/* Render New Images */}
      {newImagePreviews.map((src, i) => (
        <div key={`new-${src}`} className="w-28 h-28 relative border rounded-md overflow-hidden group">
          <Image src={src} alt="new-preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onRemoveNewImage(i)}
            className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
           <span className="absolute bottom-0 left-0 bg-green-500 text-white text-[10px] px-1">New</span>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => fileRef.current?.click()}
        className="w-28 h-28 bg-white border-dashed flex items-center justify-center"
      >
        <Plus className="w-6 h-6 text-gray-400" />
      </Button>
    </div>
  );
}


export function EditModel() {
  const { setValue, watch } = useFormContext();
  
  const newModels = (watch("models") || []) as File[];
  const oldModels = (watch("oldModels") || []) as string[]; // Giả sử oldModels là mảng string URL

  const currentNewFile = newModels[0];
  const currentOldUrl = oldModels[0];

  const fileRef = useRef<HTMLInputElement | null>(null);

  // 1. Chọn file mới
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Ghi đè file mới
      setValue("models", [file], { shouldValidate: true, shouldDirty: true });
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // 2. Xóa file MỚI (quay lại trạng thái hiển thị file cũ nếu có)
  const removeNewFile = () => {
    setValue("models", [], { shouldValidate: true, shouldDirty: true });
  };

  // 3. Xóa file CŨ (mất hẳn file, hiện nút upload)
  const removeOldFile = () => {
    setValue("oldModels", [], { shouldValidate: true, shouldDirty: true });
  };

  // Helper: Lấy tên file từ URL cho đẹp
  const getFileNameFromUrl = (url: string) => {
    try {
      return url.substring(url.lastIndexOf('/') + 1);
    } catch {
      return "Existing Model";
    }
  };

  // --- RENDER ---
  const renderContent = () => {
    // Case 1: Có file mới vừa upload
    if (currentNewFile) {
      return (
        <div className="relative w-40 h-40 border-2 border-green-500/50 rounded-md flex flex-col items-center justify-center bg-green-50 group">
            <FileBox className="w-10 h-10 text-green-600 mb-2" />
            <span className="text-xs text-gray-700 px-2 text-center line-clamp-2 break-all">
                {currentNewFile.name}
            </span>
            <span className="text-[10px] bg-green-200 text-green-800 px-1 rounded mt-1">New</span>
            
            <button
                type="button"
                onClick={removeNewFile}
                className="absolute top-1 right-1 p-1 bg-white hover:bg-red-500 hover:text-white text-gray-500 border rounded-full transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
      );
    }

    // Case 2: Có file cũ (từ server)
    if (currentOldUrl) {
      return (
        <div className="relative w-40 h-40 border rounded-md flex flex-col items-center justify-center bg-blue-50 group">
            <FileBox className="w-10 h-10 text-blue-500 mb-2" />
            <span className="text-xs text-gray-600 px-2 text-center line-clamp-2 break-all">
                {getFileNameFromUrl(currentOldUrl)}
            </span>
            <span className="text-[10px] bg-blue-200 text-blue-800 px-1 rounded mt-1">Current</span>

            <button
                type="button"
                onClick={removeOldFile}
                className="absolute top-1 right-1 p-1 bg-white hover:bg-red-500 hover:text-white text-gray-500 border rounded-full transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
      );
    }

    // Case 3: Trống trơn -> Nút upload
    return (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileRef.current?.click()}
          className="w-40 h-40 bg-white border-dashed flex flex-col gap-2"
        >
          <Plus className="w-8 h-8 text-gray-400" />
          <span className="text-xs text-gray-500">Upload Model</span>
        </Button>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <Input
        ref={fileRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleSelect}
        className="hidden"
      />
      
      {renderContent()}
    </div>
  );
}