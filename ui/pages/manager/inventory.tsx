import {
	flaskAPI,
	getInventoryAPI,
	getInventoryProxyAPI,
	serverSideInstance,
	setRestockAllProxyAPI,
	setRestockProxyAPI,
	setThresholdProxyAPI,
} from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { StyledTheme, StyledDiv } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
		ingredientList[0].ingredientName
	);

	const addQuantity = async () => {
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

		const response = await flaskAPI({
			method: "PUT",
			url: setRestockProxyAPI,
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

		const response = await flaskAPI({
			method: "PUT",
			url: setThresholdProxyAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		});
	};

	const restockAll = async () => {
		ingredientList.map((ingredient, index) => {
			ingredientList[index].quantity += restockAmount;
		});
		setIngredientList([...ingredientList]);

		const data = JSON.stringify({
			amount: restockAmount,
		});

		const config = {
			method: "PUT",
			url: setRestockAllProxyAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await flaskAPI(config);
	};

	return (
		<>
			<ThemeProvider theme={StyledTheme}>
				<StyledDiv>
					<Button
						onClick={() => {
							router.push("/manager");
						}}>
						Back
					</Button>

					<Typography><h1>Inventory</h1></Typography>
				</StyledDiv>
				<StyledDiv>
					<Select
						onChange={(event: SelectChangeEvent) => {
							setSelectedIngredient(event.target.value as string);
						}}
						className="ingredients">
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
					<TextField
						type="text"
						inputMode="numeric"
						label="Enter amount"
						onChange={(e) => {
							setIngredientAmount(Number(e.target.value));
						}}
						className="ingredient_amount"></TextField>
				</StyledDiv>

				<StyledDiv>
					<Button onClick={addQuantity}>Quantity +</Button>
					<Button onClick={setThreshold}>Threshold set</Button>
				</StyledDiv>

				{/* <StyledDiv className="ingredientsList">
					{ingredientList.map((ingredient, index) => {
						return (
							<StyledDiv key={index}>
								{ingredient.ingredientName} {ingredient.quantity}{" "}
								{ingredient.threshold}
							</StyledDiv>
						);
					})}
				</StyledDiv> */}
				<Box 
					sx={{
					display: 'flex',
					justifyContent: 'center',
					alignContent: 'center',
					p: 1,
					m: 1,
					bgcolor: 'background.paper',
					borderRadius: 1,
					}}>
					<TableContainer component={Paper} sx={{ maxWidth: 700, maxHeight: 400 }}>
						<Table aria-label="simple table">
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
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{eachItem.ingredientName}
										</TableCell>
										<TableCell align="right">{eachItem.quantity}</TableCell>
										<TableCell align="right">{eachItem.threshold}</TableCell>
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
						className="restock_amount"></TextField>
					<Button onClick={restockAll}>Restock All</Button>
				</StyledDiv>
			</ThemeProvider>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const config = {
		method: "get",
		url: getInventoryAPI,
	};

	const instance = serverSideInstance(context);
	const response = await instance(config);
	const ingredients = response.data;

	return {
		props: {
			ingredients,
		},
	};
}