import { useRouter } from "next/router";

const fetcher = async () => {
	const response = await fetch("http://");
	const data = response.json();
	return data;
};

export default function Server() {
	const orderList: string[] = ["one", "two", "three", "four"];

	const serveOrder = () => {};

	const router = useRouter();
	return (
		<>
			<button
				onClick={() => {
					router.push("/");
				}}>
				Back
			</button>
			<h1>Server</h1>
			<div className="ordersList">
				{orderList.map((order, index) => {
					return (
						<div key={index}>
							<h1>{order}</h1>
							<button>Expand</button>
						</div>
					);
				})}
			</div>
			<button onClick={serveOrder}>Serve Order</button>
			<button
				onClick={() => {
					router.push("/server/cart", undefined, { shallow: true });
				}}>
				Add New Order
			</button>
		</>
	);
}
