import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, Grid } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	addOrderAPI,
	flaskAPI,
	getMenuAPI,
	getMenuPlusDescriptionsAPI,
	serverSideInstance,
} from "../../components/utils";
import { StyledDiv } from "../../styles/mystyles";
//may not need table stuff. Left it here in case we want to display a table of menu items and they select
import { InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { margin } from "@mui/system";

interface menuItem {
	description: string;
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


export default function Cart({ serverId, menuItems }: thisProp) {
	const router = useRouter();
	const menu: menuItem[] = menuItems["items"];

	const [customerName, setCustomerName] = useState("");
	const [selectedItem, setSelectedItem] = useState("");
	const [itemPrice, setItemPrice] = useState(0);
	const [orderList, setOrderList] = useState<OrderItem[]>([]);
	const [selectedDeleteList, setSelectedDeleteList] = useState<OrderItem[]>(
		[]
		);
	const [itemQuantityFirstPass, setItemQuantityFirstPass] = useState(true);
	const [customerNameFirstPass, setCustomerNameFirstPass] = useState(true);
	const [itemQuantities, setItemQuantities] = useState(Array.from({length: menu.length}, (v, k) => 0));

	const tableColumns: GridColDef[] = [
		{
			field: "itemName",
			headerName: "Item Name",
			type: "string",
			width: 200,
		},
		{
			field: "quantity",
			headerName: "Quantity",
			type: "number",
			width: 100,
		},
		{ field: "price", headerName: "Price ($)", type: "number", width: 100 },
	];

	// const setItemStates = (event: SelectChangeEvent) => {
	// 	const indexOfSpace = event.target.value.lastIndexOf(" ");
	// 	const menuObjectName = event.target.value.substring(0, indexOfSpace);
	// 	const menuObjectPrice = event.target.value.substring(indexOfSpace + 1);
	// 	setSelectedItem(menuObjectName);
	// 	setItemPrice(Number(menuObjectPrice));
	// };

	const addToCart = (selectedItem: string, index: number, itemPrice: Number) => {
		// if (itemQuantity <= 0 || selectedItem === "") {
		// 	return;
		// }

		// if (orderList.some((order) => order.itemName === selectedItem)) {
		// 	return;
		// }
		console.log(itemQuantities);
		setOrderList([
			...orderList,
			{
				rowId: Math.floor(Math.random() * (1000000 - 0 + 1) + 0),
				itemName: selectedItem,
				quantity: itemQuantities[index],
				price: (Number)(itemQuantities[index]) * (Number)(itemPrice),
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
		// if (customerName === "") {
		// 	setCustomerNameFirstPass(false);
		// 	return;
		// }

		// if (orderList.length === 0) {
		// 	return;
		// }

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

	// useEffect(() => {}, [expandedStringList]);

	return (
		<>
			<Typography variant="h1">Cart</Typography>

			<Box 
			sx={{ width: "auto" }}
			>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<StyledDiv className="MenuItemSelection">
							<FormControl sx={{ minWidth: 150 }}>
								{/* <InputLabel>Item</InputLabel> */}
								{/* <Select
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
								</Select> */}
							</FormControl>
							<Container maxWidth='md'>
								<Grid container spacing={4}>
									{menu.map((card, index) => (
										<Grid item key={card.itemName} xs={12} sm={6} md={4}>
											<Card>
											{/* <Card className={classes.card}> */}
												<CardMedia 
													// className={classes.CardMedia} 
													image='https://source.unsplash.com/random' 
													title="Image title"
												/>

												<CardContent sx={{minHeight: 200}}>
												{/* <CardContent className={classes.cardContent}> */}
													<Typography variant='h6' gutterBottom>
														{card.itemName}
													</Typography>
													<Typography>
														{card.description}    
													</Typography>         
													<Typography>
														{"Price: " + card.price}	
													</Typography>                           
												</CardContent>
												<CardActions>
													<TextField
													type="text"
													inputMode="numeric"
													label="Enter quantity"
													key={card.itemName}
													onChange={(e) => {
														// setItemQuantityFirstPass(false);
														var newQuants = itemQuantities;
														newQuants[index] = (Number)(e.target.value);
														setItemQuantities(newQuants);
													}}
													// error={
													// 	quantity &&
													// 	quantity.value <= 0 &&
													// 	!itemQuantityFirstPass
													// }
													// helperText={
													// 	quantity &&
													// 	quantity.value <= 0 &&
													// 	!itemQuantityFirstPass
													// 		? "Please enter a positive number"
													// 		: ""
													// }
													// inputRef={quantityRef}
													className="Quantity"></TextField>
													<Button size='small' onClick={() => {
														
														addToCart(card.itemName, index, card.price);
													}}>Add</Button>
												</CardActions>
											</Card>
										</Grid>
									))}
								</Grid>

							</Container>
							{/* <TextField
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
								className="Quantity"></TextField> */}
							{/* <Button onClick={addToCart}>Add</Button> */}
						</StyledDiv>
						
					</Grid>


					{/* right section of customer side */}
					<Grid item xs={4} sx={{marginTop: "70px", position: "sticky", top: 0}}>
						<StyledDiv
							sx={{
								display: "flex",
								// alignItems: "center",
								// justifyContent: "center",
								height: "371px",
								margin: "10px",
								// position: "sticky",
								// top: 0,
								// marginTop: "0px",
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
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<Button onClick={deleteSelectedInCart}>Delete Selected</Button>
									</Grid>
									<Grid item xs={6}>
										<Button onClick={deleteAllInCart}>Delete All</Button>
									</Grid>
									<Grid item xs={6}>
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
									</Grid>
									<Grid item xs={6}>
										<Button onClick={submitOrder}>Submit Order</Button>
									</Grid>
								</Grid>
							</StyledDiv>

						
					</Grid>
					
				</Grid>
			</Box>
			
			
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = serverSideInstance(context);
	const response = await instance.get(getMenuPlusDescriptionsAPI);
	const data = response.data;

	return {
		props: {
			menuItems: data,
		},
	};
}
