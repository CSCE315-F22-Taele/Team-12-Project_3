import {
	flaskAPI,
	getOrdersAPI,
	getOrdersProxyAPI,
	serverSideInstance,
} from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { GetServerSidePropsContext } from "next";

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
	const [orders, setOrders] = useState<ServerOrder[]>(
		serverOrders["orders"] || []
	);

	const serveOrder = () => {};

	const router = useRouter();

	const addInfo = (index: number) => {
		orders[index].show = !orders[index].show;
		setOrders([...orders]);
	};

	/* const {data: session} = useSession()
	console.log(session?.user.id) */

	return (
		<>
			<div>
				<button
					onClick={() => {
						router.push("/");
					}}>
					Back
				</button>
				<button
					onClick={async (e) => {
						const url = await signOut({
							redirect: false,
							callbackUrl: "/",
						});
						router.push(url.url);
					}}>
					Sign Out
				</button>
			</div>
			<h1>Server</h1>
			<div className="ordersList">
				{orders.map((order, index) => {
					const items = order["items"];
					return (
						<div key={index}>
							<label>{order.customerName}</label>
							<button onClick={() => addInfo(index)}>
								Expand
							</button>
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
						</div>
					);
				})}
			</div>
			<button onClick={serveOrder}>Serve Order</button>
			<button
				onClick={() => {
					router.push("/server/cart");
				}}>
				Add New Order
			</button>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const data = JSON.stringify({
		serverId: "74bfa9a8-7c52-4eaf-b7de-107c980751c4",
	});

	const instance = serverSideInstance(context);
	const response = await instance({
		method: "get",
		url: getOrdersAPI,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	});
	const orders = response.data;

	return {
		props: {
			serverOrders: orders,
		},
	};
}
