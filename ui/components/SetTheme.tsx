import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, PropsWithChildren, useContext } from "react";
import useDarkMode from "../hooks/useDarkMode";
import SpeedDialAccess from "./SpeedDialAccess";
import TranslatedText from "./Translate";


const DarkModeContext = createContext(() => {});
const ContrastContext = createContext(() => {});

export function useToggleDarkMode() {
	return useContext(DarkModeContext);
}

export function useToggleContrast() {
	return useContext(ContrastContext);
}



export function SetTheme({ children }: PropsWithChildren) {
	const { theme, toggleContrast, toggleDarkMode } = useDarkMode();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ContrastContext.Provider value={toggleContrast}>
				<DarkModeContext.Provider value={toggleDarkMode}>
					<TranslatedText>
						<SpeedDialAccess/>
							{children}
						{/* </SpeedDialAccess> */}
					</TranslatedText>
				</DarkModeContext.Provider>
			</ContrastContext.Provider>
		</ThemeProvider>
	);
}
