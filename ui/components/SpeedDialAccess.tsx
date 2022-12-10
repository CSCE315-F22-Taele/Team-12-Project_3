import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import ContrastIcon from "@mui/icons-material/Contrast";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import {
	useFontValue,
	useIncrement,
	useToggleContrast,
	useToggleDarkMode,
} from "./SetTheme";

export default function App({ children }: PropsWithChildren) {
	const router = useRouter();
	const toggleContrast = useToggleContrast();
	const toggleDarkMode = useToggleDarkMode();
	const fontVal = useFontValue();
	const incrementFontSize = useIncrement();

	const actions = [
		{
			icon: <ContrastIcon />,
			name: "High Contrast",
			button: toggleContrast,
		},
		{
			icon: <SettingsBrightnessIcon />,
			name: "Dark Mode",
			button: toggleDarkMode,
		},
		{
			icon: <LocationOnIcon />,
			name: "Google Maps",
			button: () => {
				router.push("../customer/gmaps");
			},
		},
		{
			icon: <CenterFocusStrongIcon />,
			name: "Enlarge Text",
			button: incrementFontSize,
		},
		// { icon: <CropFreeIcon />, name: 'Default View'},
		// { icon: <CenterFocusWeakIcon />, name: 'Larger View'},
		// { icon: <CenterFocusStrongIcon />, name: 'Enlarged View'},
	];
	const [open, setOpen] = useState(false);
	const handleClick = () => setOpen(!open);

	return (
		<>
			<style jsx global>{`
				* {
					font-size: ${1 + fontVal}rem;
				}
			`}</style>
			<SpeedDial
				direction="up"
				ariaLabel="SpeedDial"
				sx={{
					// flexGrow: 1,
					position: "fixed",
					top: 0,
					bottom: 50,
					right: "95%",
					// boxShadow: "22px 22px 79px #120d0d,-22px -22px 79px #463535;",
				}}
				icon={<SpeedDialIcon />}
				onOpen={handleClick}
				onClose={() => setOpen(false)}
				onClick={() => setOpen(true)}
				open={open}>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.button}
						// open={true}
					/>
				))}
			</SpeedDial>
		</>
	);
}
