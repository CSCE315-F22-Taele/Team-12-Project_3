import { useRouter } from "next/router";

export default function Manager() {
	const router = useRouter();

	return (
		<>
			<button
				onClick={() => {
					router.push("/", undefined);
				}}>
				Back
			</button>
			<h1>Manager</h1>
			<button
				onClick={() => {
					router.push("/manager/reports", undefined);
				}}>
				Reports
			</button>
			<button
				onClick={() => {
					router.push("/manager/menu", undefined);
				}}>
				Menu
			</button>
			<button
				onClick={() => {
					router.push("/manager/inventory", undefined);
				}}>
				Inventory
			</button>
		</>
	);
}
