import { Mail, Phone, MapPin } from "lucide-react";
import { CardTitle } from "@/components/ui/card";

export default function ContactCard() {
  return (
    <div className="w-full max-w-md ">
      <CardTitle className="text-2xl font-bold  mb-1">Reach us ?</CardTitle>

      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5  mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium ">Phone</p>
            <p className="text-sm  font-semibold">0793052454</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium ">Address</p>
            <p className="text-sm  ">Rusizi,Rwanda</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium ">Email</p>
            <p className="text-sm">umucyotailoring@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
