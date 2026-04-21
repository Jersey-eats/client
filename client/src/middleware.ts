import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Demo-only gate: the deployed build is a homepage preview for the
 * client. Any request to a route other than `/` is redirected back to
 * the homepage. Remove this file (or loosen the matcher) once we're
 * ready to expose the full application.
 */
export function middleware(request: NextRequest) {
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
