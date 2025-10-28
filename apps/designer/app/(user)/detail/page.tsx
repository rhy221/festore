"use client";
import { useState } from "react";
import Image from "next/image";

export default function DesignDetail() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Nhà thiết kế 1",
      avatar: "/avatar.png",
      time: "10h37 17/09/2025",
      text: "Giày này đá banh được không shop?",
    },
    {
      id: 2,
      name: "Khách hàng 1",
      avatar: "/avatar2.png",
      time: "7h30 17/09/2025",
      text: "Giày này mà flex ngoài đường thì khối người nhìn",
    },
  ]);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: comments.length + 1,
      name: "Bạn",
      avatar: "/avatar.png",
      time: new Date().toLocaleString("vi-VN"),
      text: comment,
    };
    setComments([newComment, ...comments]);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <main className="flex flex-col md:flex-row max-w-5xl mx-auto p-10 gap-10">
        {/* Image */}
        <div className="flex-shrink-0">
          <Image
            src="/shoe.png"
            alt="Footwear design"
            width={300}
            height={300}
            className="rounded-md border"
          />
        </div>

        {/* Info */}
        <div>
          <h2 className="text-lg font-bold mb-2">Tên mẫu thiết kế</h2>
          <p className="text-gray-800 mb-4">Footwear Romans Cad</p>

          <h2 className="text-lg font-bold mb-2">Mô tả</h2>
          <p className="text-gray-700 mb-4">
            Mẫu giày lấy cảm hứng từ chiến binh La Mã với thiết kế dây đan mạnh
            mẽ và phong cách cổ điển hiện đại.
          </p>

          <h2 className="text-lg font-bold mb-2">Thể loại</h2>
          <p className="text-gray-700 mb-4">Giày</p>

          <div className="flex gap-10 text-sm font-semibold">
            <span>Lượt thích: <span className="font-normal">135</span></span>
            <span>Lượt xem: <span className="font-normal">36</span></span>
          </div>
        </div>
      </main>

      {/* Ratings */}
      <section className="max-w-5xl mx-auto px-10 mt-6">
        <h3 className="font-semibold mb-3">Đánh giá</h3>
        <p className="text-sm mb-2">4.0 dựa trên 20 đánh giá</p>
        <p className="font-medium mb-2">Đánh giá của bạn</p>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-2xl text-yellow-400 hover:scale-110 transition"
            >
              {rating >= star ? "★" : "☆"}
            </button>
          ))}
        </div>
      </section>

      {/* Comments */}
      <section className="max-w-5xl mx-auto px-10 mt-4">
        <h3 className="font-semibold mb-2">
          Bình luận ({comments.length})
        </h3>

        {/* Input */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="w-full border border-gray-300 rounded-md p-3 mb-3 bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-purple-700 float-right"
        >
          Gửi bình luận
        </button>

        {/* List */}
        <div className="clear-both mt-10 space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="flex space-x-3">
              <Image
                src={c.avatar}
                alt={c.name}
                width={45}
                height={45}
                className="rounded-full border"
              />
              <div>
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-gray-500 mb-1">{c.time}</div>
                <div className="text-sm">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
