"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Order } from "@/lib/types/types";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { products, total_price, date } = order;

  return (
    <Card >
      <CardHeader className="flex-row items-center justify-between space-y-0 ">
        <time className="text-sm text-muted-foreground">
          {format(date, "EEEE, MMMM d, yyyy")}
        </time>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
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
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle product list</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 mt-4">
              <div className="divide-y">
                {products.map((product, index) => (
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
}
