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
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Item, Order } from "@/lib/types/types";
import OrderCard from "./order-card";
import { OrderUser } from "@/lib/action/server";
import { Status } from "@prisma/client";
import StatusChange from "../order/status-change";

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
            <h2 className="text-lg font-bold mb-4 capitalize">
              {status.toLocaleLowerCase()} Orders
            </h2>
            {filteredOrders.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No {status.toLocaleLowerCase()} orders found.
              </p>
            ) : (
              <div className="overflow-x-auto">
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
                              {order.user?.name || order.names}
                            </p>
                            <p className="font-normal mb-2 text-md">
                              {order?.user?.email || order?.phoneNumber}
                            </p>
                            {order.address && (
                              <p className="font-normal text-md">
                                {order.address}
                              </p>
                            )}
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
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
