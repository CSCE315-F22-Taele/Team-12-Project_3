import { addOrderAPI, getMenuAPI } from "@/c/utils";
import { StyledDiv } from "@/s/mystyles";
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography
} from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
//may not need table stuff. Left it here in case we want to display a table of menu items and they select
import NoAccess from "@/c/NoAccess";
import { serverSideInstance } from "@/c/serverSideUtils";
import useGlobalUser from "@/h/useGlobalUser";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import Head from "next/head";

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

export default function Cart({ serverId, menu }: thisProp) {
	const router = useRouter();
	const { session, isAuthorized } = useGlobalUser();

	const { mutate } = useSWRConfig();
	const { data: menuData } = useSWR(getMenuAPI, {
		fallbackData: menu,
	});
	const menuItems: menuItem[] = menuData.items;

	const [selectedItem, setSelectedItem] = useState("");
	const [itemQuantity, setItemQuantity] = useState(0);
	const customerNameRef = useRef<HTMLInputElement | null>(null);
	const customerNameElem = customerNameRef.current;
	const [itemPrice, setItemPrice] = useState(0);
	const [orderList, setOrderList] = useState<OrderItem[]>([]);
	const [selectedDeleteList, setSelectedDeleteList] = useState<Number[]>([]);
	const [rowNum, setRowNum] = useState(0);

	// for error handling front-end
	const [itemSelectedFirstPass, setItemSelectedFirstPass] = useState(true);
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
		// console.log(quantityElem.value);
		const checkItem = !selectedItem || selectedItem === "";
		const checkItemQuantity =
			!itemQuantity ||
			isNaN(Number(itemQuantity)) ||
			Number(itemQuantity) <= 0;

		if (checkItem) setItemSelectedFirstPass(false);
		if (checkItemQuantity) setItemQuantityFirstPass(false);

		if (
			checkItem ||
			checkItemQuantity ||
			orderList.some((order) => order.itemName === selectedItem)
		) {
			// setValidGridFirstPass(false);
			return;
		}

		let numRow = rowNum;
		numRow++;
		setOrderList([
			...orderList,
			{
				rowId: numRow,
				itemName: selectedItem,
				quantity: Number(itemQuantity),
				price: Number(itemQuantity) * itemPrice,
			},
		]);
		setRowNum(numRow);
		setItemSelectedFirstPass(true);
		setItemQuantityFirstPass(true);
		// setValidGridFirstPass(true);
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
		const checkName = !customerNameElem || customerNameElem.value === "";
		const checkList = orderList.length === 0;
		if (checkName) setCustomerNameFirstPass(false);

		if (checkList) {
			setItemSelectedFirstPass(false);
			setItemQuantityFirstPass(false);
		}

		if (checkName || checkList) return;

		const data = JSON.stringify({
			customerName: customerNameElem.value,
			serverId: session?.user.id,
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

		const response = await axios(config);

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

	if (!isAuthorized("server")) {
		return <NoAccess />;
	}

	return (
		<>
			<Head>
				<title>Cart</title>
			</Head>
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
				<FormControl
					sx={{ minWidth: 150 }}
					error={
						!itemSelectedFirstPass
							? // &&
							  // !selectedItem
							  true
							: false
					}>
					<InputLabel>Item</InputLabel>
					<Select
						sx={{ borderRadius: 3 }}
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
					<FormHelperText
						error={
							!itemSelectedFirstPass
								? // &&
								  // !selectedItem
								  true
								: false
						}>
						Pick an item
					</FormHelperText>
				</FormControl>
				<TextField
					type="text"
					inputMode="numeric"
					label="Enter quantity"
					onChange={(e) => {
						setItemQuantity(Number(e.target.value));
					}}
					error={
						!itemQuantityFirstPass
							? // &&
							  // (!quantityElem ||
							  // isNaN(Number(quantityElem.value)) ||
							  // Number(quantityElem.value) <= 0)
							  true
							: false
					}
					helperText={
						!itemQuantityFirstPass
							? // &&
							  // (!quantityElem ||
							  // isNaN(Number(quantityElem.value)) ||
							  // Number(quantityElem.value) <= 0)
							  "Please enter a positive number"
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
				{/* <FormControl sx={{ maxWidth: 700, maxHeight: 700 }}> */}
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
				{/* </FormControl> */}
			</StyledDiv>

			<StyledDiv sx={{ marginTop: "-30px" }}>
				<FormHelperText>
					Note: Same item cannot be added multiple times. At least one
					Item must be added to the order to submit
				</FormHelperText>
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
							? "Missing name/items"
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
	const instance = await serverSideInstance(context);
	const response = await instance.get(getMenuAPI);
	const data = response.data;

	return {
		props: {
			menu: data,
		},
	};
}
