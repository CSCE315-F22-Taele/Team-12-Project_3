export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/server/:path*", "/manager/:path*"],
};
