"use client";
import { Order, Status } from "@prisma/client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import OrdersCard from "@/components/order/ordersCard";
import { Check, CheckCircle, Package } from "lucide-react";
import { OrderUser } from "@/lib/action/server";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/store";
import { Alert, AlertDescription } from "../ui/alert";
import { motion } from "framer-motion";

export default function Orders({ order }: { order: OrderUser }) {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  console.log(success);

  const [isOpen, setOpen] = useState(false);
  const { removeAll } = useCart();

  const [items, setItems] = useState<Status>(Status.PENDING);
  const [orders, setOrders] = useState(order);

  const handleStatusChange = (status: Status) => {
    setItems(status);
  };
  useEffect(() => {
    if (success) {
      removeAll();
      setOpen(true);
    }
  }, [success]);
  useEffect(() => {
    let filtered = order;
    if (items !== Status.PENDING) {
      filtered = order.filter((order) => order.status === items);
    }
    setOrders(filtered);
  }, [items, order]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Card className="p-6 rounded-md">
        <Tabs
          defaultValue={Status.PENDING}
          className="w-full"
          onValueChange={(value) => handleStatusChange(value as Status)}
        >
          <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto mb-6">
            {[Status.COMPLETED, Status.PENDING, Status.FAILED].map((status) => (
              <TabsTrigger key={status} value={status} className="capitalize">
                {status.toLowerCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          {[Status.COMPLETED, Status.PENDING, Status.FAILED].map((status) => (
            <TabsContent key={status} value={status}>
              {isOpen && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                //@ts-ignore
                className="w-full max-w-md mx-auto my-2"
              >
                <Alert className="border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-900">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <AlertDescription className="text-green-800 dark:text-green-200 text-sm font-medium">
                      Order created successfully
                    </AlertDescription>
                  </div>
                </Alert>
              </motion.div>
              )}
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">
                    No {status.toLowerCase()} orders
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    When orders are {status.toLowerCase()}, they will appear
                    here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order: Order) => (
                    //@ts-ignore
                    <OrdersCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
