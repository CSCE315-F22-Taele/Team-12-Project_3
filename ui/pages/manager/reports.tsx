import { useRouter } from "next/router";
import { StyledDiv, StyledTheme } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box, Typography } from "@mui/material";

export default function Manager() {
	const router = useRouter();

	return (
		<>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/manager");
					}}>
					Back
				</Button>
			</StyledDiv>
			<Typography variant="h1">Reports</Typography>

			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/manager/sales");
					}}>
					Sales
				</Button>
				<Button
					onClick={() => {
						router.push("/manager/excess");
					}}>
					Excess
				</Button>
				<Button
					onClick={() => {
						router.push("/manager/restock");
					}}>
					Restock
				</Button>
			</StyledDiv>
		</>
	);
}
