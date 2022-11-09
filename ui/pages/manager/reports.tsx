import { useRouter } from "next/router";

export default function Manager() {
	const router = useRouter();

	return (
		<>
			<button
				onClick={() => {
					router.push("/manager", undefined);
				}}>
				Back
			</button>
			<h1>Reports</h1>
			<button
				onClick={() => {
					router.push("/manager/sales", undefined);
				}}>
				Sales
			</button>
			<button
				onClick={() => {
					router.push("/manager/excess", undefined);
				}}>
				Excess
			</button>
			<button
				onClick={() => {
					router.push("/manager/restock", undefined);
				}}>
				Restock
			</button>
		</>
	);
}
