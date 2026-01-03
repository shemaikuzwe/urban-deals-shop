import { Resend } from "resend";

/**
 * sendMail function
 * This function sends an email and takes the following parameters
 * @param email{string} sender's Email
 * @param react {React.JSX.Element} The react email.
 * @param subject {string} The email subject
 * @param text {string} the email text
 *
 */
export default async function sendMail(
  react: React.JSX.Element,
  subject: string,
  text: string,
  email?: string,
) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.MAIL_FROM;
    const to = process.env.MAIL_TO;
    if (!to || !from) {
      throw new Error("MAIL_TO or MAIL_FROM is not defined");
    }
    const res = await resend.emails.send({
      to: [to],
      from: from,
      subject: subject,
      text: text,
      react: react,
      replyTo: email,
    });
    if (res.error) {
      console.error("sending email error", res.error);
    }
  } catch (e) {
    console.error("sending email error", e);
    throw new Error("Email not sent");
  }
}
