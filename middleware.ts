import { NextResponse } from "next/server";
import { auth } from "@/app/auth";

export default auth((request) => {
  const session = request.auth;
  const { nextUrl } = request;

  const isLoggedIn = !!session?.user;
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  // If not logged in, and not already on an auth route, redirect to /auth/login
  if (!isLoggedIn && !isOnAuthRoute) {
    let callbackUrl = nextUrl.pathname;
    const searchParams = nextUrl.searchParams.toString();
    if (searchParams) {
      callbackUrl += `?${searchParams}`;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login`, nextUrl)
    );
  }

  // If on an auth route but already logged in, redirect to the callback URL or /dashboard
  if (isOnAuthRoute && isLoggedIn) {
    const callbackUrl = nextUrl.searchParams.get("callbackUrl");
    return NextResponse.redirect(new URL(callbackUrl || "/dashboard", nextUrl));
  }

  // Allow the request to proceed normally
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
