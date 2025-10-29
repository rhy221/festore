import Image from "next/image";
import { useState } from "react";

export default function Infor(){

    return(
        <>
       {/* Image */}
        <div className="flex-shrink-0">
          <Image
            src="https://picsum.photos/seed/picsum/300/300"
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
        </>
    )
}