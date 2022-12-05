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
		{ icon: <GTranslateIcon />, name: 'Google Translate'},

	];
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
        <Box sx={{ height: "100vh", transform: 'translateZ(0px)', flexGrow: 1 }}>
			<Backdrop open={open} />
			<SpeedDial
				direction="up"
				ariaLabel="SpeedDial"
				sx={{ position: 'absolute', bottom: 50, right: "95%" }}
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
			{children}
		</Box>
	);
}
