import { useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import {
	StyledTheme,
	StyledThemeDark,
	StyledThemeHighContrast,
} from "../styles/mystyles";

type setMode = "off" | "on" | "dark" | "light";

const getTheme = (mode: setMode) =>
	mode === "on"
		? StyledThemeHighContrast
		: mode === "dark"
		? StyledThemeDark
		: StyledTheme;

export default function useDarkMode() {
	const isPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	let colorMode: setMode = isPrefersDarkMode ? "dark" : "light";
	let isContrast: boolean = false;
	if (typeof window !== "undefined") {
		if (localStorage.getItem("theme")) {
			colorMode = localStorage.getItem("theme") as setMode;
		}
		if (localStorage.getItem("contrast")) {
			isContrast = (localStorage.getItem("contrast") as string) === "on";
		}
	}

	const [darkMode, setDarkMode] = useState<setMode>(colorMode);
	const [contrast, setContrast] = useState<setMode>(
		isContrast ? "on" : "off"
	);

	const theme = useMemo(
		() => getTheme(contrast === "on" ? "on" : darkMode),
		[darkMode, contrast]
	);

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => {
			const newMode = prevMode === "light" ? "dark" : "light";
			localStorage.setItem("theme", newMode);
			return newMode;
		});
		localStorage.setItem("contrast", "off");
		setContrast("off");
	};

	const toggleContrast = () => {
		setContrast((prevMode) => {
			const newMode = prevMode === "on" ? "off" : "on";
			localStorage.setItem("contrast", newMode);
			return newMode;
		});
	};

	return { theme, toggleContrast, toggleDarkMode };
}
