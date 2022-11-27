import { Dispatch, SetStateAction } from "react";
import useSWR, { useSWRConfig } from "swr";
import OrderRow from "./OrderRow";
import { getOrdersProxyAPI } from "./utils";

export interface ServerOrder {
	orderId: string;
	customerName: string;
	serverId: string;
	timeOrdered: string;
	isServed: boolean;
	price: number;
	items: OrderItem[];
	show?: boolean;
}

export interface OrderItem {
	itemId: string;
	itemName: string;
	price: number;
	quantity: number;
	totalPrice: number;
}

interface thisProps {
	setSelectedOrders: Dispatch<SetStateAction<string[]>>;
}

export default function Orders({ setSelectedOrders }: thisProps) {
	// const { fallbackData } = useSWRConfig();
	const { data: orders } = useSWR(getOrdersProxyAPI);

	return (
		<>
			{orders.map((row: ServerOrder) => (
				<OrderRow
					key={row.customerName}
					order={row}
					setSelectedOrders={setSelectedOrders}
				/>
			))}
		</>
	);
}
