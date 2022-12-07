import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	FormControl,
	FormHelperText,
	Grid,
  useMediaQuery,
  makeStyles,
  useTheme
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	addOrderAPI,
	flaskAPI,
	getMenuAPI,
	getMenuPlusDescriptionsAPI,
} from "../../components/utils";
import { StyledDiv } from "../../styles/mystyles";
//may not need table stuff. Left it here in case we want to display a table of menu items and they select
import { InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { margin } from "@mui/system";
import Slide from "@mui/material/Slide";
import TranslatedText from "../../components/Translate";
import { PropsWithChildren } from "react";
import { StaticImageData } from "next/image";
import Image from "next/dist/client/image";
import StrawberryShake from "../../public/images/StrawberryShake.jpg";
import { images } from "./imageimport";
import SpeedDialAccess from "../../components/SpeedDialAccess";
import Reveille from "../../public/ReveillePic.jpg";

import { serverSideInstance } from "../../components/serverSideUtils";

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

export default function Cart(
	{ serverId, menuItems }: thisProp,
	{ children }: PropsWithChildren
) {
	const router = useRouter();
	const menu: menuItem[] = menuItems["items"];

	const [customerName, setCustomerName] = useState("");
	const [selectedItem, setSelectedItem] = useState("");
	const [itemPrice, setItemPrice] = useState(0);
	const [orderList, setOrderList] = useState<OrderItem[]>([]);
	const [selectedDeleteList, setSelectedDeleteList] = useState<OrderItem[]>(
		[]
	);
	const [itemQuantitiesFirstPass, setItemQuantitiesFirstPass] = useState<
		Boolean[]
	>(new Array(menu.length).fill(true));
	const [customerNameFirstPass, setCustomerNameFirstPass] = useState(true);
	const [itemQuantities, setItemQuantities] = useState(
		new Array(menu.length).fill(Number.POSITIVE_INFINITY)
	);

  for(var i = 0; i < (menu.length - images.length + 1); i++)
    images.push(Reveille);

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
			headerName: "Quantity",
			headerClassName: "header-styling",
			type: "number",
			width: 100,
		},
		{
			field: "price",
			headerName: "Price ($)",
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
		console.log(num, Number.NEGATIVE_INFINITY);
		if (isNaN(num) || num <= 0 || num === Number.POSITIVE_INFINITY)
			newBools[index] = false;
		else if (!newBools[index]) newBools[index] = true;
		// console.log("Index: ", index, " newBools",newBools);
		// console.log("before:",newBools[index], " num:", num);

		setItemQuantitiesFirstPass(newBools);

		// console.log("Test", itemQuantitiesFirstPass[index], newBools[index]);

		// console.log(itemQuantitiesFirstPass);
		// console.log(itemQuantities);

		if (
			!newBools[index] ||
			orderList.some((order) => order.itemName === selectedItem)
		)
			return;
		// console.log("re");

		setOrderList([
			...orderList,
			{
				rowId: Math.floor(Math.random() * (1000000 - 0 + 1) + 0),
				itemName: selectedItem,
				quantity: itemQuantities[index],
				price: Number(itemQuantities[index]) * Number(itemPrice),
			},
		]);

		setItemQuantities(
			new Array(menu.length).fill(Number.POSITIVE_INFINITY)
		);
		setItemQuantitiesFirstPass(new Array(menu.length).fill(true));
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
		if (!customerName || customerName === "") {
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
		router.push("/customer/thanks");
	};

	useEffect(() => {}, [itemQuantitiesFirstPass]);

  const theme = () => useTheme();

  const styles = {
    "@media (zoom: 0.75)": {
      // Change the number of columns to 2 when the zoom level is 0.75
      "& .MuiGrid-grid-xs-12": {
        width: "50%",
      },
    },
  };

  

	return (
		<>
        <SpeedDialAccess/>
				<Typography variant="h1">Cart</Typography>

				<Slide direction="up" in={true}>
					<Box sx={{ width: "auto", marginRight: "20px" }}>

            {/* <span>{`(min-width:600px) matches: ${useMediaQuery('(min-width:1536px)')}`}</span>
            <span>{`(min-width:600px) matches: ${window.innerWidth}`}</span>  */}
            {/* {window.resizeTo(750,750)}  */}
            {/* {/* <span>{`(min-width:600px) matches: ${useMediaQuery(theme.breakpoints.down('xs'))}`}</span> */}
						<Grid container spacing={2}>
							<Grid item xs={12} md={8} sx={{marginLeft: "-30px"}}>
								<StyledDiv className="MenuItemSelection">
									<Grid container spacing={4}>
										{menu.map((card, index) => (
											<Grid
												item
												key={card.itemName}
												xs={6}
												md={4}>
												<Card>
													{/* <Card className={classes.card}> */}
                          {/* <CardMedia

                            component="img"
                            height="194"
                            src={"BaconBurger.webp"}
                            alt={card.itemName}
                          /> */}
													<CardContent
														sx={{
															minHeight: 200,
														}}>
														{/* <CardContent className={classes.cardContent}> */}
														<Image
															style={{ width: "auto", height: "50vh", position: "relative", zIndex: 1, objectFit: "contain"}}
															src={images[index]}
															alt="Reveille"
                              
														/>
														<Typography
															variant="h6"
															gutterBottom>
															{card.itemName}
														</Typography>
														<Typography>															
                              								{card.description}
														</Typography>
														<Typography>
															{"Price: " +
																card.price}
														</Typography>
													</CardContent>
													<CardActions>
														<TextField
															type="text"
															inputMode="numeric"
															label="Enter quantity"
															key={card.itemName}
															sx={{
																marginTop:
																	"-5px",
															}}
															onChange={(e) => {
																// setItemQuantityFirstPass(false);
																var newQuants =
																	itemQuantities;
																newQuants[
																	index
																] = Number(
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
									top: 10
								}}>
								<StyledDiv
									sx={{
										display: "flex",
										height: "371px",
										margin: "10px",
                    justifyContent: "center"
									}}>
									<DataGrid
										getRowId={(r) => r.rowId}
										rows={orderList}
										columns={tableColumns}
										pageSize={5}
										rowsPerPageOptions={[5]}
										checkboxSelection
										sx={{ maxWidth: 455, maxHeight: 700 }}
										onSelectionModelChange={(
											newSelection
										) => {
											const selectedIDs = new Set(
												newSelection
											);
											const selectedRows =
												orderList.filter((row) =>
													selectedIDs.has(row.rowId)
												);
											setSelectedDeleteList(selectedRows);
										}}
									/>
								</StyledDiv>
								<StyledDiv>
									<FormHelperText>
										Note: Same item cannot be added multiple
										times. At least one Item must be added
										to the order to submit
									</FormHelperText>
								</StyledDiv>
								
								

								<StyledDiv className="AddOrdersSection">
									<Grid container spacing={2}>
										<Grid item xs={6}>
											<Button
												onClick={deleteSelectedInCart}>
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
													setCustomerName(
														e.target.value
													);
												}}
												error={
													!customerNameFirstPass
														? true
														: false
												}
												helperText={
													!customerNameFirstPass
														? "Enter a name here"
														: ""
												}
												value={customerName}
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
	const response = await instance.get(getMenuPlusDescriptionsAPI);
	const data = response.data;

	return {
		props: {
			menuItems: data,
		},
	};
}
