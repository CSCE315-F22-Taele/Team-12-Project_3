import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import {
	createTheme,
	CssBaseline,
	PaletteMode,
	Paper,
	ThemeProvider,
	useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
import { amber, grey, deepOrange } from "@mui/material/colors";

const ProgressBar = dynamic(() => import("../components/ProgressBar"), {
	ssr: false,
});

const getColorMode = (mode: PaletteMode) => ({
	palette: {
		mode,
		/* 		...(mode === "light"
			? {
					// palette values for light mode
					primary: amber,
					divider: amber[200],
					text: {
						primary: grey[900],
						secondary: grey[800],
					},
			  }
			: {
					// palette values for dark mode
					primary: deepOrange,
					divider: deepOrange[700],
					background: {
						default: deepOrange[900],
						paper: deepOrange[900],
					},
					text: {
						primary: "#fff",
						secondary: grey[500],
					},
			  }), */
	},
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	// logic for dark/high contrast mode
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState<PaletteMode>(
		prefersDarkMode ? "dark" : "light"
	);
	const theme = useMemo(() => createTheme(getColorMode(mode)), [mode]);
	const toggleContrast = () => {
		setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	};

	return (
		<SessionProvider session={session}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} toggleContrast={toggleContrast} />
			</ThemeProvider>
			<ProgressBar />
		</SessionProvider>
	);
}
