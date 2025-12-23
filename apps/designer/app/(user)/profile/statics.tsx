"use client"
import { Card } from "@workspace/ui/components/card";
import {
  Box,
  Car,
  Pencil,
  PersonStanding,
  Search,
  Star,
  ThumbsUp,
  UserPlus,
  UserRoundPlus,
} from "lucide-react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useUserPortfolio, useUserProfileStatics } from "@/queries/useUser";
import { useParams } from "next/navigation";
type UserStatic = {
  name: string;
  value: number;
  icon: React.ElementType;
  link?: string;
};
type StaticsProps = {
  loading?: boolean;
};
export function StaticsSkeleton() {
  return (
    <Card className="p-4">
      <div className="m-4 space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between px-2 items-center">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-10" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Statics({userId}: {userId: string}) {
  const query = useUserPortfolio(userId);

  if (query.isLoading) return <StaticsSkeleton />;
  return (
    <Card>
      <div>
    
          <UserStaticsRow
            name={"Rating"}
            value={query.data?.rating!}
            icon={Star}
          /> 
          <UserStaticsRow
            name={"Followers"}
            value={query.data?.followerCount!}
            icon={UserPlus}
          /> 
          <UserStaticsRow
            name={"Following"}
            value={query.data?.followingCount!}
            icon={UserRoundPlus}
          /> 

          <UserStaticsRow
            name={"Likes"}
            value={query.data?.likeCount!}
            icon={ThumbsUp}
          /> 

          <UserStaticsRow
            name={"Models"}
            value={query.data?.totalDesigns!}
            icon={Box}
          /> 
      
      </div>
    </Card>
  );
}

// let userStatics: UserStatic[] = [
//   { name: "Rating", value: 4.0, icon: Star },
//   { name: "Followers", value: 20, icon: UserPlus },
//   { name: "Likes", value: 100, icon: ThumbsUp },
// ];

function UserStaticsRow({ name, value, icon: Icon, link }: UserStatic) {
  return (
    <div className="m-4">
      <div className="flex justify-between px-2 min-w-44">
        <div className="flex gap-4">
          <Icon />
          <span>{name}</span>
        </div>
        <span>{value}</span>
      </div>
    </div>
  );
}
