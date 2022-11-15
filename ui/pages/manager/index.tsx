import { signOut } from "next-auth/react";
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
						router.push("/", undefined);
					}}>
					Back
				</StyledButton>
				<StyledButton
					onClick={async (e) => {
						const url = await signOut({
							redirect: false,
							callbackUrl: "/",
						});
						router.push(url.url);
					}}>
					Sign Out
				</StyledButton>
			</StyledDiv>
			<StyledH1>Manager</StyledH1>
			
			<StyledDiv>
				<StyledButton
					onClick={() => {
						router.push("/manager/reports", undefined);
					}}>
					Reports
				</StyledButton>
				<StyledButton
					onClick={() => {
						router.push("/manager/menu", undefined);
					}}>
					Menu
				</StyledButton>
				<StyledButton
					onClick={() => {
						router.push("/manager/inventory", undefined);
					}}>
					Inventory
				</StyledButton>
			</StyledDiv>
		</>
	);
}
