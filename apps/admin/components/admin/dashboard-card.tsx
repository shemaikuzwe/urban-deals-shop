"use client";
import React from "react";
import {
  LucideIcon,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface DashboardCardProps {
  label: string;
  content: string | number;
  icon?: "money" | "users" | "sales" | "growth";
  color?: "bg-green-400" | "bg-muted" | "bg-violet-500" | "bg-primary";
}

const iconMap: Record<string, LucideIcon> = {
  money: DollarSign,
  users: Users,
  sales: ShoppingCart,
  growth: TrendingUp,
};

export default function DashboardCard({
  content,
  label,
  icon = "money",
  color = "bg-green-400",
}: DashboardCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card className="w-80 h-20 flex items-center dark:bg-muted/70 ">
      <CardContent className="flex gap-2  p-4 w-full h-full">
        <div className="bg-gray-50 dark:bg-card flex justify-center items-center p-2 text-center rounded-md">
          {<Icon width={20} height={20} />}
        </div>
        <div className="flex gap-2 justify-center items-center font-black text-md">
          <p>{content}</p>
          <p>{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
