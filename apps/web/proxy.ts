import { getSession } from "@urban-deals-shop/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const publicRoutes = ["/", "/products"];
  const session = await getSession();
  const isLoggedIn = !!session;
  const isOnPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isOnApi = request.nextUrl.pathname.startsWith("/api");
  if (!isLoggedIn && !isOnPublicRoute && !isOnApi) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
