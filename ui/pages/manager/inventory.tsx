import { flaskAPI } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";

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
			url: "/restock",
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
			url: "/threshold",
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
			url: "/restock-all",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await flaskAPI(config);
	};

	return (
		<>
			<button
				onClick={() => {
					router.push("/manager", undefined);
				}}>
				Back
			</button>

			<h1>Inventory </h1>

			<div>
				<select
					onChange={(e) => {
						setSelectedIngredient(e.target.value);
					}}
					className="ingredients">
					{ingredientList.map((ingredient) => {
						return (
							<option value={ingredient.ingredientName}>
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
			</div>

			<div>
				<label>Ingredient</label>
				<button onClick={addQuantity}>Quantity +</button>
				<button onClick={setThreshold}>Threshold set</button>
			</div>

			<div className="ingredientsList">
				{ingredientList.map((ingredient, index) => {
					return (
						<div key={index}>
							{ingredient.ingredientName} {ingredient.quantity}{" "}
							{ingredient.threshold}
						</div>
					);
				})}
			</div>

			<div>
				<input
					type="text"
					inputMode="numeric"
					placeholder="Restock amount"
					onChange={(e) => {
						setRestockAmount(Number(e.target.value));
					}}
					className="restock_amount"></input>
				<button onClick={restockAll}>Restock All</button>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const config = {
		method: "get",
		url: "/inventory",
	};

	const response = await flaskAPI(config);
	const ingredients = response.data;

	return {
		props: {
			ingredients,
		},
	};
}
