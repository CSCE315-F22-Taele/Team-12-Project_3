import NoAccess from "@/c/NoAccess";
import { getExcessReportAPI } from "@/c/utils";
import { StyledDiv, StyledThemeHighContrast } from "@/s/mystyles";
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
	useTheme,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import useSWR from "swr";

interface Excess {
	itemName: string;
	sales: number;
	currentStock: number;
}

export default function Excess() {
	const router = useRouter();

	const [startDate, setStartDate] = useState("");
	const [startDateFirstPass, setStartDateFirstPass] = useState(true);
	const currentDate = new Date().toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const [shouldFetch, setShouldFetch] = useState(false);
	const { data: excess, mutate } = useSWR(
		shouldFetch ? getExcessReportAPI : null,
		async (url) =>
			axios({
				url,
				params: {
					startDate,
				},
			}).then((r) => r.data.items)
	);

	const getReport = async () => {
		const start = new Date(String(startDate));
		const end = new Date(currentDate);

		if (!startDate || start > end) {
			setStartDateFirstPass(false);
			return;
		}

		setShouldFetch(true);
		mutate();
		setStartDateFirstPass(true);
	};

	const theme = useTheme();

	// useEffect(() => {}, [itemQuantitiesFirstPass]);

	const popperSx = useMemo(() => {
		var popperSx: SxProps = {};

		if (JSON.stringify(theme) === JSON.stringify(StyledThemeHighContrast)) {
			popperSx = {
				"& .MuiPaper-root": {
					border: "5px solid white",
					padding: 2,
					marginTop: 1,
				},
				"& .MuiPickersDay-dayWithMargin": {
					border: "2px solid white",
				},
				"& .MuiDayPicker-weekDayLabel": {
					color: "white",
				},
			};
		} else {
			popperSx = {};
		}
		return popperSx;
	}, [theme]);

	return (
		<>
			<Head>
				<title>Excess Report</title>
			</Head>
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
						PopperProps={{
							sx: popperSx,
						}}
						onChange={(newValue) => {
							var fullDateWithOtherInfo = new Date(
								newValue!
							).toLocaleString("en-US", { timeZone: "UTC" });
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
							setStartDate(parsedDate);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								error={!startDateFirstPass ? true : false}
								helperText={
									!startDateFirstPass
										? "Start date not valid"
										: ""
								}
							/>
						)}
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
							<Table stickyHeader aria-label="simple table">
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
									{excess?.map((eachItem: Excess) => (
										<TableRow
											key={eachItem.itemName}
											// sx={{
											// 	"&:last-child td, &:last-child th":
											// 		{ border: 0 },
											// }}
										>
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
