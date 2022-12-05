import { Box, Button, InputBase } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
	flaskAPI,
	getMenuAPI,
	getMenuProxyAPI,
	menuItemProxyAPI,
	serverSideInstance,
} from "../../../components/utils";
import { StyledDiv } from "../../../styles/mystyles";

import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useSWR, { useSWRConfig } from "swr";
import SpeedDialAccess from "../../../components/SpeedDialAccess";

interface thisProp {
	menuData: menuItem[];
}

interface menuItem {
	itemId: string;
	itemName: string;
	price: number;
}

export default function Menu({ menuData }: thisProp) {
	const router = useRouter();
	const { mutate } = useSWRConfig();
	const { data: menuItems } = useSWR(
		getMenuProxyAPI,
		(url) => flaskAPI(url).then((r) => r.data.items),
		{
			fallbackData: menuData,
		}
	);

	const [itemName, setItemName] = useState("");
	const [updateNewPrice, setUpdateNewPrice] = useState(0);
	const [itemSelectedFirstPass, setItemSelectedFirstPass] = useState(true);
	const [updatePriceFirstPass, setUpdatePriceFirstPass] = useState(true); 

	const updatePrice = async () => {
		const checkItem = !itemName || itemName === "";
		const checkPrice = !updateNewPrice || isNaN(Number(updateNewPrice)) || Number(updateNewPrice) <= 0;

		if(checkItem)
			setItemSelectedFirstPass(false);
		if(checkPrice)
			setUpdatePriceFirstPass(false);

		if(checkItem || checkPrice)
			return;


		mutate(
			getMenuProxyAPI,
			(menu: any) => {
				return menu.map((item: menuItem) => {
					if (item.itemName !== itemName) return item;
					return { ...item, price: updateNewPrice };
				});
			},
			{ revalidate: false }
		);

		const data = JSON.stringify({
			itemName: itemName,
			newPrice: updateNewPrice,
		});

		const config = {
			method: "PATCH",
			url: menuItemProxyAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await flaskAPI(config);
		setUpdatePriceFirstPass(true);
		setItemSelectedFirstPass(true);
	};
	const deleteItem = async () => {
		if (!itemName || itemName === "") {
			setItemSelectedFirstPass(false);
			return;
		}

		mutate(
			getMenuProxyAPI,
			(menu: any) => {
				return [
					...menu.filter(
						(item: menuItem) => item.itemName !== itemName
					),
				];
			},
			{ revalidate: false }
		);

		const config = {
			method: "DELETE",
			url: menuItemProxyAPI + "/" + itemName,
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await flaskAPI(config);
		setItemSelectedFirstPass(true);
	};

	return (
		<>
			<SpeedDialAccess>
				<StyledDiv>
					<Button
						onClick={() => {
							router.push("/manager");
						}}>
						Back
					</Button>
				</StyledDiv>

				<Typography variant="h1">Menu</Typography>

				<StyledDiv>
					<Button onClick={() => router.push("/manager/menu/addToMenu")}>
						Add New Item
					</Button>
				</StyledDiv>

				<StyledDiv className="menuList">
					{/* {menu.map((menuItem, index) => {
							return (
								<StyledDiv key={index}>
									{menuItem.itemName} {menuItem.price}
								</StyledDiv>
							);
						})} */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
							p: 1,
							m: 1,
							bgcolor: "background.paper",
							borderRadius: 1,
						}}>
						<TableContainer
							component={Paper}
							sx={{ maxWidth: 700, maxHeight: 400 }}>
							<Table stickyHeader aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Menu Item</TableCell>
										<TableCell align="right">
											Price ($)
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{menuItems.map((eachItem: menuItem) => (
										<TableRow
											key={eachItem.itemName}
											// sx={{
											// 	"&:last-child td, &:last-child th":
											// 		{ border: 0 },
											// }}
											>
											<TableCell component="th" scope="row">
												{eachItem.itemName}
											</TableCell>
											<TableCell align="right">
												{eachItem.price}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</StyledDiv>

				<Box sx={{ minWidth: 200 }} id="SelectMenuItemToChange">
					
					<StyledDiv className="menuDataelection">
						<FormControl sx={{ minWidth: 150 }}
							error={
								!itemSelectedFirstPass
									? true
									: false
							}
							>
							<InputLabel>Item</InputLabel>
							<Select
								id="SelectMenuItem"
								onChange={(event: SelectChangeEvent) => {
									setItemName(event.target.value as string);
								}}
								sx={{borderRadius: 3}}
								className="menuData"
								label={"Item"}>
								{menuItems.map(
									(menuItem: menuItem, index: number) => {
										return (
											<MenuItem
												key={index}
												value={menuItem.itemName}>
												{menuItem.itemName}
											</MenuItem>
										);
									}
								)}
							</Select>
							<FormHelperText 
								error={
									!itemSelectedFirstPass
										? true
										: false
								}>
								Pick an item
							</FormHelperText>
						</FormControl>
						<TextField
							type="text"
							label="New Price"
							onChange={(e) => {
								setUpdateNewPrice(Number(e.target.value));
							}}
							error={
								!updatePriceFirstPass
									? true
									: false
							}
							helperText={
								!updatePriceFirstPass
									? "Please enter a positive number"
									: ""
							}
							className="price"></TextField>

						<Button onClick={updatePrice}>Update Price</Button>
						<Button onClick={deleteItem}>Delete Item</Button>
					</StyledDiv>
				</Box>
			</SpeedDialAccess>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = serverSideInstance(context);
	const response = await instance.get(getMenuAPI);
	const data = response.data.items;

	return {
		props: {
			menuData: data,
		},
	};
}
