import {
	Button,
	FormControl,
	InputLabel,
	MenuItem as ItemIngredient,
	TextField,
	Typography,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import Select from "@mui/material/Select";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useSWR from "swr";
import {
	flaskAPI,
	getInventoryAPI,
	getInventoryProxyAPI,
	menuItemProxyAPI,
	serverSideInstance,
} from "../../../components/utils";
import { StyledDiv } from "../../../styles/mystyles";

interface ingredientItem {
	ingredientId: string;
	ingredientName: string;
	quantity: number;
	threshold: number;
}

interface thisProp {
	ingredients: ingredientItem[];
}

interface ItemIngredient {
	rowId: number;
	ingredientName: string;
}

export default function NewMenuItem({ ingredients }: thisProp) {
	const router = useRouter();

	const { data: ingredientList } = useSWR(
		getInventoryProxyAPI,
		(url) => flaskAPI(url).then((r) => r.data.ingredients),
		{
			fallbackData: ingredients,
		}
	);

	const newMenuItemNameRef = useRef<HTMLInputElement | null>(null);
	const newMenuItemNameElem = newMenuItemNameRef.current;
	const newPriceRef = useRef<HTMLInputElement | null>(null);
	const newPriceElem = newPriceRef.current;

	const [newIngredients, setNewIngredients] = useState<string[]>(["", ""]);
	const [itemIngredients, setItemIngredients] = useState<ItemIngredient[]>(
		[]
	);
	const [selectedIngredients, setSelectedIngredients] = useState<Number[]>(
		[]
	);
	const [priceFirstPass, setPriceFirstPass] = useState(true);
	const [rowNum, setRowNum] = useState(0);
	const [newDescription, setDescription] = useState<string>("");

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
						(deletedItemId) => deletedItemId === row.rowId
					)
			)
		);
	};

	const submitOrder = async () => {
		if (!newMenuItemNameElem || !newPriceElem) return;

		const data = JSON.stringify({
			itemName: newMenuItemNameElem.value,
			description: newDescription,
			price: Number(newPriceElem.value),
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
					inputRef={newMenuItemNameRef}
					className="item_entry"></TextField>
				<TextField
					type="text"
					inputMode="numeric"
					label="Enter Price"
					onChange={(e) => {
						if (Number(e.target.value) !== NaN) {
							setPriceFirstPass(false);
						}
					}}
					error={
						!priceFirstPass &&
						newPriceElem &&
						Number(newPriceElem.value) <= 0
							? true
							: false
					}
					helperText={
						newPriceElem &&
						Number(newPriceElem.value) <= 0 &&
						!priceFirstPass
							? "Please enter a positive number"
							: ""
					}
					inputRef={newPriceRef}
					className="Quantity"></TextField>
			</StyledDiv>

			<StyledDiv className="IngredientSelection">
				<FormControl sx={{ minWidth: 150 }}>
					<InputLabel>Ingredient</InputLabel>
					<Select
						sx={{borderRadius: 3}}
						onChange={(e) =>
							setNewIngredients(() => {
								newIngredients[0] = e.target.value as string;
								return newIngredients;
							})
						}
						className="ingredients"
						label={"Ingredient"}>
						{ingredientList.map(
							(ingredient: ingredientItem, index: number) => {
								return (
									<ItemIngredient
										key={index}
										value={ingredient.ingredientName}>
										{ingredient.ingredientName}
									</ItemIngredient>
								);
							}
						)}
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
						const selectedRows = itemIngredients
							.map((row) => {
								if (selectedIDs.has(row.rowId))
									return row.rowId;
								else return -1;
							})
							.filter((rowId) => rowId !== -1);
						setSelectedIngredients(selectedRows);
					}}
				/>
			</StyledDiv>

			<StyledDiv>
				<TextField
					type="text"
					label="Enter description"
					multiline
					minRows={3}
					maxRows={3}
					onChange={(e) => {
						setDescription((String)(e.target.value));
					}}
					sx={{marginBottom: "50px"}}
					className="item_entry"></TextField>
			</StyledDiv>
			<StyledDiv className="SubmitNewMenuItemInfo">
				<Button onClick={submitOrder}>Submit New Menu Item</Button>
			</StyledDiv>
			
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const instance = serverSideInstance(context);
	const response = await instance.get(getInventoryAPI);
	const data = response.data.ingredients;

	return {
		props: {
			ingredients: data,
		},
	};
}
