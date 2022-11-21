import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import {
	CssBaseline,
	PaletteMode,
	ThemeProvider,
	useMediaQuery,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { StyledTheme, StyledThemeDark } from "../styles/mystyles";
import { ThemeProvider as RemoveFlicker } from "next-themes";

const ProgressBar = dynamic(() => import("../components/ProgressBar"), {
	ssr: false,
});

const getTheme = (mode: PaletteMode) =>
	mode === "dark" ? StyledThemeDark : StyledTheme;

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	// logic for dark/high contrast mode
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	let colorMode: PaletteMode = prefersDarkMode ? "dark" : "light";
	if (typeof window !== "undefined") {
		if (localStorage.getItem("colorMode")) {
			colorMode = localStorage.getItem("colorMode") as PaletteMode;
		}
	}
	const [mode, setMode] = useState<PaletteMode>(colorMode);

	useEffect(() => {
		setMode(colorMode);
	}, [colorMode]);
	// console.log(colorMode);

	const theme = useMemo(() => getTheme(mode), [mode]);
	const toggleContrast = () => {
		setMode((prevMode) => {
			const newMode = prevMode === "light" ? "dark" : "light";
			localStorage.setItem("theme", newMode);
			return newMode;
		});
	};

	// block until loaded
	const [loading, setLoading] = useState(true);
	useEffect(() => setLoading(false), []);

	return (
		<RemoveFlicker>
			{!loading ? (
				<SessionProvider session={session}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Component
							{...pageProps}
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
