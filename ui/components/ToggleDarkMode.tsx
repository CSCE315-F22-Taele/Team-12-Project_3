import { FormControlLabel, Switch } from "@mui/material";
import useDarkMode from "../hooks/useDarkMode";

interface Props {
	toggleDarkMode: () => void;
}

export default function App({toggleDarkMode}: Props) {
	return (
		<FormControlLabel
			control={<Switch onClick={toggleDarkMode} />}
			label="Dark Mode"
		/>
	);
}
