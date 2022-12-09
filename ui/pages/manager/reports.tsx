import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { StyledDiv } from "@/s/mystyles";
import NoAccess from "@/c/NoAccess";
import useGlobalUser from "@/h/useGlobalUser";
import Head from "next/head";

export default function Manager() {
	const router = useRouter();
	const { isAuthorized } = useGlobalUser();
	if (!isAuthorized()) {
		return <NoAccess />;
	}

	return (
		<>
			<Head>
				<title>Reports</title>
			</Head>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/manager/dashboard");
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
