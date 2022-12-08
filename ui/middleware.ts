import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/server/:path*", "/manager/:path*"],
};
