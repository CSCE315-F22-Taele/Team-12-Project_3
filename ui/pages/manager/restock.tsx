import { getRestockReportAPI, serverSideInstance } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";

interface thisProp {
	restockItems: any;
}

interface Excess {
	itemName: string;
	sales: number;
	currentStock: number;
}

export default function Excess({ restockItems }: thisProp) {
	const router = useRouter();

	return (
		<>
			<StyledDiv>
				<StyledButton
					onClick={() => {
						router.push("/manager/reports");
					}}>
					Back
				</StyledButton>
			</StyledDiv>

			<StyledH1>Restock Report</StyledH1>

			<StyledDiv className="excess">{JSON.stringify(restockItems)}</StyledDiv>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = serverSideInstance(context);
	const response = await instance.get(getRestockReportAPI);
	const data = response.data;

	return {
		props: {
			restockItems: data["ingredients"],
		},
	};
}
