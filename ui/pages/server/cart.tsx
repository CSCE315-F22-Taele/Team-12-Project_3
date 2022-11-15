import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
	addOrderProxyAPI,
	flaskAPI,
	getMenuAPI,
	getMenuProxyAPI,
	serverSideInstance,
} from "../../components/utils";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
//may not need table stuff. Left it here in case we want to display a table of menu items and they select
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, InputLabel } from '@mui/material';


interface menuItem {
	itemId: string;
	itemName: string;
	price: number;
}

interface thisProp {
	serverId: string;
	menuItems: any;
}

interface OrderItem {
	itemName: string;
	quantity: number;
	price?: number;
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
	const [orderList, setOrderList] = useState<OrderItem[]>([]);
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

		var res: number = itemQuantity * itemPrice;
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
			serverId: "74bfa9a8-7c52-4eaf-b7de-107c980751c4",
			items: orderList,
		});

		const config = {
			method: "POST",
			url: addOrderProxyAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await flaskAPI(config);

		setOrderList([]);
	};

	// const setItemStates = (event: ChangeEvent<HTMLSelectElement>) => {
	const setItemStates = (event: SelectChangeEvent) => {
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
			<StyledDiv>
				<StyledButton
					onClick={() => {
						router.push("/server");
					}}>
					Back
				</StyledButton>
			</StyledDiv>
			

			<StyledH1>Cart</StyledH1>

			<StyledDiv className="MenuItemSelection">
				<Select
					onChange={(event: SelectChangeEvent) => {
						setItemStates(event);
					}}
					className="menuItems">
					{menu.map((menuItem, index) => {
						return (
							<MenuItem
								key={index}
								value={
									menuItem.itemName + " " + menuItem.price
								}>
								{menuItem.itemName + ": $" + menuItem.price}
							</MenuItem>
						);
					})}
				</Select>
				<TextField
					type="text"
					inputMode="numeric"
					label="Enter quantity"
					onChange={(e) => {
						setItemQuantity(Number(e.target.value));
					}}
					className="Quantity"></TextField>
				<StyledButton onClick={addToCart}>Add</StyledButton>
			</StyledDiv>
			<StyledDiv className="itemsList">
				{orderList.map((order, index) => {
					return (
						<StyledDiv key={index}>
							{order.itemName}
							<StyledButton onClick={() => addInfo(index)}>
								Expand
							</StyledButton>
							<StyledButton>Delete</StyledButton>
							{expandedStringList[index].show &&
								expandedStringList[index].displayString}
						</StyledDiv>
					);
				})}
				{JSON.stringify(orderList)}
			</StyledDiv>

			<StyledDiv className="AddOrdersSection">
				<StyledButton onClick={deleteAllInCart}>Delete All</StyledButton>
				<TextField
					type="text"
					label="Enter your name"
					onChange={(e) => {
						setCustomerName(e.target.value);
					}}
					value={customerName}
					className="CustomerName"></TextField>
				<StyledButton onClick={submitOrder}>Submit Order</StyledButton>
			</StyledDiv>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = serverSideInstance(context);
	const response = await instance.get(getMenuAPI);
	const data = response.data;

	return {
		props: {
			menuItems: data,
		},
	};
}
