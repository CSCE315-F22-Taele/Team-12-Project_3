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
import { StyledDiv, StyledTheme } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
//may not need table stuff. Left it here in case we want to display a table of menu items and they select
import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	MenuItem,
	InputLabel,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

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
	const [selectedItem, setSelectedItem] = useState(menu[0].itemName);
	const [itemQuantity, setItemQuantity] = useState(0);
	const [itemPrice, setItemPrice] = useState(menu[0].price);
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

	const addToCart = () => {
		if (itemQuantity <= 0) return;

		setOrderList([
			...orderList,
			{
				rowId: Math.floor(Math.random() * (1000000 - 0 + 1) + 0),
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

		setSelectedItem("");
		setItemQuantity(0);
		setItemQuantityFirstPass(true);
	};

	const deleteAllInCart = () => {
		setOrderList([]);
		setSelectedItem(menu[0].itemName);
		setItemPrice(menu[0].price);
		setItemQuantity(0);
	};
	const deleteSelectedInCart = () => {
		setOrderList(selectedDeleteList);
		setSelectedItem(menu[0].itemName);
		setItemPrice(menu[0].price);
		setItemQuantity(0);
	};

	const submitOrder = async () => {
		if (customerName === "") {
			setCustomerNameFirstPass(false);
			return;
		}

		const data = JSON.stringify({
			customerName: customerName,
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

		// router.push("/");
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
			<ThemeProvider theme={StyledTheme}>
				<Typography>
					<h1>Cart</h1>
				</Typography>

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
					className="itemsList"
					sx={{ textAlign: "-webkit-center", margin: "40px" }}>
					<div style={{ height: 400, width: "100%" }}>
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
								const selectedRows = orderList.filter(
									(row) => !selectedIDs.has(row.rowId)
								);
								setSelectedDeleteList(selectedRows);
							}}
						/>
					</div>
					{/* {JSON.stringify(orderList)} */}
				</StyledDiv>

				<StyledDiv className="AddOrdersSection">
					<Button onClick={deleteSelectedInCart}>
						Delete Selected
					</Button>
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
			</ThemeProvider>
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
