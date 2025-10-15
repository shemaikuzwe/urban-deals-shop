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
    <Card className="overflow-hidden transition-all hover:shadow-lg rounded-sm  w-52 ">
      <CardHeader
        className={`flex flex-row items-center justify-between space-y-0 p-2 ${color}`}
      >
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <Separator />
      <CardContent className="p-8">
        <div className="text-3xl font-bold text-center ">{content}</div>
        <p className="text-xs text-muted-foreground m-4"></p>
      </CardContent>
    </Card>
  );
}
