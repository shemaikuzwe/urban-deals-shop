import EmailTemplate from "./emails/template";
import sendMail from "./send";
export default async function sendContactEmail(
  name: string,
  message: string,
  email: string,
) {
  await sendMail(
    <EmailTemplate message={message} name={name} />,
    "Urban Deals Shop",
    `New Message from ${name}`,
    email,
  );
}
