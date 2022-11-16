import { useRouter } from "next/router";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";

export default function Manager() {
	const router = useRouter();

	return (
		<>
			<StyledDiv>
				<StyledButton
					onClick={() => {
						router.push("/manager");
					}}>
					Back
				</StyledButton>
			</StyledDiv>
			<StyledH1>Reports</StyledH1>

			<StyledDiv>
				<StyledButton
					onClick={() => {
						router.push("/manager/sales");
					}}>
					Sales
				</StyledButton>
				<StyledButton
					onClick={() => {
						router.push("/manager/excess");
					}}>
					Excess
				</StyledButton>
				<StyledButton
					onClick={() => {
						router.push("/manager/restock");
					}}>
					Restock
				</StyledButton>
			</StyledDiv>
		</>
	);
}
