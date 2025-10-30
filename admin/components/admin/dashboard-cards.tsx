import DashboardCard from "./dashboard-card";
import { getAllUsers, getProducts, getProductsNo } from "@/lib/action/server";
export default async function DashboardCards() {
  const noOfProducts = await getProductsNo();
  const noOfCustomers = await getAllUsers();
  return (
    <div className="grid gap-4 sm:grid-cols-1 justify-center items-center md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        label="Products"
        content={noOfProducts}
        icon="sales"
        color="bg-muted"
      />
      {/*<DashboardCard
        label="Customers"
        content={noOfCustomers.length}
        icon="growth"
      />*/}
      <DashboardCard
        label="All Orders"
        content={0}
        icon="money"
        color="bg-violet-500"
      />
      <DashboardCard
        label="Pending Orders"
        content={0}
        icon="money"
        color="bg-primary"
      />
    </div>
  );
}
