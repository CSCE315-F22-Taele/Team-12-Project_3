import {
	menuItemProxyAPI,
	flaskAPI,
	getMenuAPI,
	serverSideInstance,
} from "../../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { StyledDiv } from "../../../styles/mystyles";
import { Button, Box } from "@mui/material";

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
	FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

	const [menu, setMenu] = useState<menuItem[]>(menuItems);
	const [itemName, setItemName] = useState("");
	const [itemPrice, setItemPrice] = useState(0);

	const updatePrice = async () => {
		if (itemName === "" || itemPrice === 0) {
			return;
		}

		menu.map((item) => {
			if (item.itemName !== itemName) return;
			item.price = itemPrice;
		});
		setMenu([...menu]);

		const data = JSON.stringify({
			itemName: itemName,
			newPrice: itemPrice,
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
	};
	const deleteItem = async () => {
		if (itemName === "") {
			return;
		}

		setMenu([...menu.filter((item) => item.itemName === !itemName)]);

		const config = {
			method: "DELETE",
			url: menuItemProxyAPI + "/" + itemName,
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await flaskAPI(config);
	};

	return (
		<>
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
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Menu Item</TableCell>
									<TableCell align="right">
										Price ($)
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{menu.map((eachItem) => (
									<TableRow
										key={eachItem.itemName}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}>
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
				<FormControl fullWidth>
					<StyledDiv className="MenuItemSelection">
						<FormControl sx={{ minWidth: 150 }}>
							<InputLabel>Item</InputLabel>
							<Select
								id="SelectMenuItem"
								onChange={(event: SelectChangeEvent) => {
									setItemName(event.target.value as string);
								}}
								className="menuItems"
								label={"Item"}>
								{menu.map((menuItem, index) => {
									return (
										<MenuItem
											key={index}
											value={menuItem.itemName}>
											{menuItem.itemName}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<TextField
							type="text"
							label="New Price"
							onChange={(e) => {
								setItemPrice(Number(e.target.value));
							}}
							className="price"></TextField>

						<Button onClick={updatePrice}>Update Price</Button>
						<Button onClick={deleteItem}>Delete Item</Button>
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
			menuItems: data["items"],
		},
	};
}
