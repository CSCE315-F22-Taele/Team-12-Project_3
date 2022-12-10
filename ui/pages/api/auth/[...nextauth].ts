import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// const pool = new Pool({
// 	user: process.env.DB_USER,
// 	host: process.env.DB_HOST,
// 	database: process.env.DB_DATABASE,
// 	password: process.env.DB_PASSWORD,
// });

export const authOptions: NextAuthOptions = {
	providers: [
		// Auth0Provider({
		// 	clientId:
		// 		process.env.AUTH0_CLIENT_ID ||
		// 		"",
		// 	clientSecret:
		// 		process.env.AUTH0_CLIENT_SECRET ||
		// 		"",
		// 	issuer:
		// 		process.env.AUTH0_ISSUER ||
		// 		"",
		// 	// idToken: true,
		// 	client: {
		// 		authorization_signed_response_alg: "HS256",
		// 		id_token_signed_response_alg: "HS256",
		// 	},
		// 	authorization: {
		// 		url: `${
		// 			process.env.AUTH0_ISSUER || ""
		// 		}/authorize?response_type=code&prompt=consent`,
		// 	},
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user, account }) => {
			if (user) {
				token.user = user;
			}
			if (account) {
				token.accessToken = account.access_token;
				// console.log(jwtDecode(account.id_token ?? ""));
				// console.log(profile);
				// const userType = profile?.["https://stockDB.com/user_type"] ?? "";
				const userType = Number(user?.email?.split("@")[0].at(-1));
				token.userType = userType;
			}

			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.user = token.user;
				session.accessToken = token.accessToken as string;
				session.userType = token.userType as number;
			}

			return session;
		},
		// async redirect({ url, baseUrl }) {
		// 	return url;
		// },
	},

	// custom auth pages
	pages: {
		// signIn: ""
	},
};

export default NextAuth(authOptions);
