import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface thisProp {
	serverId: string;
	serverOrders: any;
}

interface OrderItem {
	itemId: string;
	itemName: string;
	price: number;
	quantity: number;
	totalPrice: number;
}

interface ServerOrder {
	orderId: string;
	customerName: string;
	serverId: string;
	timeOrdered: string;
	isServed: boolean;
	price: number;
	items: OrderItem[];
	show?: boolean;
}

export default function Server({ serverId, serverOrders }: thisProp) {
	const [orders, setOrders] = useState<ServerOrder[]>(serverOrders["orders"]);

	const serveOrder = () => {};

	const router = useRouter();

	const addInfo = (index: number) => {	
		orders[index].show = !orders[index].show;
		setOrders([...orders]);
	};

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
				{orders.map((order, index) => {
					const items = order["items"];
					return (
						<div key={index}>
							<label>{order.customerName}</label>
							{order.show &&
								order.items.map((item) => {
									return (
										item.itemName +
										"; Quantity: " +
										item.quantity +
										"; Price: " +
										item.price
									);
								})}
							{order.show && order.price}
							<button onClick={() => addInfo(index)}>
								Expand
							</button>
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

export async function getServerSideProps() {
	const data = JSON.stringify({
		serverId: "74bfa9a8-7c52-4eaf-b7de-107c980751c4",
	});

	const config = {
		method: "get",
		url: process.env.FLASK_URL + "/orders",
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	};

	const response = await axios(config);
	const orders = response.data;

	return {
		props: {
			serverOrders: orders,
		},
	};
}
