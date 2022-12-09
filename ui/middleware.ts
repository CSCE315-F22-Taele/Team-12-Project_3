import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// export { default } from "next-auth/middleware";

// export const config = {
// 	matcher: ["/server/:path*", "/manager/:path*"],
// };

export function middleware(request: NextRequest) {
	// return NextResponse.redirect(new URL("/about-2", request.url));
}