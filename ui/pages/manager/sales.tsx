import { flaskAPI, getSalesReportProxyAPI } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { StyledDiv, StyledTheme } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
	const [sales, setSales] = useState<Sale[]>([]);

	const getReport = async () => {
		const response = await flaskAPI({
			method: "get",
			url: getSalesReportProxyAPI,
			params: {
				startDate,
				endDate,
			},
		});

		const data = response.data;

		setSales(data["items"]);
	};

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

				<Typography><h1>Sales Report</h1></Typography>

				{/* <StyledDiv className="time-values">
					<label> Start date: </label>
					<input
						type="date"
						className="start"
						onChange={(e) => {
							console.log(e.target.value);
							setStartDate(e.target.value)
						}}
					/>
					<label> End date: </label>
					<input
						type="date"
						className="end"
						onChange={(e) => setEndDate(e.target.value)}
					/>
					<Button onClick={getReport}>Get Report</Button>

					<StyledDiv className="sales">{startDate + " " + endDate}</StyledDiv>
					<StyledDiv className="sales">{JSON.stringify(sales)}</StyledDiv>
				</StyledDiv> */}
				<StyledDiv>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
								inputFormat="MM/DD/YYYY"
								label="Start Date"
								value={startDate}
								onChange={(newValue) => {
									//should be 2022-11-17
									// console.log(newValue);
									var fullDateWithOtherInfo = newValue.$d.toLocaleString();
									var date = fullDateWithOtherInfo.substring(0, fullDateWithOtherInfo.indexOf(",")).split("/");
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
									var fullDateWithOtherInfo = newValue.$d.toLocaleString();
									var date = fullDateWithOtherInfo.substring(0, fullDateWithOtherInfo.indexOf(",")).split("/");
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
							display: 'flex',
							justifyContent: 'center',
							alignContent: 'center',
							p: 1,
							m: 1,
							bgcolor: 'background.paper',
							borderRadius: 1,
							}}>
							<TableContainer component={Paper} sx={{ maxWidth: 700, maxHeight: 400 }}>
								<Table aria-label="simple table">
									<TableHead>
									<TableRow>
										<TableCell>Menu Item</TableCell>
										<TableCell align="right">Sales</TableCell>
										<TableCell align="right">Revenue&nbsp;($)</TableCell>
									</TableRow>
									</TableHead>
									<TableBody>
										{sales.map((eachItem) => (
											<TableRow
												key={eachItem.itemName}
												sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
											>
												<TableCell component="th" scope="row">
													{eachItem.itemName}
												</TableCell>
												<TableCell align="right">{eachItem.sales}</TableCell>
												<TableCell align="right">{eachItem.revenue}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</StyledDiv>
				</StyledDiv>
			</ThemeProvider>
		</>
	);
}
