import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

/* export default withAuth(
	async function middleware(req) {
		console.log(req.cookies.get("next-auth.session-token"));
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
); */

export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/server/:path*", "/manager/:path*"],
};
