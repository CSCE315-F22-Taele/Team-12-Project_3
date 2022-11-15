import { flaskAPI, getExcessReportProxyAPI } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";

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
				<label> Start date: </label>
				<input
					type="date"
					className="start"
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<label> Current date: </label>
				<input placeholder={currentDate} readOnly />
				<StyledButton onClick={getReport}>Get Report</StyledButton>

				<StyledDiv className="excess">{JSON.stringify(excess)}</StyledDiv>
			</StyledDiv>
		</>
	);
}
