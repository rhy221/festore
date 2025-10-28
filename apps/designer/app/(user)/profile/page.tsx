
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Car, Pencil, PersonStanding, Search, Star, ThumbsUp, UserPlus, UserRoundPlus } from "lucide-react";
import Image from "next/image";


let userStatics: UserStatic[] = 
[
  {name: "Rating", value: 4.0, icon: Star},
  {name: "Followers", value: 20, icon: UserPlus},
  {name: "Followings", value: 5, icon: UserRoundPlus},
  {name: "Likes", value: 100, icon: ThumbsUp},
]

let modals: Modal[] = 
[
  {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
  {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
  {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
  {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
  {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
]

export default function Home() {
  return (
    <div className="grid grid-cols-[2fr_8fr] grid-rows-[1fr_4fr] mx-32 my-4 gap-4">
        <div className="[grid-area:1/1/2/3]">
          <UserInfor />
        </div>
        <div className="[grid-area:2/1/3/2]">
          <UserStatics userStatics={userStatics}/>
        </div>
        <div className="[grid-area:2/2/3/3]">
          <UserModals />
        </div>
    </div>
  );
}

function UserInfor()
{
  return (
    <Card>
      <div className="flex justify-between w-full py-2 px-6">
        {/* Avatar */}
        <div className="flex-1 flex items-start">
            <Avatar className="w-full h-auto border-4 border-b-blue-700">
              <AvatarImage src="/pathetic.jpg"/>
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
    
  )
}

type UserStatic = {
  name: string;
  value: number;
  icon: React.ElementType;
}

type Modal = {
  id: string;
  name: string;
  thumbUrl: string;
}

function UserStatics({userStatics}:  {userStatics: UserStatic[]}) {
  return (
    <Card>
      <div> 
      {userStatics.map((u, index) => (
        <UserStaticsRow key={index} name={u.name} value={u.value} icon={u.icon}/>
      ))}
    </div>
    </Card>
    
  )
}

function UserStaticsRow({name, value, icon: Icon}: UserStatic) {
  return (
    <div className="m-4">
      <div className="flex justify-between px-2"> 
        <div className="flex gap-2">
          <Icon />
          <span>{name}</span>
        </div>
        <span>{value}</span>  
      </div>
    </div>
  )
}

function UserModals() {
  return (
    
      <div>
      <Tabs defaultValue="All" className="w-full">
        <Card className="py-0">
          <TabsList className="w-full justify-around">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Sellings">Sellings</TabsTrigger>
          <TabsTrigger value="Auctions">Auctions</TabsTrigger>
          <TabsTrigger value="Boughts">Boughts</TabsTrigger>
          </TabsList>
          <div className="flex px-4 pb-4 gap-2">
            <Input placeholder="Search..."/>
            <Button>
              <Search/>
            </Button>
          </div>
        </Card>
        
        <TabsContent value="All">
          <ModalListing modals={modals}/>
        </TabsContent>
        <TabsContent value="Sellings">
          <ModalListing modals={modals}/>
        </TabsContent>
        <TabsContent value="Auctions">
          <ModalListing modals={modals}/>
        </TabsContent>
        <TabsContent value="Boughts">
          <ModalListing modals={modals}/>
        </TabsContent>
      </Tabs>
    </div>
    
  )
}

function Modal({name, thumbUrl}: Modal) {
  return (
      <Card className="w-full overflow-hidden py-0 ">
        <div className="flex flex-col">
          <div className="relative">
            <img src={thumbUrl} alt="Thumb" className="w-full h-48"/>
          </div>
          <div className="px-4 py-2">
            <h3>{name}</h3>
          </div>
        </div>
      </Card>    
  )
}

function ModalListing({modals}: {modals:Modal[]})
{
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-4 w-full">
      {modals.map((m, index) => (
        <Modal key={index} {...m}/>
      ))}
    </div>
  )
}