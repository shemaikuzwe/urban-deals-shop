import { Skeleton } from "../ui/skeleton";

export default function UserSkelton() {
  return (
    <div className="w-full flex">
      <Skeleton className={"w-10 h-10 rounded-full"} />
    </div>
  );
}
