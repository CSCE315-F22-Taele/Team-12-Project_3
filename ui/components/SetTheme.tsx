import {
	Button,
	CssBaseline,
	PaletteMode,
	ThemeProvider,
	useMediaQuery,
} from "@mui/material";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { StyledTheme, StyledThemeDark } from "../styles/mystyles";

const getTheme = (mode: PaletteMode) =>
	mode === "dark" ? StyledThemeDark : StyledTheme;

export default function App(props: PropsWithChildren) {
	// logic for dark/high contrast mode
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	let colorMode: PaletteMode = prefersDarkMode ? "dark" : "light";
	if (typeof window !== "undefined") {
		if (localStorage.getItem("theme")) {
			colorMode = localStorage.getItem("theme") as PaletteMode;
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Button onClick={toggleContrast}>Toggle Contrast</Button>
			{props.children}
		</ThemeProvider>
	);
}
