import NextAuth from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: number;
			email: string;
			username: string;
			type: number;
		} & DefaultSession["user"];
		accessToken: string;
		userType: number;
	}
}
