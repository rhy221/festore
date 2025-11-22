"use client";
import { useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { CircleButton } from "@/components/button";
import { CategoryCard, ProductCard } from "@/components/card";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Admin";

export default function AdminCategoryDashboard() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Content layout */}
      <div className="flex flex-1 pt-32">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 bg-white p-6 overflow-y-auto text-lg">
          <p className="font-bold text-3xl text-black">GIÀY</p>
          <p className="text-black">
            Giày là nhóm các mẫu giày được phân loại theo kiểu dáng và công dụng
            như giày thể thao, giày công sở, giày boot, giày sandal, mỗi loại
            phù hợp với mục đích sử dụng và phong cách khác nhau.
          </p>
          {/* Search */}
          <div className="flex items-center gap-2 py-2">
            <Input
              className="text-base !bg-[#ADD8E6] border-none rounded-3xl"
              placeholder="Nhập nội dung tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="bg-green-500 text-base text-white rounded-3xl hover:bg-green-700">
              Tìm kiếm
            </Button>
          </div>
          {/* Filter for Product */}
          <div className="flex items-center gap-5 py-2">
            <Button className="bg-[#E6E6FA] text-black text-sm rounded-3xl hover:bg-[#cdcde2] ">
              Tất cả
            </Button>
            <Button className="bg-[#E6E6FA] text-black text-sm rounded-3xl hover:bg-[#cdcde2] ">
              Mới nhất
            </Button>
          </div>
          {/* Table of Product */}
          <table className="table-fixed min-w-full min-h-screen">
            <thead>
              <tr>
                <th className="w-1/3"></th>
                <th className="w-1/3"></th>
                <th className="w-1/3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ProductCard
                    title="Giày Grand Sport"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
                <td>
                  <ProductCard
                    title="Giày Sunday Chunky"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
                <td>
                  <ProductCard
                    title="Giày Yueying 3 Nam"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <ProductCard
                    title="Giày Grand Sport"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
                <td>
                  <ProductCard
                    title="Giày Sunday Chunky"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
                <td>
                  <ProductCard
                    title="Giày Yueying 3 Nam"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
