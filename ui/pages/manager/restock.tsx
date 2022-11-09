import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface thisProp {
	restockItems: any;
}

interface Excess {
	itemName: string;
	sales: number;
	currentStock: number;
}

export default function Excess({ restockItems }: thisProp) {
	const router = useRouter();

	return (
		<>
			<button
				onClick={() => {
					router.push("/manager");
				}}>
				Back
			</button>

			<h1>Excess Report</h1>

			<div className="excess">{JSON.stringify(restockItems)}</div>
		</>
	);
}

export async function getServerSideProps() {
	const response = await axios.get(
		process.env.FLASK_URL + "/inventory?restock-report"
	);
	const data = response.data;

	return {
		props: {
			restockItems: data["ingredients"],
		},
	};
}
