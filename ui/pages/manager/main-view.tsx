import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { StyledDiv } from "@/s/mystyles";

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
					<Button
						onClick={async (e) => {
							const url = await signOut({
								redirect: false,
								callbackUrl: "/",
							});
							router.push(url.url);
						}}>
						Sign Out
					</Button>
				</StyledDiv>
				<Typography variant="h1">Manager</Typography>

				<StyledDiv>
					<Button
						onClick={() => {
							router.push("/manager/reports");
						}}>
						Reports
					</Button>
					<Button
						onClick={() => {
							router.push("/manager/menu");
						}}>
						Menu
					</Button>
					<Button
						onClick={() => {
							router.push("/manager/inventory");
						}}>
						Inventory
					</Button>
				</StyledDiv>
		</>
	);
}
