import ContrastIcon from '@mui/icons-material/Contrast';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import {
	Box, 
	Backdrop,
	SpeedDial, 
	SpeedDialAction,
	SpeedDialIcon
} from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState, ReactNode, PropsWithChildren } from "react";
import { useToggleDarkMode, useToggleContrast } from './SetTheme';




export default function App({children}: PropsWithChildren) {
	const router = useRouter();
	const toggleContrast = useToggleContrast();
	const toggleDarkMode = useToggleDarkMode();

	const actions = [
		{ icon: <ContrastIcon />, name: 'High Contrast', button: toggleContrast},
		{ icon: <SettingsBrightnessIcon />, name: 'Dark Mode', button: toggleDarkMode},
		{ icon: <LocationOnIcon />, name: 'Google Maps', button: () => {router.push("../customer/gmaps")}},

	];
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<SpeedDial
				direction="up"
				ariaLabel="SpeedDial"
				sx={
					{ 
						flexGrow: 1,
						position: 'absolute',
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
