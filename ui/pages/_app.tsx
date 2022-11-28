import { SessionProvider } from "next-auth/react";
import { ThemeProvider as RemoveFlicker } from "next-themes";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import SetTheme from "../components/SetTheme";
import { flaskAPI } from "../components/utils";
import "../styles/globals.css";

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
