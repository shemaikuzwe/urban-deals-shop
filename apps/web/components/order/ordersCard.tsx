"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@urban-deals-shop/ui/components/card";
import { Badge } from "@urban-deals-shop/ui/components/badge";
import { CheckCircle, ChevronDown, ChevronUp, Clock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@urban-deals-shop/ui/components/collapsible";
import { Button } from "@urban-deals-shop/ui/components/button";
import { Order } from "@urban-deals-shop/db";
import { Item } from "@/lib/types/types";

interface Props {
  order: Order;
}
const OrdersCard = ({ order }: Props) => {
  const { products, total_price, createdAt, status } = order;
  const [showProds, setShowProds] = useState(false);

  return (
    <Card className="w-full rounded-md">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <time className="text-sm text-muted-foreground">
          {createdAt.toLocaleString()}
        </time>
        <Badge
          variant={status === "COMPLETED" ? "default" : "secondary"}
          className="h-6"
        >
          {status === "COMPLETED" ? (
            <CheckCircle className="mr-1 h-3 w-3" />
          ) : (
            <Clock className="mr-1 h-3 w-3" />
          )}
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <Collapsible open={showProds} onOpenChange={setShowProds}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Products ({products.length})
              </p>
              <p className="font-medium">
                Total Price: {total_price.toLocaleString()} RWF
              </p>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <span>
                  {showProds ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle product list</span>
                </span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 mt-4">
              <div className="divide-y">
                {(products as unknown as Item[]).map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {product.quantity} {product.name}
                      </p>
                      <Badge>{product.size}</Badge>
                    </div>
                    <p className="text-sm font-medium">
                      {product.price.toLocaleString()} RWF
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default OrdersCard;
