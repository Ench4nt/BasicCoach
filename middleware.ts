import { NextRequest, NextResponse } from "next/server";

// Protect all /watch/* routes — actual auth verification happens server-side in the page
export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session && request.nextUrl.pathname.startsWith("/watch")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/watch/:path*"],
};
