import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Production-only gate: the deployed build is a homepage preview for
 * the client. Any request to a route other than `/` is redirected back
 * to the homepage. In development (`npm run dev`) the full platform is
 * accessible so we can keep working on the rest of the routes.
 * Remove this file once we're ready to expose everything in production.
 */
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }
  const { pathname } = request.nextUrl;
  if (pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // Skip Next.js internals and any path with a file extension (assets)
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
