import { Metadata } from "next";
import { Suspense } from "react";
import DashboardCards from "@/components/admin/dashboard-cards";
import DashboardCardsSkeleton from "@/components/skeltons/dashboard-card";
import { getChartData } from "@/lib/action/server";
import PendingOrders from "@/components/admin/pending-orders";
import ChartSkeleton from "@/components/skeltons/chart-skelton";
import PendingDepositsSkeleton from "@/components/skeltons/pending-order-skelton";
import Chart from "@/components/admin/chart";

export default async function Dashboard() {
  const data = getChartData();

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 sm:p-8  sm:pt-6 ">
        <Suspense fallback={<DashboardCardsSkeleton />}>
          <DashboardCards />
        </Suspense>
        <div className="flex max-md:flex-col gap-4">
          <Suspense fallback={<ChartSkeleton />}>
            <Chart dataPromise={data} />
          </Suspense>

          <Suspense fallback={<PendingDepositsSkeleton />}>
            <PendingOrders />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Admin",
};
