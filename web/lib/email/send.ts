import "server-only";
import { Resend } from "resend";
import React from "react";

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
    await resend.emails.send({
      to: [to!],
      from: from!,
      subject: subject,
      text: text,
      react: react,
      replyTo: email,
    });
  } catch (e) {
    throw new Error("Email not sent");
  }
}
