import { SessionProvider } from "next-auth/react";
import { ThemeProvider as RemoveFlicker } from "next-themes";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "@/s/globals.css";
import "nprogress/nprogress.css";
import { SetTheme } from "@/c/SetTheme";
import { SWRConfig } from "swr";
import Head from 'next/head';

const ProgressBar = dynamic(() => import("@/c/ProgressBar"), {
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
		<>
			<Head>
				<title>Rev POS System</title>
			</Head>
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
		</>
	);
}
