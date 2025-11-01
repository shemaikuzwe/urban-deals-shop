"use client";
import { useActionState } from "react";
import { Loader2, SendHorizonal } from "lucide-react";
import { useFormStatus } from "react-dom";
import AlertMessage from "./alert-message";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ContactCard from "./contact-card";
import { Textarea } from "../ui/textarea";
import { sendMessage } from "@/lib/action/action";

export default function Contact() {
  const [status, dispatch] = useActionState(sendMessage, undefined);
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl   sm:text-2xl md:text-3xl lg:text-4xl   mb-6 text-center">
        Contact Us
      </h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full  sm:w-full lg:w-1/2 h-[300px] sm:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d63777.47119941264!2d28.868645446474403!3d-2.4764974605436327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-2.4764980999999997!2d28.9098452!5e0!3m2!1sen!2srw!4v1762004111922!5m2!1sen!2srw"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <Card className="w-full  sm:w-full lg:w-1/2 rounded-sm">
          <CardHeader className="flex flex-col">
            <ContactCard />
          </CardHeader>
          <CardContent className="pt-2">
            <h2 className="text-2xl font-bold">Message us</h2>
            <form className="space-y-6" action={dispatch}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your Name" />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="What do you want to order?"
                  className="min-h-[100px]"
                />
              </div>
              <Submit />
            </form>
          </CardContent>
          <CardFooter>{status && <AlertMessage {...status} />}</CardFooter>
        </Card>
      </div>
    </main>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <div className="w-full flex justify-center">
      <Button
        disabled={pending}
        type="submit"
        className="w-full max-w-xs space-x-2"
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> <span>Messaging</span>
          </>
        ) : (
          <>
            <SendHorizonal className="h-4 w-4" /> <span>Send Message</span>
          </>
        )}
      </Button>
    </div>
  );
}
