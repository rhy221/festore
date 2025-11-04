"use client"
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import Image from "next/image";
import { File, Plus } from "lucide-react";


export function UploadFiles() {
    
    return (
        <div className="flex flex-col gap-4">
            <h2>Ảnh</h2>
            <UploadImages />
            <h2>Thiết kế</h2>
            <UploadModel />
        </div>
    )
}

export function UploadImages() {

  const {setValue, watch} = useFormContext();
  const images = watch("images");   
  const [previews, setPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setValue("images", [...images, ...selected]); 
  };

  useEffect(() => {
    if (!images || images.length === 0) {
      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews([]);
      return;
    }

    const urls = images.map((f: File) => URL.createObjectURL(f));
    setPreviews(urls);

  }, [images]);

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

      {/* Preview */}
        {previews.map((src, i) => (
          <div key={i} className="w-28 h-28 relative border rounded-md overflow-hidden">
            <Image src={src} alt="preview" fill className="object-cover" />
          </div>
        ))}
      
      <Button variant="outline" onClick={() => fileRef.current?.click()} className="w-28 h-28 bg-white">
        <Plus />
      </Button>

      
    </div>
  );
}

export function UploadModel() {

  const {setValue, watch} = useFormContext();
   const model = watch("model");  
  const [preview, setPreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.item(0);
    setValue("model", selected || null);
  };

  useEffect(() => {
    if (!model) {
      URL.revokeObjectURL(preview);
      setPreview("");
    } else {
      setPreview(model.name);
    }
  }, [model]);

  return (
    <div className="flex gap-3 flex-wrap">
      <Input
        ref={fileRef}
        type="file"
        onChange={handleSelect}
        className="hidden"
      />

      {/* Preview */}

      
      <Button
  variant="outline"
  onClick={() => fileRef.current?.click()}
  className="w-40 h-40 bg-white"
>
  {!preview ? (
    <Plus />
  ) : (
    <div className="flex flex-col w-full items-center justify-center text-center px-1">
      <File />
      <span className="block max-w-[90%] truncate text-xs mt-1">
        {preview}
      </span>
    </div>
  )}
</Button>

      
    </div>
  );
}
