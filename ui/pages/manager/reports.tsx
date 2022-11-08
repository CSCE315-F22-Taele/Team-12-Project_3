import { useRouter } from "next/router";


export default function Manager() {
	const router = useRouter();

	return (
		<>
			<button onClick={() => {router.push("/manager", undefined, {shallow: true});}}>Back</button>
			<h1>Manager</h1>
			<button onClick={() => {router.push("/manager/sales", undefined, {shallow: true});}}>Sales</button>
			<button onClick={() => {router.push("/manager/excess", undefined, {shallow: true});}}>Excess</button>
			<button onClick={() => {router.push("/manager/restock", undefined, {shallow: true});}}>Restock</button>
		</>
	);
}
