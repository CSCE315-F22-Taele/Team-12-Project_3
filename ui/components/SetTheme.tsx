import {
	CssBaseline,
	PaletteMode,
	ThemeProvider,
	useMediaQuery,
	Switch,
	FormControlLabel,
	SpeedDial,
	Box,
	SpeedDialAction,
	SpeedDialIcon
} from "@mui/material";
import ContrastIcon from '@mui/icons-material/Contrast';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Script from "next/script";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { StyledTheme, StyledThemeDark, StyledThemeHighContrast, StyledThemeDarkHighContrast, StyledDiv } from "../styles/mystyles";

const getTheme = (mode: PaletteMode) =>
	mode === "dark" ? StyledThemeDark : StyledTheme;
	// mode === "dark" ? StyledThemeDarkHighContrast : StyledThemeHighContrast;

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
		console.log(theme);
	};

	const toggleHighContrast = () => {
		
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* <FormControlLabel control={<Switch onClick={toggleContrast} />} label="Light Mode"/>
			<FormControlLabel control={<Switch onClick={toggleContrast} />} label="High Contrast Mode"/> */}
			
			{props.children}
		</ThemeProvider>
	);
}