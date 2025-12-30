import { MoveRight, PackageSearch } from "lucide-react";
import { Button } from "@urban-deals-shop/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@urban-deals-shop/ui/components/card";
import { Avatar, AvatarFallback } from "@urban-deals-shop/ui/components/avatar";
import { Separator } from "@urban-deals-shop/ui/components/separator";
import Link from "next/link";
import { getPendingOrders } from "@/lib/action/server";
import { AvatarImage } from "@urban-deals-shop/ui/components/avatar";

export default async function PendingOrders() {
  const orders = await getPendingOrders();

  return (
    <Card className="w-full rounded-sm h-fit">
      <CardHeader className="bg-muted/50 p-3">
        <CardTitle className="text-center">Pending Orders</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <div className="space-y-6">
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={order?.user?.image ?? ""} />
                  <AvatarFallback>
                    {order?.user?.name ||
                      ""
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="text-sm flex-col gap-2 leading-none">
                    <p className="font-medium mb-2">{order.user?.name}</p>
                    <p className="font-normal mb-2">{order?.user?.email}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {order.date.toLocaleDateString()}
                  </p>
                </div>
                <div className="font-medium text-green-600">
                  {order.total_price.toLocaleString()} Rwf
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center">
              <PackageSearch className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-inherit">
                No pending orders found
              </h3>
            </div>
          )}
        </div>
      </CardContent>
      <Separator className="my-2" />
      <CardFooter className="flex justify-center p-1">
        <Button asChild>
          <Link
            href="/admin/orders"
            className="flex items-center  justify-center gap-2 bg-primary text-background"
          >
            View orders
            <MoveRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
