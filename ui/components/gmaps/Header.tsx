import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Button, InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Autocomplete } from "@react-google-maps/api";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "50ch",
			},
		},
		"&:not(placeholder-shown)": {
			width: "50ch",
		},
	},
})) as typeof InputBase;

interface Props {
	onLoad: (autoC: google.maps.places.Autocomplete) => void;
	onPlaceChanged: () => void;
}

export default function Header({ onLoad, onPlaceChanged }: Props) {
	const router = useRouter();
	return (
		<Box sx={{ flexGrow: 1, top: 0, zIndex: 1 }} position="sticky">
			<AppBar>
				<Toolbar>
					<Typography
						variant="h5"
						noWrap
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "none", sm: "block" },
						}}>
						Fun Finder
					</Typography>
					{/* <ToggleDarkMode /> */}
					<Button
						onClick={() => {
							router.back();
						}}>
						Back
					</Button>
					<Autocomplete
						onLoad={onLoad}
						onPlaceChanged={onPlaceChanged}>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>
					</Autocomplete>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
