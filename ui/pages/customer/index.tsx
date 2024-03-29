import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	FormHelperText,
	Grid,
} from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { PropsWithChildren, useMemo, useRef, useState } from "react";
import {
	addOrderAPI,
	getMenuPlusDescriptionsAPI,
} from "../../components/utils";
import { StyledDiv } from "../../styles/mystyles";
//may not need table stuff. Left it here in case we want to display a table of menu items and they select
import { TextField, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import Image from "next/dist/client/image";
import Head from "next/head";
import React from "react";
import { images } from "../../components/imageImport";
import { serverSideInstance } from "../../components/serverSideUtils";
import SpeedDialAccess from "../../components/SpeedDialAccess";
import Reveille from "../../public/ReveillePic.jpg";

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

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function Cart(
	{ serverId, menuItems }: thisProp,
	{ children }: PropsWithChildren
) {
	const router = useRouter();
	const menu: menuItem[] = menuItems["items"];

	const customerNameRef = useRef<HTMLInputElement | null>(null);
	const customerNameElem = customerNameRef.current;
	const [selectedItem, setSelectedItem] = useState("");
	const [itemPrice, setItemPrice] = useState(0);
	const [orderList, setOrderList] = useState<OrderItem[]>([]);
	const [selectedDeleteList, setSelectedDeleteList] = useState<Number[]>([]);
	const [itemQuantities, setItemQuantities] = useState(
		new Array(menu.length).fill(Number.POSITIVE_INFINITY)
	);

	const [itemQuantitiesFirstPass, setItemQuantitiesFirstPass] = useState<
		Boolean[]
	>(new Array(menu.length).fill(true));
	const [customerNameFirstPass, setCustomerNameFirstPass] = useState(true);

	// for (var i = 0; i < menu.length - images.keys.length + 1; i++)
	// 	images.push("Reveille": Reveille);

	const tableColumns: GridColDef[] = [
		{
			field: "itemName",
			headerName: "Item Name",
			headerClassName: "header-styling",
			type: "string",
			width: 200,
		},
		{
			field: "quantity",
			headerName: "Qty",
			headerClassName: "header-styling",
			type: "number",
			width: 100,
			// renderCell: (params) => {
			// 	return <TextField
			// 		sx={{height: "auto"}}
			// 		// onChange={(e) => {
			// 		// 	var newQuants = itemQuantities;
			// 		// 	newQuants[index] =
			// 		// 		Number(
			// 		// 			e.target
			// 		// 				.value
			// 		// 		);
			// 		// 	setItemQuantities(
			// 		// 		newQuants
			// 		// 	);
			// 		// }}
			// 	>

			// 	</TextField>
			// }
		},
		{
			field: "price",
			headerName: "$$$",
			headerClassName: "header-styling",
			type: "number",
			width: 100,
		},
	];

	// const setItemStates = (event: SelectChangeEvent) => {
	// 	const indexOfSpace = event.target.value.lastIndexOf(" ");
	// 	const menuObjectName = event.target.value.substring(0, indexOfSpace);
	// 	const menuObjectPrice = event.target.value.substring(indexOfSpace + 1);
	// 	setSelectedItem(menuObjectName);
	// 	setItemPrice(Number(menuObjectPrice));
	// };

	const totalPrice = useMemo(() => {
		let price = 0;
		orderList.map((order) => {
			price += order.price ?? 0;
		});
		return price;
	}, [orderList]);

	const addToCart = (
		selectedItem: string,
		index: number,
		itemPrice: Number
	) => {
		// if (itemQuantity <= 0 || selectedItem === "") {
		// 	return;
		// }

		// if (orderList.some((order) => order.itemName === selectedItem)) {
		// 	return;
		// }

		var newBools = itemQuantitiesFirstPass;
		var num = Number(itemQuantities[index]);
		// console.log(num, Number.POSITIVE_INFINITY);
		if (
			isNaN(num) ||
			num === Number.POSITIVE_INFINITY
			// || (num <= 0)
		)
			newBools[index] = false;
		else if (!newBools[index]) newBools[index] = true;

		// console.log("Index: ", index, " newBools",newBools);
		// console.log("before:",newBools[index], " num:", num);

		setItemQuantitiesFirstPass(newBools);

		// console.log("Test", itemQuantitiesFirstPass[index], newBools[index]);

		// console.log(itemQuantitiesFirstPass);
		// console.log(itemQuantities);

		if (!newBools[index]) return;

		if (!newBools[index]) return;
		// console.log("re");

		// if(orderList.some((order) => order.itemName === selectedItem)) {

		// }

		var getOut = false;
		// console.log(itemQuantities[index]);
		for (var i = 0; i < itemQuantitiesFirstPass.length; i++) {
			for (var j = 0; j < orderList.length; j++) {
				if (orderList[j].itemName === selectedItem) {
					if (orderList[j].quantity + itemQuantities[index] > 0) {
						orderList[j].quantity += itemQuantities[index];
						orderList[j].price =
							Number(orderList[j].quantity) * Number(itemPrice);

						setOrderList([...orderList]);
					} else {
						// orderList.filter((val, filterIndex) => (filterIndex !== j))
						setOrderList((list) => [
							...list.slice(0, j),
							...list.slice(j + 1),
						]);

						// updateList = updateList.push(orderList.splice(j+1, 0));
						// console.log(orderList);
					}
					getOut = true;
					// console.log(orderList[j].price);
				}
			}
			if (getOut) {
				break;
			}
		}

		// console.log(orderList);

		if (!getOut && num > 0) {
			setOrderList([
				...orderList,
				{
					rowId: Math.floor(Math.random() * (1000000 - 0 + 1) + 0),
					itemName: selectedItem,
					quantity: itemQuantities[index],
					price: Number(itemQuantities[index]) * Number(itemPrice),
				},
			]);
			// console.log("finished", orderList.length, orderList[0], selectedItem, itemQuantities[index]);
		}

		// setItemQuantities(
		// 	new Array(menu.length).fill(Number.POSITIVE_INFINITY)
		// );
		setItemQuantitiesFirstPass(new Array(menu.length).fill(true));
	};

	const deleteAllInCart = () => {
		setOrderList([]);
		// setItemQuantities(
		// 	new Array(menu.length).fill(Number.POSITIVE_INFINITY)
		// );
		// setItemQuantitiesFirstPass(new Array(menu.length).fill(true));
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
		// setItemQuantities(
		// 	new Array(menu.length).fill(Number.POSITIVE_INFINITY)
		// );
		// setItemQuantitiesFirstPass(new Array(menu.length).fill(true));
	};

	const submitOrder = async () => {
		const checkName = !customerNameElem || customerNameElem.value === "";
		const checkList = orderList.length === 0;
		if (checkName) setCustomerNameFirstPass(false);

		if (checkName || checkList) return;

		const data = JSON.stringify({
			customerName: customerNameElem.value,
			// serverId: "74bfa9a8-7c52-4eaf-b7de-107c980751c4", // TODO: random server id
			items: orderList,
		});

		const config = {
			method: "POST",
			url: addOrderAPI,
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				customer: "",
			},
			data: data,
		};

		const response = await axios(config);

		setOrderList([]);
		router.push("/customer/thanks");
	};

	// useEffect(() => {}, [itemQuantitiesFirstPass]);
	// useEffect(() => {}, [itemQuantities]);

	//   const theme = () => useTheme();

	//   const styles = {
	//     "@media (zoom: 0.75)": {
	//       // Change the number of columns to 2 when the zoom level is 0.75
	//       "& .MuiGrid-grid-xs-12": {
	//         width: "50%",
	//       },
	//     },
	//   };

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<Button
				sx={{
					marginLeft: 0,
				}}
				onClick={() => {
					router.push("/");
				}}>
				Back
			</Button>
			<Head>
				<title>Cart</title>
			</Head>
			<SpeedDialAccess />
			<Typography variant="h1">Cart</Typography>

			<Slide direction="up" in={true}>
				<Box sx={{ width: "auto", marginRight: "20px" }}>
					{/* <span>{`(min-width:600px) matches: ${useMediaQuery('(min-width:1536px)')}`}</span>
            <span>{`(min-width:600px) matches: ${window.innerWidth}`}</span>  */}
					{/* {window.resizeTo(750,750)}  */}
					{/* {/* <span>{`(min-width:600px) matches: ${useMediaQuery(theme.breakpoints.down('xs'))}`}</span> */}
					<Grid container spacing={2}>
						<Grid item xs={12} md={8} sx={{ marginLeft: "-30px" }}>
							<StyledDiv className="MenuItemSelection">
								{/* <Box
									sx={{
										borderBottom: 1,
										borderColor: "divider",
										marginTop: 0,
									}}>
									<Tabs
										value={value}
										onChange={handleChange}
										aria-label="basic tabs example">
										<Tab
											label="Item One"
											{...a11yProps(0)}
										/>
										<Tab
											label="Item Two"
											{...a11yProps(1)}
										/>
										<Tab
											label="Item Three"
											{...a11yProps(2)}
										/>
									</Tabs>
								</Box> */}
								{/* <TabPanel value={value} index={0}> */}
								<Grid container spacing={4}>
									{menu.map((card, index) => (
										<Grid
											item
											key={card.itemName}
											xs={6}
											md={4}>
											<Card>
												<CardContent
													sx={{
														minHeight: 500,
														// minWidth: 5,
													}}>
													<Image
														style={{
															width: "auto",
															height: "50vh",
															position:
																"relative",
															zIndex: 1,
															objectFit: "fill",
														}}
														src={
															images[
																card.itemName
															] !== undefined
																? images[
																		card
																			.itemName
																  ]
																: Reveille
														}
														alt={card.itemName}
													/>
													<Typography
														variant="h6"
														gutterBottom>
														{card.itemName}
													</Typography>
													<Typography variant="body2">
														{card.description}
													</Typography>
												</CardContent>

												<CardContent>
													<Typography variant="body2">
														{"Price: " + card.price}
													</Typography>
												</CardContent>

												<CardActions>
													<TextField
														type="text"
														inputMode="numeric"
														label="Enter quantity"
														key={card.itemName}
														sx={{
															marginTop: "-5px",
														}}
														onChange={(e) => {
															// setItemQuantityFirstPass(false);
															var newQuants =
																itemQuantities;
															newQuants[index] =
																Number(
																	e.target
																		.value
																);
															setItemQuantities(
																newQuants
															);
														}}
														error={
															!itemQuantitiesFirstPass[
																index
															]
																? true
																: false
														}
														helperText={
															!itemQuantitiesFirstPass[
																index
															]
																? "Enter a positive number"
																: ""
														}
														className="Quantity"></TextField>
													<Button
														onClick={() => {
															addToCart(
																card.itemName,
																index,
																card.price
															);
														}}>
														Add
													</Button>
												</CardActions>
											</Card>
										</Grid>
									))}
								</Grid>
								{/* </TabPanel> */}
								{/* <TabPanel value={value} index={1}>
									Item Two
								</TabPanel>
								<TabPanel value={value} index={2}>
									Item Three
								</TabPanel> */}

								{/* <Grid container spacing={4}>
									{menu.map((card, index) => (
										<Grid
											item
											key={card.itemName}
											xs={6}
											md={4}>
											<Card>
												<CardContent
													sx={{
														minHeight: 500,
														// minWidth: 5,
													}}>

													<Image
														style={{
															width: "auto",
															height: "50vh",
															position:
																"relative",
															zIndex: 1,
															objectFit: "fill",
														}}
														src={
															images[
																card.itemName
															] !== undefined
																? images[
																		card
																			.itemName
																  ]
																: Reveille
														}
														alt="Reveille"
													/>
													<Typography
														variant="h6"
														gutterBottom>
														{card.itemName}
													</Typography>
													<Typography variant="body2">
														{card.description}
													</Typography>
												</CardContent>

												<CardContent>
													<Typography variant="body2">
														{"Price: " + card.price}
													</Typography>
												</CardContent>

												<CardActions>
													<TextField
														type="text"
														inputMode="numeric"
														label="Enter quantity"
														key={card.itemName}
														sx={{
															marginTop: "-5px",
														}}
														onChange={(e) => {
															// setItemQuantityFirstPass(false);
															var newQuants =
																itemQuantities;
															newQuants[index] =
																Number(
																	e.target
																		.value
																);
															setItemQuantities(
																newQuants
															);
														}}
														error={
															!itemQuantitiesFirstPass[
																index
															]
																? true
																: false
														}
														helperText={
															!itemQuantitiesFirstPass[
																index
															]
																? "Enter a positive number"
																: ""
														}
														className="Quantity"></TextField>
													<Button
														onClick={() => {
															addToCart(
																card.itemName,
																index,
																card.price
															);
														}}>
														Add
													</Button>
												</CardActions>
											</Card>
										</Grid>
									))}
								</Grid> */}
							</StyledDiv>
						</Grid>

						{/* right section of customer side */}

						<Grid
							item
							xs={12}
							md={4}
							sx={{
								marginTop: "10px",
								position: "sticky",
								top: 10,
							}}>
							<StyledDiv
								sx={{
									display: "flex",
									height: "371px",
									margin: "10px",
									justifyContent: "center",
								}}>
								<DataGrid
									getRowId={(r) => r.rowId}
									rows={orderList}
									columns={tableColumns}
									pageSize={5}
									rowsPerPageOptions={[5]}
									checkboxSelection
									sx={{ maxWidth: 455, maxHeight: 700 }}
									onSelectionModelChange={(newSelection) => {
										const selectedIDs = new Set(
											newSelection
										);
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
							<StyledDiv>
								<FormHelperText>
									Note: Same item cannot be added multiple
									times. At least one Item must be added to
									the order to submit
								</FormHelperText>
							</StyledDiv>
							<StyledDiv>
								<FormHelperText sx={{ fontSize: "25px" }}>
									Total Price: $
									{Math.round(totalPrice * 100) / 100}
								</FormHelperText>
							</StyledDiv>

							<StyledDiv className="AddOrdersSection">
								<Grid
									container
									spacing={2}
									sx={{ marginTop: -3 }}>
									<Grid item xs={6}>
										<Button onClick={deleteSelectedInCart}>
											Delete Selected
										</Button>
									</Grid>
									<Grid item xs={6}>
										<Button onClick={deleteAllInCart}>
											Delete All
										</Button>
									</Grid>
									<Grid item xs={6}>
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
									</Grid>
									<Grid item xs={6}>
										<Button onClick={submitOrder}>
											Submit Order
										</Button>
									</Grid>
								</Grid>
							</StyledDiv>
						</Grid>
					</Grid>
				</Box>
			</Slide>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = await serverSideInstance(context);
	const response = await instance({
		url: getMenuPlusDescriptionsAPI,
		params: {
			customer: "",
		},
	});
	const data = response.data;

	return {
		props: {
			menuItems: data,
		},
	};
}
