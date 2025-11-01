import "server-only";
import EmailTemplate from "./template";
import sendMail from "./send";
export default async function sendContactEmail(
  name: string,
  message: string,
  email: string,
) {
  await sendMail(
    <EmailTemplate message={message} name={name} />,
    "Umucyo Tailoring",
    `New Message from ${name}`,
    email,
  );
}
