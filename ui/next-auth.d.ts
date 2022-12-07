import NextAuth from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
		accessToken: string;
		type?: any;
	}

	interface Profile {
		app_metadata?: {
			roles: Array;
		};
	}
}
