import Profile from "@/components/user/profile";
import { Metadata } from "next";

export default function page() {
  return <Profile />;
}

export const metadata: Metadata = {
  title: "Profile",
};
