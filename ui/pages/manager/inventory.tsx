import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { serverSideInstance } from "@/c/serverSideUtils";
import {
	getInventoryAPI,
	setRestockAllAPI,
	updateInventoryAPI,
} from "@/c/utils";
import { StyledDiv } from "@/s/mystyles";
import NoAccess from "@/c/NoAccess";
import useGlobalUser from "@/h/useGlobalUser";
import Head from "next/head";

interface thisProp {
	ingredients: any;
}

interface Ingredient {
	ingredientId: string;
	ingredientName: string;
	quantity: number;
	threshold: number;
}

export default function Inventory({ ingredients }: thisProp) {
	const router = useRouter();

	const [ingredientList, setIngredientList] = useState<Ingredient[]>(
		ingredients["ingredients"]
	);
	const [ingredientAmount, setIngredientAmount] = useState(0);
	const [restockAmount, setRestockAmount] = useState(0);
	const [selectedIngredient, setSelectedIngredient] = useState(
		// ingredientList[0].ingredientName
		""
	);

	const [quantityFirstPass, setQuantityFirstPass] = useState(true);
	const [restockAllFirstPass, setRestockAllFirstPass] = useState(true);
	const [itemSelectedFirstPass, setItemSelectedFirstPass] = useState(true);
	// const [quantityFirstPass, setQuantityFirstPass] = useState(true);
	// const [quantityFirstPass, setQuantityFirstPass] = useState(true);

	const addQuantity = async () => {
		const checkIngredient =
			!selectedIngredient || selectedIngredient === "";
		const checkIngredientAmount =
			!ingredientAmount ||
			isNaN(Number(ingredientAmount)) ||
			Number(ingredientAmount) <= 0;

		if (checkIngredient) setItemSelectedFirstPass(false);
		if (checkIngredientAmount) setQuantityFirstPass(false);

		if (checkIngredient || checkIngredientAmount) return;

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
			method: "PATCH",
			url: updateInventoryAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		});
		setQuantityFirstPass(true);
		setItemSelectedFirstPass(true);
	};

	const setThreshold = async () => {
		const checkIngredient =
			!selectedIngredient || selectedIngredient === "";
		const checkIngredientAmount =
			!ingredientAmount ||
			isNaN(Number(ingredientAmount)) ||
			Number(ingredientAmount) <= 0;

		if (checkIngredient) setItemSelectedFirstPass(false);
		if (checkIngredientAmount) setQuantityFirstPass(false);

		if (checkIngredient || checkIngredientAmount) return;

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
			method: "PATCH",
			url: updateInventoryAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		});
		setQuantityFirstPass(true);
		setItemSelectedFirstPass(true);
	};

	const restockAll = async () => {
		if (!restockAmount || isNaN(restockAmount) || restockAmount <= 0) {
			setRestockAllFirstPass(false);
			return;
		}

		ingredientList.map((ingredient, index) => {
			ingredientList[index].quantity += restockAmount;
		});
		setIngredientList([...ingredientList]);

		const data = JSON.stringify({
			amount: restockAmount,
		});

		const config = {
			method: "PUT",
			url: setRestockAllAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await axios(config);

		setRestockAllFirstPass(true);
	};

	const { isAuthorized } = useGlobalUser();
	if (!isAuthorized()) {
		return <NoAccess />;
	}

	return (
		<>
			<Head>
				<title>Inventory</title>
			</Head>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/manager/dashboard");
					}}>
					Back
				</Button>

				<Typography variant="h1">Inventory</Typography>
			</StyledDiv>
			<StyledDiv>
				<FormControl
					sx={{ minWidth: 150 }}
					error={
						!itemSelectedFirstPass
							? // &&
							  // !selectedIngredient
							  true
							: false
					}>
					<InputLabel>Item</InputLabel>
					<Select
						onChange={(event: SelectChangeEvent) => {
							setSelectedIngredient(event.target.value as string);
						}}
						sx={{ borderRadius: 3 }}
						className="ingredients"
						label={"Item"}>
						{ingredientList.map((ingredient, index) => {
							return (
								<MenuItem
									key={index}
									value={ingredient.ingredientName}>
									{ingredient.ingredientName}
								</MenuItem>
							);
						})}
					</Select>
					<FormHelperText
						error={
							!itemSelectedFirstPass
								? // &&
								  // !selectedIngredient
								  true
								: false
						}>
						Pick an item
					</FormHelperText>
				</FormControl>
				<TextField
					type="text"
					inputMode="numeric"
					label="Enter amount"
					error={
						!quantityFirstPass
							? // &&
							  // (!ingredientAmount ||
							  // isNaN(Number(ingredientAmount)) ||
							  // Number(ingredientAmount) <= 0)
							  true
							: false
					}
					helperText={
						!quantityFirstPass
							? // &&
							  // (!ingredientAmount ||
							  // isNaN(Number(ingredientAmount)) ||
							  // Number(ingredientAmount) <= 0)
							  "Enter a positive number"
							: ""
					}
					onChange={(e) => {
						setIngredientAmount(Number(e.target.value));
					}}
					className="ingredient_amount"></TextField>
			</StyledDiv>

			<StyledDiv>
				<Button onClick={addQuantity}>Quantity +</Button>
				<Button onClick={setThreshold}>Threshold set</Button>
			</StyledDiv>
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
								<TableCell>Ingredient Name</TableCell>
								<TableCell align="right">Quantity</TableCell>
								<TableCell align="right">Threshold</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ingredientList.map((eachItem) => (
								<TableRow
									key={eachItem.ingredientName}
									// sx={{
									// 	"&:last-child td, &:last-child th": {
									// 		border: 0,
									// 	},
									// }}
								>
									<TableCell component="th" scope="row">
										{eachItem.ingredientName}
									</TableCell>
									<TableCell align="right">
										{eachItem.quantity}
									</TableCell>
									<TableCell align="right">
										{eachItem.threshold}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

			<StyledDiv>
				<TextField
					type="text"
					inputMode="numeric"
					label="Restock amount"
					onChange={(e) => {
						setRestockAmount(Number(e.target.value));
					}}
					error={
						!restockAllFirstPass
							? // &&
							  // (!restockAmount ||
							  // isNaN(Number(restockAmount)) ||
							  // Number(restockAmount) <= 0)
							  true
							: false
					}
					helperText={
						!restockAllFirstPass
							? // &&
							  // (!restockAmount ||
							  // isNaN(Number(restockAmount)) ||
							  // Number(restockAmount) <= 0)
							  "Enter a positive number"
							: ""
					}
					className="restock_amount"></TextField>
				<Button onClick={restockAll}>Restock All</Button>
			</StyledDiv>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const config = {
		method: "get",
		url: getInventoryAPI,
	};

	const instance = await serverSideInstance(context);
	const response = await instance(config);
	const ingredients = response.data;

	return {
		props: {
			ingredients,
		},
	};
}
