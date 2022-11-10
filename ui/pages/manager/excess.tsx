import { flaskAPI, getExcessReportProxyAPI } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";

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
			<button
				onClick={() => {
					router.push("/manager/reports");
				}}>
				Back
			</button>

			<h1>Excess Report</h1>

			<div className="time-values">
				<label> Start date: </label>
				<input
					type="date"
					className="start"
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<label> Current date: </label>
				<input placeholder={currentDate} readOnly />
				<button onClick={getReport}>Get Report</button>

				<div className="excess">{JSON.stringify(excess)}</div>
			</div>
		</>
	);
}
