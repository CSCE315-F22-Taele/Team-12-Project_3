import ContrastIcon from '@mui/icons-material/Contrast';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import {
	Box, SpeedDial, SpeedDialAction,
	SpeedDialIcon
} from "@mui/material";

interface Props {
	toggleContrast: () => void;
	toggleDarkMode: () => void;
}

export default function App({toggleContrast, toggleDarkMode}: Props) {
	const actions = [
		{ icon: <ContrastIcon />, name: 'High Contrast', button: toggleContrast},
		{ icon: <SettingsBrightnessIcon />, name: 'Dark Mode', button: toggleDarkMode},
	];

	return (
        <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
				<SpeedDial
					direction="left"
					ariaLabel="SpeedDial basic example"
					sx={{ position: 'absolute', bottom: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					
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
			</Box>
	);
}
