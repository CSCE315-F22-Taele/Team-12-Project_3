import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import OrderRow from "./OrderRow";
import { getOrdersAPI } from "./utils";

export interface ServerOrder {
	orderId?: string;
	customerName?: string;
	serverId?: string;
	timeOrdered?: string;
	isServed?: boolean;
	price?: number;
	items?: OrderItem[];
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
	orders: ServerOrder[]
	setSelectedOrders: Dispatch<SetStateAction<string[]>>;
}

export default function Orders({orders, setSelectedOrders }: thisProps) {
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
