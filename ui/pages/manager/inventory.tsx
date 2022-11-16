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
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";

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
			<StyledButton
				onClick={() => {
					router.push("/manager", undefined);
				}}>
				Back
			</StyledButton>

			<StyledH1>Inventory </StyledH1>

			<StyledDiv>
				<select
					onChange={(e) => {
						setSelectedIngredient(e.target.value);
					}}
					className="ingredients">
					{ingredientList.map((ingredient, index) => {
						return (
							<option
								key={index}
								value={ingredient.ingredientName}>
								{ingredient.ingredientName +
									" " +
									ingredient.quantity}
							</option>
						);
					})}
				</select>
				<input
					type="text"
					inputMode="numeric"
					placeholder="Enter amount"
					onChange={(e) => {
						setIngredientAmount(Number(e.target.value));
					}}
					className="ingredient_amount"></input>
			</StyledDiv>

			<StyledDiv>
				<label>Ingredient</label>
				<StyledButton onClick={addQuantity}>Quantity +</StyledButton>
				<StyledButton onClick={setThreshold}>Threshold set</StyledButton>
			</StyledDiv>

			<StyledDiv className="ingredientsList">
				{ingredientList.map((ingredient, index) => {
					return (
						<StyledDiv key={index}>
							{ingredient.ingredientName} {ingredient.quantity}{" "}
							{ingredient.threshold}
						</StyledDiv>
					);
				})}
			</StyledDiv>

			<StyledDiv>
				<input
					type="text"
					inputMode="numeric"
					placeholder="Restock amount"
					onChange={(e) => {
						setRestockAmount(Number(e.target.value));
					}}
					className="restock_amount"></input>
				<StyledButton onClick={restockAll}>Restock All</StyledButton>
			</StyledDiv>
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
