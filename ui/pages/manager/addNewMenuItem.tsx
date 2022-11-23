import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
	addOrderProxyAPI,
	flaskAPI,
	getMenuAPI,
	getMenuProxyAPI,
	serverSideInstance,
	setNewMenuItemProxyAPI,
} from "../../components/utils";
import { StyledDiv, StyledTheme } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box, FormControl } from "@mui/material";
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
	ingredientId: string;
	ingredientName: string;
	quantity: number;
	threshold: number;
}

interface thisProp {
	serverId: string;
	ingredients: any;
}

interface OrderItem {
	rowId: number;
	itemName: string;
}

export default function Cart({ serverId, ingredients }: thisProp) {
	const router = useRouter();
	const ingredientList: menuItem[] = ingredients;

	const [customerName, setCustomerName] = useState("");
	const [newMenuItemName, setNewMenuItemName] = useState("");
	const [newIngredientName, setNewIngredientName] = useState("");
	const [price, setPrice] = useState(0);
	const [itemPrice, setItemPrice] = useState(0);
	const [orderList, setOrderList] = useState<OrderItem[]>([]);
	const [selectedDeleteList, setSelectedDeleteList] = useState<OrderItem[]>(
		[]
	);
	const [priceFirstPass, setPriceFirstPass] = useState(true);
	const [customerNameFirstPass, setCustomerNameFirstPass] = useState(true);

	const tableColumns: GridColDef[] = [
		{
			field: "itemName",
			headerName: "Item Name",
			type: "string",
			width: 600,
		},
	];

	const addToCart = () => {
		setOrderList([
			...orderList,
			{
				rowId: Math.floor(Math.random() * (1000000 - 0 + 1) + 0),
				itemName: newIngredientName,
			},
		]);
	};

	// const deleteAllInCart = () => {
	// 	setOrderList([]);
	// 	setNewMenuItemName("");
	// 	setPrice(0);
	// };
	const deleteSelectedInCart = () => {
		setOrderList(selectedDeleteList);
	};

	const submitOrder = async () => {
		// if (customerName === "") {
		// 	setCustomerNameFirstPass(false);
		// 	return;
		// }

		const data = JSON.stringify({
			itemName: newMenuItemName,
			description: "Temp",
			price: price,
			linkedInventory: orderList.map((ingredient) => ingredient.itemName),
			// serverId: "74bfa9a8-7c52-4eaf-b7de-107c980751c4",
			// items: orderList,
		});

		const config = {
			method: "POST",
			url: setNewMenuItemProxyAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await flaskAPI(config);

		setOrderList([]);

		router.push("/manager/menu");
	};

	// const setItemStates = (event: ChangeEvent<HTMLSelectElement>) => {
	const setItemStates = (event: SelectChangeEvent) => {
		const indexOfSpace = event.target.value.lastIndexOf(" ");
		const menuObjectName = event.target.value.substring(0, indexOfSpace);
		const menuObjectPrice = event.target.value.substring(indexOfSpace + 1);
		setNewMenuItemName(menuObjectName);
		setItemPrice(Number(menuObjectPrice));
	};

	// useEffect(() => {}, [expandedStringList]);

	return (
		<>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/manager/menu");
					}}>
					Back
				</Button>
			</StyledDiv>

			<Typography>
				<h1>New Menu Item Addition</h1>
			</Typography>

			<StyledDiv className="AddMenuItemName">
				<TextField
					type="text"
					label="New Menu Item Name"
					onChange={(e) => setNewMenuItemName(e.target.value)}
					className="item_entry"></TextField>
				<TextField
					type="text"
					inputMode="numeric"
					label="Enter Price"
					onChange={(e) => {
						if (Number(e.target.value) !== NaN) {
							setPrice(Number(e.target.value));
							setPriceFirstPass(false);
						}
					}}
					error={price <= 0 && !priceFirstPass}
					helperText={
						price <= 0 && !priceFirstPass
							? "Please enter a positive number"
							: ""
					}
					className="Quantity"></TextField>
			</StyledDiv>

			<StyledDiv className="MenuItemSelection">
				<FormControl sx={{ minWidth: 150 }}>
					<InputLabel>Item</InputLabel>
					<Select
						onChange={(event: SelectChangeEvent) => {
							setItemStates(event);
						}}
						className="menuItems"
						label={"Item"}>
						{ingredientList.map((menuItem, index) => {
							return (
								<MenuItem
									key={index}
									value={menuItem.ingredientName}>
									{menuItem.ingredientName}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<TextField
					type="text"
					label="New Ingredient"
					onChange={(e) => setNewIngredientName(e.target.value)}
					className="item_entry"></TextField>
				<Button onClick={addToCart}>Add</Button>
				<Button onClick={deleteSelectedInCart}>Remove Picked</Button>
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
			</StyledDiv>

			<StyledDiv className="SubmitNewMenuItemInfo">
				<Button onClick={submitOrder}>Submit New Menu Item</Button>
			</StyledDiv>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = serverSideInstance(context);
	const response = await instance.get("api/inventory");
	const data = response.data;

	return {
		props: {
			ingredients: data["ingredients"],
		},
	};
}
