import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";
import { unstable_cacheLife as cacheLife } from "next/cache";

export async function Footer() {
  const date = await getCurentYear();
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Umucyo Tailoring
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
                  href="#"
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
              Connect
            </h3>
            <div className="flex space-x-6">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">X</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t  pt-3">
          <p className="text-base  text-gray-600 text-center">
            &copy; {date} Umucyo Tailoring.
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
