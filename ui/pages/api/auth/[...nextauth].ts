import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import NextAuth from "next-auth/next";
import { getSession } from "next-auth/react";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import jwtDecode from "jwt-decode";
import { redirect } from "next/dist/server/api-utils";
import axios from "axios";

export const authOptions: NextAuthOptions = {
	providers: [
		// Auth0Provider({
		// 	clientId:
		// 		process.env.AUTH0_CLIENT_ID ||
		// 		process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ||
		// 		"",
		// 	clientSecret:
		// 		process.env.AUTH0_CLIENT_SECRET ||
		// 		process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET ||
		// 		"",
		// 	issuer:
		// 		process.env.AUTH0_ISSUER ||
		// 		process.env.NEXT_PUBLIC_AUTH0_ISSUER ||
		// 		"",
		// 	idToken: true,
		// 	client: {
		// 		authorization_signed_response_alg: "HS256",
		// 		id_token_signed_response_alg: "HS256",
		// 	},
		// 	authorization: {
		// 		params: {
		// 			prompt: "login",
		// 		},
		// 		url: `${
		// 			process.env.AUTH0_ISSUER ||
		// 			process.env.NEXT_PUBLIC_AUTH0_ISSUER
		// 		}/authorize?response_type=code&prompt=consent`,
		// 	},
		// }),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				// email: {
				// 	label: "email",
				// 	type: "text",
				// 	placeholder: "email",
				// },
				username: {
					label: "username",
					type: "text",
					placeholder: "username",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			authorize: function (credentials): Awaitable<User | null> {
				if (credentials) {
					// const data = JSON.stringify({
					// 	email: credentials.email,
					// 	password: credentials.password,
					// });
					// axios({
					// 	method: "POST",
					// 	url: process.env.FLASK_URL + "/api/login",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	data: data,
					// }).then((r) => {
					// 	const user = r.data;
					// 	return {
					// 		id: user.id,
					// 		email: user.email,
					// 		username: user.userName,
					// 		type: Number(user.userType),
					// 	};
					// });
					if (
						credentials.username === "john" &&
						credentials.password === "test"
					) {
						// user object with id
						return {
							id: "2",
							name: "John",
							email: "test@test.com",
						};
					} else if (credentials.username === "paul" && credentials.password === "test1") {
						return {
							id: "1",
							name: "Paul",
							email: "test1@test.com",
						};
					}

					// login failed
					return null;
				}

				// login failed
				return null;
			},
		}),
	],
	secret:
		process.env.NEXTAUTH_SECRET || process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
	callbacks: {
		jwt: ({ token, user, account }) => {
			if (user) {
				token.user = user;
			}
			if (account) {
				token.accessToken = account.access_token;
			}

			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.user = token.user;
				session.accessToken = token.accessToken as string;
				if (session.user.name === "Paul") {
					session.userType = 0;

				} else session.userType = 1
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
