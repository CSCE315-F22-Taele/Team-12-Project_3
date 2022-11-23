import { flaskAPI, getExcessReportProxyAPI } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { StyledDiv, StyledTheme } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import {
	Button,
	createTheme,
	Grid,
	Box,
	TextField,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Excess {
	itemName: string;
	sales: number;
	currentStock: number;
}

export default function Excess({ serverId }: { serverId: string }) {
	const router = useRouter();

	const [startDate, setStartDate] = useState("");
	const [excess, setExcess] = useState<Excess[]>([]);
	const currentDate = new Date().toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const getReport = async () => {
		const response = await flaskAPI({
			method: "get",
			url: getExcessReportProxyAPI,
			params: {
				startDate,
			},
		});
		const data = response.data;

		setExcess(data["items"]);
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

			<Typography variant="h1">Excess Report</Typography>

			<StyledDiv className="time-values">
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						inputFormat="MM/DD/YYYY"
						label="Start Date"
						value={startDate}
						onChange={(newValue) => {
							//should be 2022-11-17
							console.log(newValue);
							var fullDateWithOtherInfo =
								newValue.$d.toLocaleString();
							console.log(newValue.$d.getMonth());
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
				<label> Current date: </label>
				<TextField label={currentDate} disabled />
				<Button onClick={getReport}>Get Report</Button>

				{/* <StyledDiv className="excess">{JSON.stringify(excess)}</StyledDiv> */}
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
							sx={{ maxWidth: 700, maxHeight: 400 }}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Menu Item</TableCell>
										<TableCell align="right">
											Sales
										</TableCell>
										{/* <TableCell align="right">
											Current Stock
										</TableCell> */}
									</TableRow>
								</TableHead>
								<TableBody>
									{excess.map((eachItem) => (
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
											{/* <TableCell align="right">
												{eachItem.currentStock}
											</TableCell> */}
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
