

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Car, Pencil, PersonStanding, Search, Star, ThumbsUp, UserPlus, UserRoundPlus } from "lucide-react";

export default function Products(){
    return(
        <>
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
        </>
    )
}

type Modal = {
  id: string;
  name: string;
  thumbUrl: string;
}

let modals: Modal[] = 
[
  {id: "f", name: "duckkkk", thumbUrl: "https://picsum.photos/seed/picsum/200/300"},
  {id: "f", name: "duckkkk", thumbUrl: "https://picsum.photos/seed/picsum/200/300"},
  {id: "f", name: "duckkkk", thumbUrl: "https://picsum.photos/seed/picsum/200/300"},
  {id: "f", name: "duckkkk", thumbUrl: "https://picsum.photos/seed/picsum/200/300"},
  {id: "f", name: "duckkkk", thumbUrl: "https://picsum.photos/seed/picsum/200/300"},
]

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


