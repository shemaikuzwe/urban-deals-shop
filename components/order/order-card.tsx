"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Clock, CheckCircle } from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Product {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  userId: string
  products: Product[]
  total_price: number
  date: Date
  status: boolean
}

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { products, total_price, date, status } = order

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <time className="text-sm text-muted-foreground">
          {format(date, "EEEE, MMMM d, yyyy")}
        </time>
        <Badge variant={status ? "default" : "secondary"} className="h-6">
          {status ? (
            <CheckCircle className="mr-1 h-3 w-3" />
          ) : (
            <Clock className="mr-1 h-3 w-3" />
          )}
          {status ? "Done" : "Pending"}
        </Badge>
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
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {product.quantity}
                      </p>
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
  )
}

