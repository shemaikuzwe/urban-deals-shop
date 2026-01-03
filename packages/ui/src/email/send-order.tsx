import sendMail from "./send";
import NewOrderEmail from "./emails/new-order";
import { Order } from "../lib/types";

export default async function sendOrderEmail(order: Order) {
  await sendMail(
    <NewOrderEmail {...order} />,
    "Urban Deals Shop",
    `New Order by ${order.userNames}`
  );
}
