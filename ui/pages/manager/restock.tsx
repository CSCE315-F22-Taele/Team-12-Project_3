import { getRestockReportAPI, serverSideInstance } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import { StyledDiv, StyledTheme } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Button, createTheme, Grid, Box, Table, TableContainer, TableCell, TableHead, Paper, TableRow, TableBody } from "@mui/material";

interface thisProp {
	restockItems: any;
}

interface Restock {
	ingredientId: string;
	ingredientName: number;
	quantity: number;
	threshold: number;
}

export default function Excess({ restockItems }: thisProp) {
	const router = useRouter();

	const [itemsToRestock, setRestockItems] = useState<Restock[]>(restockItems)

	return (
		<>
			<ThemeProvider theme={StyledTheme}>
				<StyledDiv>
					<Button
						onClick={() => {
							router.push("/manager/reports");
						}}>
						Back
					</Button>
				</StyledDiv>

				<Typography><h1>Restock Report</h1></Typography>

				<StyledDiv className="excess">
						<Box 
							sx={{
							display: 'flex',
							justifyContent: 'center',
							alignContent: 'center',
							p: 1,
							m: 1,
							bgcolor: 'background.paper',
							borderRadius: 1,
							}}>
							<TableContainer component={Paper} sx={{ maxWidth: 700, maxHeight: "75vh" }}>
								<Table aria-label="simple table">
									<TableHead>
									<TableRow>
										<TableCell>Menu Item</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Threshold</TableCell>
									</TableRow>
									</TableHead>
									<TableBody>
										{itemsToRestock.map((eachItem) => (
											<TableRow
												key={eachItem.ingredientName}
												sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
											>
												<TableCell component="th" scope="row">
													{eachItem.ingredientName}
												</TableCell>
												<TableCell align="right">{eachItem.quantity}</TableCell>
												<TableCell align="right">{eachItem.threshold}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</StyledDiv>
			</ThemeProvider>
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
