import { PaletteMode, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { StyledTheme, StyledThemeDark } from "../styles/mystyles";

const getTheme = (mode: PaletteMode) =>
	mode === "dark" ? StyledThemeDark : StyledTheme;

export default function useDarkMode() {
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

	const theme = useMemo(() => getTheme(mode), [mode]);
	const toggleDarkTheme = () => {
		setMode((prevMode) => {
			const newMode = prevMode === "light" ? "dark" : "light";
			localStorage.setItem("theme", newMode);
			return newMode;
		});
	};

	return { theme, toggleDarkTheme };
}
