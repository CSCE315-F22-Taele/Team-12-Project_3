import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { getSession } from "next-auth/react";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import jwtDecode from "jwt-decode";
import { redirect } from "next/dist/server/api-utils";

export const authOptions: NextAuthOptions = {
	providers: [
		Auth0Provider({
			clientId:
				process.env.AUTH0_CLIENT_ID ||
				process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ||
				"",
			clientSecret:
				process.env.AUTH0_CLIENT_SECRET ||
				process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET ||
				"",
			issuer:
				process.env.AUTH0_ISSUER ||
				process.env.NEXT_PUBLIC_AUTH0_ISSUER ||
				"",
			idToken: true,
			client: {
				authorization_signed_response_alg: "HS256",
				id_token_signed_response_alg: "HS256",
			},
			authorization: {
				params: {
					prompt: "login",
				},
				url: `${
					process.env.AUTH0_ISSUER ||
					process.env.NEXT_PUBLIC_AUTH0_ISSUER
				}/authorize?response_type=code&prompt=consent`,
			},
		}),
	],
	secret:
		process.env.NEXTAUTH_SECRET || process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
	callbacks: {
		jwt: ({ token, user, account, profile }) => {
			if (user) {
				token.user = user;
			}
			if (account) {
				token.accessToken = account.access_token;
				const idToken: { "https://stockDB.com/user_type": string } =
					jwtDecode(account.id_token!);
				// console.log(idToken);
				const userType = idToken["https://stockDB.com/user_type"];
				token.userType = userType;
			}

			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.user = token.user;
				session.accessToken = token.accessToken as string;
				session.userType = (token.userType as string).toString();
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
