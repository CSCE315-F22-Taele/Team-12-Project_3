import { useRouter } from "next/router";


export default function Manager() {
	const router = useRouter();

	return (
		<>
			<button onClick={() => {router.push("/", undefined, {shallow: true});}}>Back</button>
			<h1>Manager</h1>
			<button onClick={() => {router.push("/manager/reports", undefined, {shallow: true});}}>Reports</button>
			<button>Menu</button>
			<button>Inventory</button>
		</>
	);
}
