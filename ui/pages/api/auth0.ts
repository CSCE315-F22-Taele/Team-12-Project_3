import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
	idTokenSigningAlg: "HS256",
	clientSecret:
		process.env.AUTH0_CLIENT_SECRET ||
		process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
	baseURL: process.env.AUTH0_BASE_URL || process.env.AUTH0_BASE_URL,
	issuerBaseURL:
		process.env.AUTH0_ISSUER_BASE_URL ||
		process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
	authorizationParams: {
		scope: process.env.AUTH0_SCOPE || process.env.NEXT_PUBLIC_AUTH0_SCOPE,
		prompt: "consent",
	},
	secret: process.env.AUTH0_SECRET || process.env.NEXT_PUBLIC_AUTH0_SECRET,
	session: {
		cookie: {
			domain: process.env.AUTH0_ISSUER_BASE_URL,
		},
	},
}).handleAuth();
