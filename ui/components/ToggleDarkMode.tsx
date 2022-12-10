import { FormControlLabel, Switch } from "@mui/material";
import { useToggleDarkMode } from "./SetTheme";

export default function App() {
	const toggleDarkMode = useToggleDarkMode();

	return (
		<FormControlLabel
			control={<Switch onClick={toggleDarkMode} />}
			label="Dark Mode"
		/>
	);
}
