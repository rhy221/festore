"use client"

import { useComments } from "@/queries/useProduct";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";


export default function Rating({id} : {id: string}){

    const query = useComments(id);
    //  const [rating, setRating] = useState(0);
    //   const [comment, setComment] = useState("");
    //   const [comments, setComments] = useState([
    //     {
    //       id: 1,
    //       name: "Nhà thiết kế 1",
    //       avatar: "/avatar.png",
    //       time: "10h37 17/09/2025",
    //       text: "Giày này đá banh được không shop?",
    //     },
    //     {
    //       id: 2,
    //       name: "Khách hàng 1",
    //       avatar: "/avatar2.png",
    //       time: "7h30 17/09/2025",
    //       text: "Giày này mà flex ngoài đường thì khối người nhìn",
    //     },
    //   ]);
    
    //   const handleSubmit = () => {
    //     if (!comment.trim()) return;
    //     const newComment = {
    //       id: comments.length + 1,
    //       name: "Bạn",
    //       avatar: "/avatar.png",
    //       time: new Date().toLocaleString("vi-VN"),
    //       text: comment,
    //     };
    //     setComments([newComment, ...comments]);
    //     setComment("");
    //   };
    if(query.isLoading)
      return(<Skeleton />)
    
    return(
        <Card> 
          <CardContent>
            <section className="max-w-5xl">
        <h3 className="font-semibold mb-3">Đánh giá</h3>
        <p className="text-sm mb-2">4.0 dựa trên 20 đánh giá</p>
        {/* <p className="font-medium mb-2">Đánh giá của bạn</p>
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
        </div> */}
      </section>

      {/* Comments */}
      <section className="max-w-5xl ">
        <h3 className="font-semibold mb-2">
          Bình luận ({query.data?.length})
        </h3>

        {/* Input */}
        {/* <textarea
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
        </button> */}

        {/* List */}
        <div className="clear-both space-y-6">
          {query.data!.map((c) => (
            <div key={c._id} className="flex space-x-3">
              <Avatar>
                <AvatarImage src={c.customerAvatar}/>
                <AvatarFallback>{c.customerName}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">{c.customerName}</div>
                <div className="text-xs text-gray-500 mb-1">{dayjs(c.createdAt).format("DD/MM/YYYY")}</div>
                <div className="text-sm">{c.content}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
          </CardContent>
       
        </Card>
    )
}

function RatingSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-6 py-6">

        {/* Đánh giá tổng quan */}
        <section className="max-w-5xl space-y-2">
          <Skeleton className="h-6 w-28" />  {/* "Đánh giá" */}
          <Skeleton className="h-4 w-40" />  {/* "4.0 dựa trên..." */}
        </section>

        {/* Comments */}
        <section className="max-w-5xl space-y-4">
          <Skeleton className="h-6 w-40" />  {/* "Bình luận ( )" */}

          {/* Comment list skeleton - lặp lại 3 item */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-3">
                {/* Avatar skeleton */}
                <Skeleton className="h-10 w-10 rounded-full" />

                {/* Text skeleton */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />  {/* Tên */}
                  <Skeleton className="h-3 w-20" />  {/* Ngày */}
                  <Skeleton className="h-4 w-4/5" /> {/* Nội dung */}
                </div>
              </div>
            ))}
          </div>
        </section>

      </CardContent>
    </Card>
  );
}