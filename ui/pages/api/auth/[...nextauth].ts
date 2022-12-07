import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		Auth0Provider({
			clientId: process.env.AUTH0_CLIENT_ID || "",
			clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
			issuer: process.env.AUTH0_ISSUER,
			/* authorization: {
				params: {
					audience: encodeURI(process.env.AUTH0_AUDIENCE ?? ""),
				},
			},
			token: {
				params: {
					audience: process.env.AUTH0_AUDIENCE,
				},
			}, */
			idToken: true,
		}),
		/* CredentialsProvider({
			name: "credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "username",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			authorize: async (credentials) => {
				// database look up
				if (
					credentials &&
					credentials.username === "john" &&
					credentials.password === "test"
				) {
					// user object with id
					return {
						id: "2",
						username: "John",
						email: "test@test.com",
					};
				}

				// login failed
				return null;
			},
		}), */
	],

	/* session: {
		strategy: "jwt",
	}, */
	callbacks: {
		jwt: ({ token, user, account }) => {
			if (user) {
				token.id = user.id;
			}
			if (account) {
				token.accessToken = account.access_token;
			}

			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.user.id = token.id;
				session.accessToken = token.accessToken as string;
			}

			return session;
		},
	},
	// custom auth pages
	pages: {
		// signIn: ""
	},
};

export default NextAuth(authOptions);

