import { getRestockReportAPI, serverSideInstance } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";

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
					router.push("/manager/reports");
				}}>
				Back
			</button>

			<h1>Restock Report</h1>

			<div className="excess">{JSON.stringify(restockItems)}</div>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = serverSideInstance(context);
	const response = await instance.get(getRestockReportAPI);
	const data = response.data;

	return {
		props: {
			restockItems: data,
		},
	};
}
