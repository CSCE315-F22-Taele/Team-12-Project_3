import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as RemoveFlicker } from "next-themes";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
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
	const { theme, toggleDarkMode, toggleContrast} = useDarkMode();

	useEffect(() => setLoading(false), []);

	return (
		<RemoveFlicker>
			{!loading ? (
				<SessionProvider session={session}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Component
							{...pageProps}
							toggleDarkMode={toggleDarkMode}
							toggleContrast={toggleContrast}
						/>
					</ThemeProvider>
					<ProgressBar />
				</SessionProvider>
			) : (
				""
			)}
		</RemoveFlicker>
	);
}
