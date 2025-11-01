import { Card } from "@workspace/ui/components/card";
import {
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
type UserStatic = {
  name: string;
  value: number;
  icon: React.ElementType;
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
export default function Statics({ loading = false }: StaticsProps) {
  if (loading) return <StaticsSkeleton />;
  return (
    <Card>
      <div>
        {userStatics.map((u, index) => (
          <UserStaticsRow
            key={index}
            name={u.name}
            value={u.value}
            icon={u.icon}
          />
        ))}
      </div>
    </Card>
  );
}

let userStatics: UserStatic[] = [
  { name: "Rating", value: 4.0, icon: Star },
  { name: "Followers", value: 20, icon: UserPlus },
  { name: "Followings", value: 5, icon: UserRoundPlus },
  { name: "Likes", value: 100, icon: ThumbsUp },
];

function UserStaticsRow({ name, value, icon: Icon }: UserStatic) {
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
  );
}
