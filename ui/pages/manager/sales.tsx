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
	TextField,
	Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { flaskAPI, getSalesReportProxyAPI } from "../../components/utils";
import { StyledDiv } from "../../styles/mystyles";
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

interface Sale {
	itemName: string;
	revenue: number;
	sales: number;
}

export default function Sales({ serverId }: { serverId: string }) {
	const router = useRouter();

	const [startDate, setStartDate] = useState<string | null>("");
	const [endDate, setEndDate] = useState<string | null>("");
	const [shouldFetch, setShouldFetch] = useState(false);
	const { data: sales } = useSWR(
		shouldFetch ? getSalesReportProxyAPI : null,
		(url) =>
			flaskAPI({
				method: "get",
				url,
				params: {
					startDate,
					endDate,
				},
			}).then((r) => r.data.items)
	);

	const getReport = async () => {
		setShouldFetch(true);
	};

	return (
		<>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/manager/reports");
					}}>
					Back
				</Button>
			</StyledDiv>

			<Typography variant="h1">Sales Report</Typography>

			<StyledDiv>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						inputFormat="MM/DD/YYYY"
						label="Start Date"
						value={startDate}
						onChange={(newValue) => {
							//should be 2022-11-17
							// console.log(newValue);
							var fullDateWithOtherInfo =
								newValue.$d.toLocaleString();
							var date = fullDateWithOtherInfo
								.substring(
									0,
									fullDateWithOtherInfo.indexOf(",")
								)
								.split("/");
							var month = date[0];
							var day = date[1];
							var year = date[2];
							var parsedDate = year + "-" + month + "-" + day;
							// console.log("parsed", parsedDate);
							// console.log("asd", newValue.$d.toLocaleString());
							setStartDate(parsedDate);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						inputFormat="MM/DD/YYYY"
						label="End Date"
						value={endDate}
						onChange={(newValue) => {
							//should be 2022-11-17
							// console.log(newValue);
							var fullDateWithOtherInfo =
								newValue.$d.toLocaleString();
							var date = fullDateWithOtherInfo
								.substring(
									0,
									fullDateWithOtherInfo.indexOf(",")
								)
								.split("/");
							var month = date[0];
							var day = date[1];
							var year = date[2];
							var parsedDate = year + "-" + month + "-" + day;
							// console.log("parsed", parsedDate);
							// console.log("asd", newValue.$d.toLocaleString());
							setEndDate(parsedDate);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
				<Button onClick={getReport}>Get Report</Button>

				{/* <StyledDiv className="sales">{startDate + " " + endDate}</StyledDiv> */}
				{/* <StyledDiv className="sales">{JSON.stringify(sales)}</StyledDiv> */}
				<StyledDiv className="sales">
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
							sx={{ maxWidth: 700, maxHeight: 400 }}>
							<Table stickyHeader aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Menu Item</TableCell>
										<TableCell align="right">
											Sales
										</TableCell>
										<TableCell align="right">
											Revenue&nbsp;($)
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{sales?.map((eachItem: Sale) => (
										<TableRow
											key={eachItem.itemName}
											sx={{
												"&:last-child td, &:last-child th":
													{ border: 0 },
											}}>
											<TableCell
												component="th"
												scope="row">
												{eachItem.itemName}
											</TableCell>
											<TableCell align="right">
												{eachItem.sales}
											</TableCell>
											<TableCell align="right">
												{Math.round(
													eachItem.revenue * 100
												) / 100}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</StyledDiv>
			</StyledDiv>
		</>
	);
}
