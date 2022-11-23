import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { StyledDiv } from "../../styles/mystyles";

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
