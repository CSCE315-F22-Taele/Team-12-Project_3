import NextAuth from "next-auth";
import { Profile } from "next-authcore\types.d.ts";

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

	interface Profile {
		"https://stockDB.com/user_type": string;
	}

	// interface JWT {
	// 	accessToken: string;
	// }

	interface User {
		emailVerified: string;
	}
}
