import { Card } from "@workspace/ui/components/card";
import { Car, Pencil, PersonStanding, Search, Star, ThumbsUp, UserPlus, UserRoundPlus } from "lucide-react";

type UserStatic = {
  name: string;
  value: number;
  icon: React.ElementType;
}


export default function Statics() {
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

let userStatics: UserStatic[] = 
[
  {name: "Rating", value: 4.0, icon: Star},
  {name: "Followers", value: 20, icon: UserPlus},
  {name: "Followings", value: 5, icon: UserRoundPlus},
  {name: "Likes", value: 100, icon: ThumbsUp},
]

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