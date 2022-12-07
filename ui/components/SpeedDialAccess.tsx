import ContrastIcon from '@mui/icons-material/Contrast';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import CropFreeIcon from '@mui/icons-material/CropFree';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import {
	Box,
	Backdrop,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon
} from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState, ReactNode, PropsWithChildren } from "react";
import { useIncrement, useToggleDarkMode, useToggleContrast, useFontValue } from './SetTheme';




export default function App({ children }: PropsWithChildren) {
	const router = useRouter();
	const toggleContrast = useToggleContrast();
	const toggleDarkMode = useToggleDarkMode();
	const fontVal = useFontValue();
	const incrementFontSize = useIncrement();

	const actions = [
		{ icon: <ContrastIcon />, name: 'High Contrast', button: toggleContrast },
		{ icon: <SettingsBrightnessIcon />, name: 'Dark Mode', button: toggleDarkMode },
		{ icon: <LocationOnIcon />, name: 'Google Maps', button: () => { router.push("../customer/gmaps") } },
		{ icon: <LocationOnIcon />, name: 'Increase Font Size', button: incrementFontSize },
		// { icon: <CropFreeIcon />, name: 'Default View'},
		// { icon: <CenterFocusWeakIcon />, name: 'Larger View'},
		// { icon: <CenterFocusStrongIcon />, name: 'Enlarged View'},


	];
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
				sx={
					{
						// flexGrow: 1,
						position: 'fixed',
						top: 0,
						bottom: 50,
						right: "95%"
					}
				}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.button}
					/>
				))}
			</SpeedDial>

		</>
	);
}
