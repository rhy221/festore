// "use client"

// import { useProduct } from "@/queries/useProduct";
// import { Card, CardContent } from "@workspace/ui/components/card";
// import { Separator } from "@workspace/ui/components/separator";
// import { Skeleton } from "@workspace/ui/components/skeleton";
// import Image from "next/image";
// import { useState } from "react";
// import Images from "./images";

// export default function Infor({id}: {id: string}){

//     const query = useProduct(id);
//     if(query.isLoading)
//       return(<InforSkeleton />)
//     return(
//       <div className="flex justify-between w-[80%] p-0 gap-4">
//          <div className="flex-shrink-0 flex-1">
//           {/* <Image
//             src={query.data?.imagesUrl[0]!}
//             alt="Footwear design"
//             width={300}
//             height={300}
//             className="rounded-md border w-full"
//           /> */}
//           <Images imagesUrl={query.data?.imagesUrl!}/>
//         </div>
        
//         <Card className="flex-1">
//         {/* Info */}
//         <CardContent className="flex-1 flex flex-col gap-3">
//           <h1 className="text-gray-800 mb-4 font-bold text-4xl">{query.data?.title}</h1>
//           <Separator />
//           <span className="font-bold text-3xl">{"VND " + query.data?.price }</span>
//           <Separator />
//           <h2 className="text-lg font-bold mb-2">Mô tả</h2>
//           <p className="text-gray-700 mb-4">
//            {query.data?.description}
//           </p>

//           {/* <h2 className="text-lg font-bold mb-2">Thể loại</h2>
//           <p className="text-gray-700 mb-4">{query.data.}</p> */}
//           <Separator />
//           <div className="flex gap-10 text-sm font-semibold">
//             <span>Lượt thích: <span className="font-normal">{query.data?.likeCount}</span></span>
//             <span>Lượt xem: <span className="font-normal">{query.data?.viewCount}</span></span>
//           </div>
//         </CardContent>
       
//         </Card>
//       </div>
        
//     )
// }

// function InforSkeleton() {
//   return (
//     <div className="flex justify-between w-[80%] p-0 gap-4">
//       {/* Left image skeleton */}
//       <div className="flex-shrink-0 flex-1">
//         <Skeleton className="h-[300px] w-full rounded-md border" />
//       </div>

//       {/* Right info skeleton */}
//       <Card className="flex-1">
//         <CardContent className="flex-1 flex flex-col gap-3">
//           {/* Title */}
//           <Skeleton className="h-10 w-3/4 rounded-md" />

//           <Separator />

//           {/* Price */}
//           <Skeleton className="h-8 w-1/3 rounded-md" />

//           <Separator />

//           {/* Mô tả heading + text */}
//           <Skeleton className="h-6 w-1/5 rounded-md" />
//           <div className="flex flex-col gap-2">
//             <Skeleton className="h-4 w-full rounded-md" />
//             <Skeleton className="h-4 w-5/6 rounded-md" />
//             <Skeleton className="h-4 w-2/3 rounded-md" />
//           </div>

//           <Separator />

//           {/* Likes / Views */}
//           <div className="flex gap-10 text-sm font-semibold mt-auto">
//             <div className="flex items-center gap-2">
//               <Skeleton className="h-4 w-16 rounded-md" />
//             </div>
//             <div className="flex items-center gap-2">
//               <Skeleton className="h-4 w-16 rounded-md" />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }