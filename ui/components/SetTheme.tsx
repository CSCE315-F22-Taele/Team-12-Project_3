import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useFontSize from "../hooks/useFontSize";
import SpeedDialAccess from "./SpeedDialAccess";
import TranslatedText from "./Translate";

const IncrementContext = createContext(() => { }); // Initialize to an empty function
const FontSizeContext = createContext(0); // Initialize to state
const DarkModeContext = createContext(() => { });
const ContrastContext = createContext(() => { });

export function useToggleDarkMode() {
	return useContext(DarkModeContext);
}

export function useToggleContrast() {
	return useContext(ContrastContext);
}

export function useFontValue() {
	return useContext(FontSizeContext);
}

export function useIncrement() {
	return useContext(IncrementContext);
}

export function SetTheme({ children }: PropsWithChildren) {
	const { theme, toggleContrast, toggleDarkMode } = useDarkMode();
	const { fontSize, increment } = useFontSize();
	useEffect(() => console.log(fontSize), [fontSize]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<FontSizeContext.Provider value={fontSize}>
				<IncrementContext.Provider value={increment}>
					<ContrastContext.Provider value={toggleContrast}>
						<DarkModeContext.Provider value={toggleDarkMode}>
							<TranslatedText>
								<SpeedDialAccess />
								{children}
								{/* </SpeedDialAccess> */}
							</TranslatedText>
						</DarkModeContext.Provider>
					</ContrastContext.Provider>
				</IncrementContext.Provider>
			</FontSizeContext.Provider>
		</ThemeProvider>
	);
}
