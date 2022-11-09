import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";

export default NextAuth({
	providers: [
		/* Auth0Provider({
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			domain: process.env.AUTH0_DOMAIN,
		}), */
		CredentialsProvider({
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
			authorize: (credentials) => {
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
		}),
	],
	/* adapter: TypeORMLegacyAdapter({
		type: 'postgres',
		url: process.env.DB_URL,
		synchronize: true,
	}), */
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		session: ({ session, token }) => {
			session.user.id = token.id;

			return session;
		},
	},
	secret: process.env.SECRET,
	jwt: {
		secret: process.env.SECRET,
	},
	// custom auth pages
	pages: {
		// signIn: ""
	},
});
