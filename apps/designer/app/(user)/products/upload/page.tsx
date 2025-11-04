"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@workspace/ui/components/button";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { uploadDesignSchema, UploadDesignType } from "@/schema/product.schema";
import { Infor } from "./infor";
import { UploadFiles, UploadImages, UploadModel } from "./upload-files";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadProduct } from "@/queries/useProduct";


export default function ProductUpload() {
  
  const form = useForm<UploadDesignType>({
    resolver: zodResolver(uploadDesignSchema),
    defaultValues: {
    title: "",
    description: "",
    images: [],
    model: null,
    categoryId: "",
    type: "fixed",
    price: 0,
    },
  });
  const mutation = useUploadProduct();
  // const [form, setForm] = useState<FormValues>({
  //   tenMau: "",
  //   moTa: "",
  //   theLoai: "",
  // });

  // const [preview, setPreview] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!form.file) {
  //     setPreview(null);
  //     return;
  //   }
  //   const url = URL.createObjectURL(form.file);
  //   setPreview(url);
  //   return () => URL.revokeObjectURL(url);
  // }, [form.file]);

  function onFileChange(file: File | null) {
    // setForm((s) => ({ ...s, file }));
  }

  const onSubmit = async (data: UploadDesignType) => {
    // e.preventDefault();

    // if (!form.tenMau) return alert("Vui lòng nhập tên mẫu");
    // if (!form.file) return alert("Vui lòng chọn ảnh");

    // const fd = new FormData();
    // fd.append("tenMau", form.tenMau);
    // fd.append("moTa", form.moTa);
    // fd.append("theLoai", form.theLoai);
    // if (form.file) fd.append("file", form.file);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description ?? "");
    formData.append("categoryId", data.categoryId);
    formData.append("price", String(data.price));
    formData.append("type", data.type);
    // formData.append("title", data.title);
    if(data.model) 
      formData.append("model", data.model);

    data.images.map((file) => {
      formData.append("images", file);
    });

    data.tags?.map((tag) => {
      formData.append("tags", tag);
    });

    if(mutation.isPending) return;
    try{
      const result = await mutation.mutateAsync(formData);
      form.reset();
      console.log(result);
    } catch(error) {
      console.log(error);
    }

  }

  return (
    <div>
      <main className="container mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Thêm mẫu
        </h1>

        <div className="max-w-5xl mx-auto">
          <FormProvider {... form}>
          <form
            method="POST"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* left fields */}
           
            <Infor />
            
            <UploadFiles />

            {/* image upload */}
            <div className="space-y-4">
              {/* <UploadBox value={preview ?? null} onChange={onFileChange} /> */}
              {/* <UploadImages />
              <UploadModel /> */}
              {/* <UploadFile /> */}
            </div>

            {/* buttons */}
            <div className="md:col-span-2 flex justify-end gap-6">
              <Button
                type="button"
                onClick={() => window.history.back()}
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium text-sm min-w-[120px] shadow-md transition-all duration-200"
              >
                Hủy
              </Button>

              <Button
                type="submit"
                className="px-8 py-3 text-white rounded-full font-medium text-sm min-w-[120px] shadow-md transition-all duration-200"
              >
                Hoàn tất
              </Button>
            </div>
          </form>
          </FormProvider>
         
        </div>
      </main>
    </div>
  );
}


