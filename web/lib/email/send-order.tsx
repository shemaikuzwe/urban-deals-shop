import "server-only";
import sendMail from "./send";
import NewOrderEmail from "./new-order";
import { Order } from "../types/types";

export default async function sendOrderEmail(order: Order) {
  await sendMail(
    <NewOrderEmail {...order} />,
    "IRASUBIZA Company LTD",
    `New Order by ${order.userNames}`,
  );
}
