"use client";

import { use, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCcwIcon } from "lucide-react";
import { Item } from "@/lib/types/types";
import OrderCard from "./order-card";
import { OrderUser } from "@/lib/action/server";
import { Status } from "@prisma/client";
import StatusChange from "../order/status-change";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { refreshOrders } from "@/lib/action/action";

interface Props {
  ordersPromise: Promise<OrderUser>;
}

export function OrderManagement({ ordersPromise }: Props) {
  const orders = use(ordersPromise);

  const [activeTab, setActiveTab] = useState<Status>("PENDING");

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className="space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as Status)}
      >
        <TabsList className=" w-full flex  justify-start">
          <TabsTrigger value={Status.COMPLETED}>Completed</TabsTrigger>
          <TabsTrigger value={Status.PENDING}>Pending</TabsTrigger>
          <TabsTrigger value={Status.FAILED}>Failed</TabsTrigger>
        </TabsList>
        {[Status.COMPLETED, Status.PENDING, Status.FAILED].map((status) => (
          <TabsContent
            key={status}
            value={status}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-bold mb-4 capitalize">
                {status.toLocaleLowerCase()} Orders
              </h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={async () => await refreshOrders()}>
                    <RefreshCcwIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Refresh</TooltipContent>
              </Tooltip>
            </div>

            {filteredOrders.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No {status.toLocaleLowerCase()} orders found.
              </p>
            ) : (
              <ScrollArea className="h-100">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="text-sm flex-col gap-2 leading-none">
                            <p className="font-medium text-lg  mb-2">
                              {order.user?.name}
                            </p>
                            <p className="font-normal mb-2 text-md">
                              {order?.user?.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{order.date.toLocaleDateString()}</TableCell>
                        <TableCell>
                          {order.total_price.toLocaleString()} Rwf
                        </TableCell>
                        <TableCell>
                          <OrderCard
                            order={{
                              products: order.products as Item[],
                              total_price: order.total_price,
                              date: order.date,
                              status: order.status,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {<StatusChange status={order.status} id={order.id} />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
