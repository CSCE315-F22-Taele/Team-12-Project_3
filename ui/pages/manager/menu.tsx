import {flaskAPI,
	getMenuAPI,
	getMenuProxyAPI,
	serverSideInstance,
} from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';
// import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface thisProp {
	menuItems: any;
}

interface menuItem {
	itemId: string;
	itemName: string;
	price: number;
}


export default function Menu({ menuItems }: thisProp) {
	const router = useRouter();

	const menu: menuItem[] = menuItems["items"];
	const [newItemName, setNewItemName] = useState("");
	const [newItemPrice, setNewItemPrice] = useState(0);
	const [itemPrice, setItemPrice] = useState(0);
	const [selectedItem, setSelectedItem] = useState(menu[0].itemName);

	
	const addToMenu = () => {};
	const updatePrice = () => {};
	const deleteItem = () => {};

	/* const addQuantity = async () => {
		ingredientList.map((ingredient) => {
			if (ingredient.ingredientName !== selectedIngredient) return;
			ingredient.quantity += ingredientAmount;
		});
		setIngredientList([...ingredientList]);

		const data = JSON.stringify({
			ingredients: [
				{
					ingredientName: selectedIngredient,
					amount: ingredientAmount,
				},
			],
		});

		const response = await axios({
			method: "PUT",
			url: "http://127.0.0.1:5000/api/inventory/restock",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		});
	};

	const setThreshold = async () => {
		ingredientList.map((ingredient) => {
			if (ingredient.ingredientName !== selectedIngredient) return;
			ingredient.threshold = ingredientAmount;
		});
		setIngredientList([...ingredientList]);

		const data = JSON.stringify({
			ingredients: [
				{
					ingredientName: selectedIngredient,
					newThreshold: ingredientAmount,
				},
			],
		});

		const response = await axios({
			method: "PUT",
			url: "http://127.0.0.1:5000/api/inventory/threshold",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		});
	}; */

	return (
		<>
			<StyledDiv>
				<StyledButton
					onClick={() => {
						router.push("/manager", undefined);
					}}>
					Back
				</StyledButton>
			</StyledDiv>
			
			<StyledH1>Menu</StyledH1>

			<StyledDiv>
				<TextField
					type="text"
					label="Item Entry"
					onChange={(e) => setNewItemName(e.target.value)}
					className="item_entry"></TextField>
				<TextField
					type="text"
					inputMode="numeric"
					label="Price"
					onChange={(e) => {
						setNewItemPrice(Number(e.target.value));
					}}
					className="item_price"></TextField>
				<StyledButton onClick={addToMenu}>Add</StyledButton>
			</StyledDiv>

			<StyledDiv className="menuList">
				{/* {menu.map((menuItem, index) => {
					return (
						<StyledDiv key={index}>
							{menuItem.itemName} {menuItem.price}
						</StyledDiv>
					);
				})} */}
				<StyledDiv>
					<TableContainer component={Paper}>
						<Table sx={{ maxWidth: 400, maxHeight: 200 }} aria-label="simple table">
							<TableHead>
							<TableRow>
								<TableCell>Menu Item</TableCell>
								<TableCell align="right">Price&nbsp;($)</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
								{menu.map((eachItem) => (
									<TableRow
										key={eachItem.itemName}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{eachItem.itemName}
										</TableCell>
										<TableCell align="right">{eachItem.price}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</StyledDiv>
			</StyledDiv>

			<Box sx={{minWidth: 200}}>
				<FormControl fullWidth>
					<StyledDiv className="MenuItemSelection">
						{/* <InputLabel id="SelectMenuItemLabel">Pick Menu Item</InputLabel> */}
						<Select
							labelId="SelectMenuItemLabel"
							label="Pick Menu Item"
							id="SelectMenuItem"
							onChange={(event: SelectChangeEvent) => {
								setSelectedItem(event.target.value as string);
							}}
							className="menuItems">
							{menu.map((menuItem, index) => {
								return (
									<MenuItem key={index} value={menuItem.itemName}>
										{menuItem.itemName}
									</MenuItem>
								);
							})}
						</Select>
						<TextField
							type="text"
							placeholder="New Price"
							onChange={(e) => {
								setItemPrice(Number(e.target.value));
							}}
							className="price"></TextField>

						<StyledButton onClick={updatePrice}>Update Price</StyledButton>
						<StyledButton onClick={deleteItem}>Delete Item</StyledButton>
					</StyledDiv>
				</FormControl>
			</Box>
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
