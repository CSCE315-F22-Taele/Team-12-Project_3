import { FormControlLabel, Switch } from "@mui/material";
import useDarkMode from "../hooks/useDarkMode";

interface Props {
	toggleDarkTheme: () => void;
}

export default function App({toggleDarkTheme}: Props) {
	return (
		<FormControlLabel
			control={<Switch onClick={toggleDarkTheme} />}
			label="Dark Mode"
		/>
	);
}
