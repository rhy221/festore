"use client"; // Bắt buộc dòng này để dùng hook

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Nếu bạn có cài lucide-react
// Hoặc dùng Button của shadcn nếu muốn đồng bộ style: import { Button } from "@workspace/ui/components/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Hàm kiểm tra vị trí cuộn để hiện/ẩn nút
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    // Cleanup event khi component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50 
        p-3 rounded-full bg-black text-white shadow-lg border border-white/20
        transition-all duration-300 ease-in-out
        hover:bg-gray-800 hover:scale-110
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
      aria-label="Scroll to top"
    >
      {/* Icon mũi tên */}
      <ArrowUp size={20} />
    </button>
  );
}