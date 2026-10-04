import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { LS_KEY } from "./constants";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const hasSchoolAdminSession = Boolean(
      request.cookies.get("school_admin_token")?.value,
    );
    if (pathname === "/admin/login" || pathname === "/admin/login/") {
      return NextResponse.next();
    }
    if (!hasSchoolAdminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  const cookiesStore = await cookies();
  const token = await cookiesStore.get(LS_KEY.auth_token)?.value;
  // Create response
  let response: NextResponse;

  // If token exists
  if (token) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    // If no token
    if (request.nextUrl.pathname !== "/auth") {
      response = NextResponse.redirect(new URL("/auth", request.url));
    } else {
      response = NextResponse.next();
    }
  }

  // Add pathname header for server components
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
