"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Select } from "@workspace/ui/components/select";
import UploadBox from "@/components/UploadBox";

interface FormValues {
  tenMau: string;
  moTa: string;
  theLoai: string;
  file?: File | null;
}

export default function ProductUpload() {
  const [form, setForm] = useState<FormValues>({
    tenMau: "",
    moTa: "",
    theLoai: "",
  });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!form.file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(form.file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [form.file]);

  function onFileChange(file: File | null) {
    setForm((s) => ({ ...s, file }));
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault();

    // validate minimal
    if (!form.tenMau) return alert("Vui lòng nhập tên mẫu");
    if (!form.file) return alert("Vui lòng chọn ảnh");

    // build FormData and pretend to submit
    const fd = new FormData();
    fd.append("tenMau", form.tenMau);
    fd.append("moTa", form.moTa);
    fd.append("theLoai", form.theLoai);
    if (form.file) fd.append("file", form.file);
  }

  return (
    <div>

      <main className="container mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Đăng tải mẫu
        </h1>

        <div className="max-w-5xl mx-auto">
          <form
            onSubmit={submitForm}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* left column - form fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tên mẫu
                </label>
                <Input
                  value={form.tenMau}
                  onChange={(e) => setForm({ ...form, tenMau: e.target.value })}
                  className="w-full"
                  placeholder="Nhập tên mẫu thiết kế"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <Textarea
                  value={form.moTa}
                  onChange={(e) => setForm({ ...form, moTa: e.target.value })}
                  rows={6}
                  className="w-full resize-none"
                  placeholder="Mô tả chi tiết về mẫu thiết kế..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Thể loại
                </label>
                 <Select
                  options={[
                    { label: "Chọn thể loại", value: "" },
                    { label: "Áo", value: "ao" },
                    { label: "Quần", value: "quan" },
                    { label: "Đầm", value: "dam" },
                  ]}
                  value={form.theLoai}
                  onChange={(e: any) =>
                    setForm({ ...form, theLoai: e.target.value })
                  }
                  className="w-full"
                />  
              </div>
            </div>

            {/* right column - image upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700"></label>
              <UploadBox value={preview ?? null} onChange={onFileChange} />
            </div>

            {/* buttons across the bottom */}
            <div className="md:col-span-2 flex justify-end gap-6">
              <Button
                // variant="danger"
                type="button"
                onClick={() => window.history.back()}
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium text-sm min-w-[120px] shadow-md transition-all duration-200"
              >
                Hủy
              </Button>
              <Button
                variant="default"
                type="submit"
                className="px-8 py-3 text-white rounded-full font-medium text-sm min-w-[120px] shadow-md transition-all duration-200"
                // style={{
                //   backgroundColor: "#000080",
                //   "&:hover": { backgroundColor: "#000060" },
                // }}
              >
                Hoàn tất
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
