"use client"
import { Card, CardContent } from "@workspace/ui/components/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@workspace/ui/components/carousel";
import Image from "next/image";
import { useState } from "react";

export default function Images({imagesUrl} : {imagesUrl: string[]}){
    const [mainImage, setMainImage] = useState<string>(imagesUrl[0]!)
    return(
        <div className="flex w-full gap-4">
            <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full flex-1 h-[280px] mt-8 "
    >
      <CarouselContent className="-mt-1 h-[300px]  ">
        {imagesUrl.map((img, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-[20px]" onClick={() => {setMainImage(img); console.log(img)}}>
              <Card className="p-0 overflow-hidden">
                <CardContent className="p-0 m-0">
                  <img src={img} alt="img" className="w-full h-auto"/>
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
        <Image
            src={mainImage}
            alt="Footwear design"
            width={300}
            height={300}
            className="rounded-md border w-full flex-4"
            />
        </div>
    )
}