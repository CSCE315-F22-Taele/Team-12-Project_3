import { flaskAPI, getExcessReportProxyAPI } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box, TextField } from "@mui/material";
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
				<StyledButton
					onClick={() => {
						router.push("/manager/reports");
					}}>
					Back
				</StyledButton>
			</StyledDiv>

			<StyledH1>Excess Report</StyledH1>

			<StyledDiv className="time-values">
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
				<label> Current date: </label>
				<TextField 
					label={currentDate} disabled 
					/>
				<StyledButton onClick={getReport}>Get Report</StyledButton>

				<StyledDiv className="excess">{JSON.stringify(excess)}</StyledDiv>
			</StyledDiv>
		</>
	);
}
