"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Car, Pencil, PersonStanding, Search, Star, ThumbsUp, UserPlus, UserRoundPlus } from "lucide-react";
import Image from "next/image";

export default function Profile(){
    return(
        <>
       <Card>
      <div className="flex justify-between w-full py-2 px-6">
        {/* Avatar */}
        <div className="flex-1 flex items-start">
            <Avatar className="w-full h-auto border-4 border-b-blue-700">
              <AvatarImage src="https://picsum.photos/seed/picsum/200/300"/>
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
        </div>

        {/* Info */}
        <div className="flex-5 flex flex-col items-start gap-4 px-10">
          <div className="flex flex-col gap-1">
            <span className="font-bold">John</span>
            <span className="text-xs">Johnht@gmail.com</span>
          </div>
          <span>Join in 2/2/2020</span>
          <span>{`Description: ${"chillguy"}`}</span>
          <span>{`Status: ${"active"}`}</span>
        </div>

        {/*Edit*/}
        <div className="flex-1 flex items-start">
          <Button>
            <Pencil />
            Edit profile
          </Button>
        </div>
      </div>
    </Card>
    
        </>
    )
}