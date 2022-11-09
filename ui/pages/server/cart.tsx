import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { flaskAPI } from "../../components/utils";

interface menuItem {
	itemId: string;
	itemName: string;
	price: number;
}

interface thisProp {
	serverId: string;
	menuItems: any;
}

interface Order {
	itemName: string;
	quantity: number;
	price: number;
}

interface expandString {
	displayString: string;
	show: boolean;
}

export default function Cart({ serverId, menuItems }: thisProp) {
	const router = useRouter();
	const menu: menuItem[] = menuItems["items"];

	const [customerName, setCustomerName] = useState("");
	const [selectedItem, setSelectedItem] = useState(menu[0].itemName);
	const [itemQuantity, setItemQuantity] = useState(0);
	const [itemPrice, setItemPrice] = useState(menu[0].price);
	const [orderList, setOrderList] = useState<Order[]>([]);
	const [expandedStringList, setExpandedString] = useState<expandString[]>(
		[]
	);

	const addToCart = () => {
		setOrderList([
			...orderList,
			{
				itemName: selectedItem,
				quantity: itemQuantity,
				price: itemQuantity * itemPrice,
			},
		]);

		console.log(itemPrice);
		var res: number = itemQuantity * itemPrice;
		console.log(res);
		setExpandedString([
			...expandedStringList,
			{
				displayString:
					"Price: " +
					itemQuantity * itemPrice +
					" Quantity: " +
					itemQuantity,
				show: false,
			},
		]);
	};

	const deleteAllInCart = () => {
		setOrderList([]);
		setSelectedItem(menu[0].itemName);
		setItemPrice(menu[0].price);
		setItemQuantity(0);
	};

	const submitOrder = async () => {
		const data = JSON.stringify({
			customerName: customerName,
			items: JSON.stringify(orderList),
			serverId: "74bfa9a8-7c52-4eaf-b7de-107c980751c4",
		});

		const config = {
			method: "post",
			url: "/add-order",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await flaskAPI(config);

		setCustomerName("");
		setOrderList([]);
	};

	const setItemStates = (event: ChangeEvent<HTMLSelectElement>) => {
		const indexOfSpace = event.target.value.lastIndexOf(" ");
		const menuObjectName = event.target.value.substring(0, indexOfSpace);
		const menuObjectPrice = event.target.value.substring(indexOfSpace + 1);
		setSelectedItem(menuObjectName);
		setItemPrice(Number(menuObjectPrice));
	};

	const addInfo = (index: number) => {
		expandedStringList[index].show = !expandedStringList[index].show;
		setExpandedString([...expandedStringList]);
	};

	// useEffect(() => {}, [expandedStringList]);

	return (
		<>
			<button
				onClick={() => {
					router.push("/server", undefined, { shallow: true });
				}}>
				Back
			</button>

			<h1>Cart</h1>

			<div className="MenuItemSelection">
				<select
					onChange={(e) => {
						setItemStates(e);
					}}
					className="menuItems">
					{menu.map((menuItem) => {
						return (
							<option
								value={
									menuItem.itemName + " " + menuItem.price
								}>
								{menuItem.itemName + ": $" + menuItem.price}
							</option>
						);
					})}
				</select>
				<input
					type="text"
					inputMode="numeric"
					placeholder="Enter quantity"
					onChange={(e) => {
						setItemQuantity(Number(e.target.value));
					}}
					className="Quantity"></input>
				<button onClick={addToCart}>Add</button>
			</div>
			<div className="itemsList">
				{orderList.map((order, index) => {
					return (
						<div key={index}>
							{order.itemName}
							<button onClick={() => addInfo(index)}>
								Expand
							</button>
							<button>Delete</button>
							{expandedStringList[index].show &&
								expandedStringList[index].displayString}
						</div>
					);
				})}
				{JSON.stringify(orderList)}
			</div>

			<div className="AddOrdersSection">
				<button onClick={deleteAllInCart}>Delete All</button>
				<input
					type="text"
					placeholder="Enter your name"
					onChange={(e) => {
						setCustomerName(e.target.value);
					}}
					className="CustomerName"></input>
				<button onClick={submitOrder}>Submit Order</button>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const response = await flaskAPI.get("/menu");
	const data = response.data;

	return {
		props: {
			menuItems: data,
		},
	};
}
