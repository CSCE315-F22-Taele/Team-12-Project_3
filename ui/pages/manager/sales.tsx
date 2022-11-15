import { flaskAPI, getSalesReportProxyAPI } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";

interface Sale {
	itemName: string;
	revenue: number;
	sales: number;
}

export default function Sales({ serverId }: { serverId: string }) {
	const router = useRouter();

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
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
			<StyledDiv>
				<StyledButton
					onClick={() => {
						router.push("/manager/reports");
					}}>
					Back
				</StyledButton>
			</StyledDiv>

			<StyledH1>Sales Report</StyledH1>

			<StyledDiv className="time-values">
				<label> Start date: </label>
				<input
					type="date"
					className="start"
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<label> End date: </label>
				<input
					type="date"
					className="end"
					onChange={(e) => setEndDate(e.target.value)}
				/>
				<StyledButton onClick={getReport}>Get Report</StyledButton>

				<StyledDiv className="sales">{startDate + " " + endDate}</StyledDiv>
				<StyledDiv className="sales">{JSON.stringify(sales)}</StyledDiv>
			</StyledDiv>
		</>
	);
}
