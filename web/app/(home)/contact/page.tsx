import Contact from "@/components/home/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch Whether you have questions, need assistance Fill out the form below, and we’ll get back to you as soon as possible. You can also reach us via email or phone or our location.",
};

function page() {
  return <Contact />;
}

export default page;
