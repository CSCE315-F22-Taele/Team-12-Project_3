import { useRouter } from "next/router";
import { useState } from "react";
import { start } from "repl";
import useSWR from "swr";
import dayjs from "dayjs";

const fetcher = async () => {
	const response = await fetch("link");
	const data = response.json();
	return data;
};

export default function Server({ serverId }: { serverId: string }) {
	const orderList: string[] = ["three", "four"];
	const menuItemsList: string[] = ["sales", "testing"];
	const [startDate, setStartDate] = useState("")
	const [endDate, setEndDate] = useState("")


	const router = useRouter();
	return (
		<>
			<button
				onClick={() => {
					router.push("/server", undefined, { shallow: true });
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
				<button>Update</button>
			</div>
		</>
	);
}
