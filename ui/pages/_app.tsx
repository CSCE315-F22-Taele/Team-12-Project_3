import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ThemeProvider as RemoveFlicker } from "next-themes";
import SetTheme from "../components/SetTheme";

const ProgressBar = dynamic(() => import("../components/ProgressBar"), {
	ssr: false,
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	// block until loaded
	const [loading, setLoading] = useState(true);
	useEffect(() => setLoading(false), []);

	return (
		<RemoveFlicker>
			{!loading ? (
				<SessionProvider session={session}>
					<SetTheme>
						<Component {...pageProps} />
					</SetTheme>
					<ProgressBar />
				</SessionProvider>
			) : (
				""
			)}
		</RemoveFlicker>
	);
}
