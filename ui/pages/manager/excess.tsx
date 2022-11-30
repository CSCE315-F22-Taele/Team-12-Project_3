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
import { LocalizationProvider, MuiPickersAdapterContext } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { flaskAPI, getExcessReportProxyAPI } from "../../components/utils";
import { StyledDiv } from "../../styles/mystyles";
import { SxProps } from "@mui/system"

interface Excess {
	itemName: string;
	sales: number;
	currentStock: number;
}

export default function Excess({ serverId }: { serverId: string }) {
	const router = useRouter();

	const [startDate, setStartDate] = useState("");
	const currentDate = new Date().toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const [shouldFetch, setShouldFetch] = useState(false);
	const { data: excess } = useSWR(
		shouldFetch ? getExcessReportProxyAPI : null,
		(url) =>
			flaskAPI({
				method: "get",
				url,
				params: {
					startDate,
				},
			}).then((r) => r.data.items)
	);

	const getReport = async () => {
		setShouldFetch(true);
	};

	//FIXME: this is only for dark mode in high contrast mode
	const popperSx: SxProps = {
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
		}
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
						PopperProps={{
							sx: popperSx
						}}
						onChange={(newValue) => {
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
