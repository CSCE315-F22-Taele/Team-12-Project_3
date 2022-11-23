import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import {
	addOrderProxyAPI,
	flaskAPI,
	getMenuAPI,
	getMenuProxyAPI,
	serverSideInstance,
	addOrderAPI,
} from "../../components/utils";
import { StyledDiv, StyledTheme } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
//may not need table stuff. Left it here in case we want to display a table of menu items and they select
import { Typography, TextField, MenuItem, InputLabel } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";

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
	rowId: number;
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
	const [selectedItem, setSelectedItem] = useState("");
	const [itemQuantity, setItemQuantity] = useState(0);
	const [itemPrice, setItemPrice] = useState(0);
	const [orderList, setOrderList] = useState<OrderItem[]>([]);
	const [expandedStringList, setExpandedString] = useState<expandString[]>(
		[]
	);
	const [selectedDeleteList, setSelectedDeleteList] = useState<OrderItem[]>(
		[]
	);
	const [itemQuantityFirstPass, setItemQuantityFirstPass] = useState(true);
	const [customerNameFirstPass, setCustomerNameFirstPass] = useState(true);

	const tableColumns: GridColDef[] = [
		{
			field: "itemName",
			headerName: "Item Name",
			type: "string",
			width: 300,
		},
		{
			field: "quantity",
			headerName: "Quantity",
			type: "number",
			width: 150,
		},
		{ field: "price", headerName: "Price ($)", type: "number", width: 150 },
	];

	const setItemStates = (event: SelectChangeEvent) => {
		const indexOfSpace = event.target.value.lastIndexOf(" ");
		const menuObjectName = event.target.value.substring(0, indexOfSpace);
		const menuObjectPrice = event.target.value.substring(indexOfSpace + 1);
		setSelectedItem(menuObjectName);
		setItemPrice(Number(menuObjectPrice));
	};

	const addToCart = () => {
		if (itemQuantity <= 0 || selectedItem === "") {
			return;
		}

		if (orderList.some((order) => order.itemName === selectedItem)) {
			return;
		}

		setOrderList([
			...orderList,
			{
				rowId: Math.floor(Math.random() * (1000000 - 0 + 1) + 0),
				itemName: selectedItem,
				quantity: itemQuantity,
				price: itemQuantity * itemPrice,
			},
		]);

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
	};
	const deleteSelectedInCart = () => {
		setOrderList((orderList) =>
			orderList.filter(
				(row) =>
					!selectedDeleteList.some(
						(deletedItem) => deletedItem.rowId === row.rowId
					)
			)
		);
	};

	const submitOrder = async () => {
		if (customerName === "") {
			setCustomerNameFirstPass(false);
			return;
		}

		if (orderList.length === 0) {
			return;
		}

		const data = JSON.stringify({
			customerName: customerName,
			serverId: "74bfa9a8-7c52-4eaf-b7de-107c980751c4",
			items: orderList,
		});

		const config = {
			method: "POST",
			url: addOrderAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await flaskAPI(config);

		setOrderList([]);
	};

	const addInfo = (index: number) => {
		expandedStringList[index].show = !expandedStringList[index].show;
		setExpandedString([...expandedStringList]);
	};

	// useEffect(() => {}, [expandedStringList]);

	return (
		<>
			<Typography variant="h1">Cart</Typography>

			<StyledDiv className="MenuItemSelection">
				<FormControl sx={{ minWidth: 150 }}>
					<InputLabel>Item</InputLabel>
					<Select
						onChange={(event: SelectChangeEvent) => {
							setItemStates(event);
						}}
						className="menuItems"
						label={"Item"}>
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
				</FormControl>
				<TextField
					type="text"
					inputMode="numeric"
					label="Enter quantity"
					onChange={(e) => {
						setItemQuantity(Number(e.target.value));
						setItemQuantityFirstPass(false);
					}}
					error={itemQuantity <= 0 && !itemQuantityFirstPass}
					helperText={
						itemQuantity <= 0 && !itemQuantityFirstPass
							? "Please enter a positive number"
							: ""
					}
					className="Quantity"></TextField>
				<Button onClick={addToCart}>Add</Button>
			</StyledDiv>
			<StyledDiv
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "371px",
					margin: "40px",
				}}>
				<DataGrid
					getRowId={(r) => r.rowId}
					rows={orderList}
					columns={tableColumns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
					sx={{ maxWidth: 700, maxHeight: 700 }}
					onSelectionModelChange={(newSelection) => {
						const selectedIDs = new Set(newSelection);
						const selectedRows = orderList.filter((row) =>
							selectedIDs.has(row.rowId)
						);
						setSelectedDeleteList(selectedRows);
					}}
				/>
			</StyledDiv>

			<StyledDiv className="AddOrdersSection">
				<Button onClick={deleteSelectedInCart}>Delete Selected</Button>
				<Button onClick={deleteAllInCart}>Delete All</Button>
				<TextField
					type="text"
					label="Enter your name"
					onChange={(e) => {
						setCustomerName(e.target.value);
						setCustomerNameFirstPass(false);
					}}
					error={customerName === "" && !customerNameFirstPass}
					helperText={
						customerName === "" && !customerNameFirstPass
							? "Enter a name here"
							: ""
					}
					value={customerName}
					className="CustomerName"></TextField>
				<Button onClick={submitOrder}>Submit Order</Button>
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
