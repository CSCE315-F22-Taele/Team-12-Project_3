import NoAccess from "@/c/NoAccess";
import { serverSideInstance } from "@/c/serverSideUtils";
import { getRestockReportAPI } from "@/c/utils";
import { StyledDiv } from "@/s/mystyles";
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

interface thisProp {
	restockData: any;
}

interface Restock {
	ingredientId: string;
	ingredientName: number;
	quantity: number;
	threshold: number;
}

export default function Excess({ restockData }: thisProp) {
	const router = useRouter();

	const { data: restockItems } = useSWR(getRestockReportAPI, {
		fallbackData: restockData,
		fetcher: (url) => axios(url).then((r) => r.data.ingredients),
	});

	return (
		<>
			<Head>
				<title>Restock Report</title>
			</Head>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/manager/reports");
					}}>
					Back
				</Button>
			</StyledDiv>

			<Typography variant="h1">Restock Report</Typography>

			<StyledDiv className="excess">
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						p: 1,
						m: 1,
						bgcolor: "background.paper",
						borderRadius: 1,
					}}>
					<TableContainer
						component={Paper}
						sx={{ maxWidth: 700, maxHeight: "75vh" }}>
						<Table stickyHeader aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Menu Item</TableCell>
									<TableCell align="right">
										Quantity
									</TableCell>
									<TableCell align="right">
										Threshold
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{restockItems.map((eachItem: Restock) => (
									<TableRow key={eachItem.ingredientName}>
										<TableCell component="th" scope="row">
											{eachItem.ingredientName}
										</TableCell>
										<TableCell align="right">
											{eachItem.quantity}
										</TableCell>
										<TableCell align="right">
											{eachItem.threshold}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</StyledDiv>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = await serverSideInstance(context);
	const response = await instance({
		url: getRestockReportAPI,
		// params: {
		// 	"restock-report": "",
		// },
	});
	const data = response.data.ingredients;

	return {
		props: {
			restockData: data,
		},
	};
}
