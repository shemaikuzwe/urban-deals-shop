import { Skeleton } from "@urban-deals-shop/ui/components/skeleton";

export default function UserSkelton() {
  return (
    <div className="w-full flex">
      <Skeleton className={"w-10 h-10 rounded-full"} />
    </div>
  );
}
