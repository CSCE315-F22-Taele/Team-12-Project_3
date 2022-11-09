import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

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
		const response = await axios({
			method: "get",
			url: "http://127.0.0.1:5000/api/orders/items/sales-report",
			params: {
				startDate,
				endDate,
			},
		});

		const data = response.data

		setSales(data["items"]);
	};

	return (
		<>
			<button
				onClick={() => {
					router.push("/manager", undefined);
				}}>
				Back
			</button>

			<h1>Sales Report</h1>

			<div className="time-values">
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
				<button onClick={getReport}>Get Report</button>

				<div className="sales">{startDate + " " + endDate}</div>
				<div className="sales">{JSON.stringify(sales)}</div>
			</div>
		</>
	);
}
