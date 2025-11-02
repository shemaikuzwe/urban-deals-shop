import "server-only";
import sendMail from "./send";
import { Order } from "../types/types";
import NewOrderEmail from "./emails/new-order";

export default async function sendOrderEmail(order: Order) {
  await sendMail(
    <NewOrderEmail {...order} />,
    "Umucyo Styles",
    `New Order by ${order.userNames}`,
  );
}
