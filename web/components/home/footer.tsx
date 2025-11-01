import Link from "next/link";
import {
  Twitter,
  Linkedin,
  InstagramIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import { unstable_cacheLife as cacheLife } from "next/cache";

export async function Footer() {
  const date = await getCurentYear();
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Umucyo Styles
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="block py-3 px-4 text-base text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-3 px-4 text-base text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Contact
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/umucyo.style?igsh=M20weXM1eWc2bmln&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-600 flex gap-2"
              >
                <InstagramIcon className="h-6 w-6" />
                <span>Instagram</span>
              </a>
            </div>
            <div className="flex space-x-6">
              <a
                href="tel:0793052454"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-600 flex  gap-2"
              >
                <span className="sr-only">Phone</span>
                <PhoneIcon className="h-6 w-6" />
                <span>0793052454</span>
              </a>
            </div>
            <div className="flex space-x-6">
              <a
                href="mailto:umucyotailoring@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-600 flex  gap-2"
              >
                <span className="sr-only">Email</span>
                <MailIcon className="h-6 w-6" />
                <span>umucyotailoring@gmail.com</span>
              </a>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 text-md hover:text-gray-600 flex  gap-2"
              >
                <span className="sr-only">Location</span>
                <MailIcon className="h-6 w-6" />
                <span>Rusizi,Kamembe</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t  pt-3">
          <p className="text-base  text-gray-600 text-center">
            &copy; {date} Umucyo Styles.
          </p>
        </div>
      </div>
    </footer>
  );
}
async function getCurentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}
