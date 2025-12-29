"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@urban-deals-shop/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@urban-deals-shop/ui/components/chart";
import { Separator } from "@urban-deals-shop/ui/components/separator";
import { use } from "react";
import type { ChartData } from "@/lib/types/types";
export default function Chart({
  dataPromise,
}: {
  dataPromise: Promise<ChartData[]>;
}) {
  const chartConfig = {
    product: {
      label: "Product",
    },
    users: {
      label: "Orders",
    },
  } satisfies ChartConfig;
  const data = use(dataPromise);
  return (
    <Card className="rounded-sm w-full h-96 md:max-w-md lg:max-w-lg">
      <CardHeader className={"p-2 bg-muted"}>
        <CardTitle className="text-md text-center">Products Overview</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pl-2 py-3">
        <ChartContainer config={chartConfig}>
          <BarChart data={data} accessibilityLayer>
            <XAxis
              dataKey="product"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="orders" fill="#2563eb" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}