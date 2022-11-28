import { Button, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
	addOrderProxyAPI,
	flaskAPI,
	getMenuAPI,
	getMenuProxyAPI,
	serverSideInstance,
} from "../../components/utils";
import { StyledDiv } from "../../styles/mystyles";
//may not need table stuff. Left it here in case we want to display a table of menu items and they select
import { InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";

interface menuItem {
	itemId: string;
	itemName: string;
	price: number;
}

interface thisProp {
	serverId: string;
	menu: any;
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

export default function Cart({ serverId, menu }: thisProp) {
	const router = useRouter();
	const { data: menuData } = useSWR(getMenuProxyAPI, {
		fallbackData: menu,
	});
	const menuItems: menuItem[] = menuData.items;

	const [selectedItem, setSelectedItem] = useState("");
	const quantityRef = useRef<HTMLInputElement | null>(null);
	const quantityElem = quantityRef.current;
	const customerNameRef = useRef<HTMLInputElement | null>(null);
	const customerNameElem = customerNameRef.current;
	const [itemPrice, setItemPrice] = useState(0);
	const [orderList, setOrderList] = useState<OrderItem[]>([]);
	const [expandedStringList, setExpandedString] = useState<expandString[]>(
		[]
	);
	const [selectedDeleteList, setSelectedDeleteList] = useState<Number[]>([]);
	const [itemQuantityFirstPass, setItemQuantityFirstPass] = useState(true);
	const [customerNameFirstPass, setCustomerNameFirstPass] = useState(true);
	const [rowNum, setRowNum] = useState(0);

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

	const addToCart = () => {
		if (
			!quantityElem ||
			Number(quantityElem.value) <= 0 ||
			selectedItem === ""
		) {
			return;
		}

		if (orderList.some((order) => order.itemName === selectedItem)) {
			return;
		}

		let numRow = rowNum;
		numRow++;
		setOrderList([
			...orderList,
			{
				rowId: numRow,
				itemName: selectedItem,
				quantity: Number(quantityElem.value),
				price: Number(quantityElem.value) * itemPrice,
			},
		]);
		setRowNum(numRow);

		setExpandedString([
			...expandedStringList,
			{
				displayString:
					"Price: " +
					Number(quantityElem.value) * itemPrice +
					" Quantity: " +
					quantityElem.value,
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
						(deletedItemId) => deletedItemId === row.rowId
					)
			)
		);
	};

	const submitOrder = async () => {
		if (!customerNameElem) return;
		if (customerNameElem.value === "") {
			setCustomerNameFirstPass(false);
			return;
		}

		if (orderList.length === 0) {
			return;
		}

		const data = JSON.stringify({
			customerName: customerNameElem.value,
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

		router.push("/server");
	};

	const setItemStates = (event: SelectChangeEvent) => {
		const indexOfSpace = event.target.value.lastIndexOf(" ");
		const menuObjectName = event.target.value.substring(0, indexOfSpace);
		const menuObjectPrice = event.target.value.substring(indexOfSpace + 1);
		setSelectedItem(menuObjectName);
		setItemPrice(Number(menuObjectPrice));
	};

	return (
		<>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/server");
					}}>
					Back
				</Button>
			</StyledDiv>

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
						{menuItems.map((menuItem, index) => {
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
					onChange={() => {
						setItemQuantityFirstPass(false);
					}}
					error={
						quantityElem &&
						Number(quantityElem.value) <= 0 &&
						!itemQuantityFirstPass
							? true
							: false
					}
					helperText={
						quantityElem &&
						Number(quantityElem.value) <= 0 &&
						!itemQuantityFirstPass
							? "Please enter a positive number"
							: ""
					}
					inputRef={quantityRef}
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
						const selectedRows = orderList
							.map((row) => {
								if (selectedIDs.has(row.rowId))
									return row.rowId;
								else return -1;
							})
							.filter((row) => row !== -1);
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
						setCustomerNameFirstPass(false);
					}}
					error={
						customerNameElem &&
						customerNameElem.value === "" &&
						!customerNameFirstPass
							? true
							: false
					}
					helperText={
						customerNameElem &&
						customerNameElem.value === "" &&
						!customerNameFirstPass
							? "Enter a name here"
							: ""
					}
					inputRef={customerNameRef}
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
			menu: data,
		},
	};
}