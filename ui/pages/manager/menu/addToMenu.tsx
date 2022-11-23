import { Button, FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	flaskAPI,
	menuItemProxyAPI,
	serverSideInstance,
} from "../../../components/utils";
import { StyledDiv } from "../../../styles/mystyles";
import {
	InputLabel,
	MenuItem as ItemIngredient,
	TextField,
	Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface ingredientItem {
	ingredientId: string;
	ingredientName: string;
	quantity: number;
	threshold: number;
}

interface thisProp {
	ingredients: any;
}

interface ItemIngredient {
	rowId: number;
	ingredientName: string;
}

export default function NewMenuItem({ ingredients }: thisProp) {
	const router = useRouter();
	const ingredientList: ingredientItem[] = ingredients;

	const [newMenuItemName, setNewMenuItemName] = useState("");
	const [newIngredients, setNewIngredients] = useState<string[]>(["", ""]);
	const [price, setPrice] = useState(0);
	const [itemIngredients, setItemIngredients] = useState<ItemIngredient[]>(
		[]
	);
	const [selectedIngredients, setSelectedIngredients] = useState<
		ItemIngredient[]
	>([]);
	const [priceFirstPass, setPriceFirstPass] = useState(true);
	const [rowNum, setRowNum] = useState(0);

	const tableColumns: GridColDef[] = [
		{
			field: "ingredientName",
			headerName: "Ingredient Name",
			type: "string",
			width: 600,
		},
	];

	const addToItem = () => {
		let numRow = rowNum;
		setItemIngredients((itemIngredients) => {
			return [
				...itemIngredients,
				...newIngredients
					.map((ingredient) => {
						if (
							ingredient !== "" &&
							!itemIngredients.some(
								(itemIngredient) =>
									itemIngredient.ingredientName === ingredient
							)
						) {
							numRow++;
							return {
								rowId: numRow,
								ingredientName: ingredient,
							};
						} else
							return {
								rowId: 0,
								ingredientName: "",
							};
					})
					.filter((ingredient) => ingredient.ingredientName !== ""),
			];
		});
		setRowNum(numRow);
	};

	const deleteSelectedIngredients = () => {
		setItemIngredients((ingredientList) =>
			ingredientList.filter(
				(row) =>
					!selectedIngredients.some(
						(deletedItem) => deletedItem.rowId === row.rowId
					)
			)
		);
	};

	const submitOrder = async () => {
		const data = JSON.stringify({
			itemName: newMenuItemName,
			description: "Temp",
			price: price,
			linkedInventory: itemIngredients.map(
				(ingredient) => ingredient.ingredientName
			),
		});

		const config = {
			method: "POST",
			url: menuItemProxyAPI,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		const response = await flaskAPI(config);

		setItemIngredients([]);

		router.push("/manager/menu");
	};

	return (
		<>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/manager/menu");
					}}>
					Back
				</Button>
			</StyledDiv>

			<Typography variant="h1">New Menu Item Addition</Typography>

			<StyledDiv className="AddMenuItemName">
				<TextField
					type="text"
					label="New Menu Item Name"
					onChange={(e) => setNewMenuItemName(e.target.value)}
					className="item_entry"></TextField>
				<TextField
					type="text"
					inputMode="numeric"
					label="Enter Price"
					onChange={(e) => {
						if (Number(e.target.value) !== NaN) {
							setPrice(Number(e.target.value));
							setPriceFirstPass(false);
						}
					}}
					error={price <= 0 && !priceFirstPass}
					helperText={
						price <= 0 && !priceFirstPass
							? "Please enter a positive number"
							: ""
					}
					className="Quantity"></TextField>
			</StyledDiv>

			<StyledDiv className="IngredientSelection">
				<FormControl sx={{ minWidth: 150 }}>
					<InputLabel>Ingredient</InputLabel>
					<Select
						onChange={(e) =>
							setNewIngredients(() => {
								newIngredients[0] = e.target.value as string;
								return newIngredients;
							})
						}
						className="ingredients"
						label={"Ingredient"}>
						{ingredientList.map((ingredient, index) => {
							return (
								<ItemIngredient
									key={index}
									value={ingredient.ingredientName}>
									{ingredient.ingredientName}
								</ItemIngredient>
							);
						})}
					</Select>
				</FormControl>
				<TextField
					type="text"
					label="New Ingredient"
					onChange={(e) =>
						setNewIngredients(() => {
							newIngredients[1] = e.target.value;
							return newIngredients;
						})
					}
					className="item_entry"></TextField>
				<Button onClick={addToItem}>Add</Button>
				<Button onClick={deleteSelectedIngredients}>
					Remove Picked
				</Button>
			</StyledDiv>

			<StyledDiv
				className="itemsList"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: "40px",
					height: 400,
				}}>
				<DataGrid
					getRowId={(r) => r.rowId}
					rows={itemIngredients}
					columns={tableColumns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
					sx={{ maxWidth: 700, maxHeight: 700 }}
					onSelectionModelChange={(newSelection) => {
						const selectedIDs = new Set(newSelection);
						const selectedRows = itemIngredients.filter((row) =>
							selectedIDs.has(row.rowId)
						);
						setSelectedIngredients(selectedRows);
					}}
				/>
			</StyledDiv>

			<StyledDiv className="SubmitNewMenuItemInfo">
				<Button onClick={submitOrder}>Submit New Menu Item</Button>
			</StyledDiv>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = serverSideInstance(context);
	const response = await instance.get("api/inventory");
	const data = response.data;

	return {
		props: {
			ingredients: data["ingredients"],
		},
	};
}
