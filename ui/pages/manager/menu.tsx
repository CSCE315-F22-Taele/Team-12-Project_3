import { flaskAPI } from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";

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

	const addToMenu = () => {
	};
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
			<button
				onClick={() => {
					router.push("/manager", undefined);
				}}>
				Back
			</button>

			<h1>Menu</h1>

			<div>
				<input
					type="text"
					placeholder="Item entry"
					onChange={(e) => setNewItemName(e.target.value)}
					className="item_entry"></input>
				<input
					type="text"
					inputMode="numeric"
					placeholder="Price"
					onChange={(e) => {
						setNewItemPrice(Number(e.target.value));
					}}
					className="item_price"></input>
				<button onClick={addToMenu}>Add</button>
			</div>

			<div className="menuList">
				{menu.map((menuItem, index) => {
					return (
						<div key={index}>
							{menuItem.itemName} {menuItem.price}
						</div>
					);
				})}
			</div>

			<div className="MenuItemSelection">
				<select
					onChange={(e) => {
						setSelectedItem(e.target.value);
					}}
					className="menuItems">
					{menu.map((menuItem) => {
						return (
							<option value={menuItem.itemName}>
								{menuItem.itemName}
							</option>
						);
					})}
				</select>
				<input
					type="text"
					placeholder="New Price"
					onChange={(e) => {
						setItemPrice(Number(e.target.value));
					}}
					className="price"></input>

				<button onClick={updatePrice}>Update Price</button>
				<button onClick={deleteItem}>Delete Item</button>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const response = await flaskAPI.get("/menu");
	const data = response.data;

	return {
		props: {
			menuItems: data,
		},
	};
}
