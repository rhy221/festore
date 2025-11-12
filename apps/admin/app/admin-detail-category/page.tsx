"use client";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button, CircleButton } from "../components/ui/button";
import { CategoryCard, ProductCard } from "../components/ui/card";

export default function AdminCategoryDashboard() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#F0F7FF] flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
            <img src="/Logo.png" alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-extrabold text-black">HHCLOSET</h1>
        </div>
        <div className="text-2xl font-extrabold italic text-black">
          Xin chào admin: ABC
        </div>
      </header>

      {/* Content layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-4 space-y-4">
          <nav className="flex flex-col px-2">
            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a&0]">
              <img
                src="/homeIcon.png"
                alt="Home"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Trang chủ
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/adminManagementIcon.png"
                alt="User Management"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold leading-none">
                Quản lý admin
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/userManagementIcon.png"
                alt="User Management"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold leading-none">
                Quản lý người dùng
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/styleIcon.png"
                alt="Style"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Thể loại
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/reportIcon.png"
                alt="Report"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Báo cáo
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/settingIcon.png"
                alt="Settings"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Hệ thống
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70] mt-2">
              <img
                src="/logoutIcon.png"
                alt="Logout"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Đăng xuất
              </span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white p-6 overflow-y-auto text-lg">
          <p className="font-bold text-3xl">GIÀY</p>
          <p>
            Giày là nhóm các mẫu giày được phân loại theo kiểu dáng và công dụng
            như giày thể thao, giày công sở, giày boot, giày sandal, mỗi loại
            phù hợp với mục đích sử dụng và phong cách khác nhau.
          </p>
          {/* Search */}
          <div className="flex items-center gap-2 py-2">
            <Input
              className="text-base"
              placeholder="Nhập nội dung tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="bg-green-500 text-base hover:bg-green-700">
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
                    imageUrl="/imageShoe1.png"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
                <td>
                  <ProductCard
                    title="Giày Sunday Chunky"
                    imageUrl="/imageShoe2.png"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
                <td>
                  <ProductCard
                    title="Giày Yueying 3 Nam"
                    imageUrl="/imageShoe3.png"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <ProductCard
                    title="Giày Grand Sport"
                    imageUrl="/imageShoe1.png"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
                <td>
                  <ProductCard
                    title="Giày Sunday Chunky"
                    imageUrl="/imageShoe2.png"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                  />
                </td>
                <td>
                  <ProductCard
                    title="Giày Yueying 3 Nam"
                    imageUrl="/imageShoe3.png"
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
