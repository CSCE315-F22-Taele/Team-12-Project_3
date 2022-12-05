import {
	Button,
	FormControl,
	FormHelperText,
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
import SpeedDialAccess from "../../../components/SpeedDialAccess";

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
	const [newMenuItemName, setNewMenuItemName] = useState("");
	const [newMenuItemPrice, setNewMenuItemPrice] = useState(0);
	const [newIngredients, setNewIngredients] = useState<string[]>(["", ""]);
	const [itemIngredients, setItemIngredients] = useState<ItemIngredient[]>(
		[]
	);
	const [selectedIngredients, setSelectedIngredients] = useState<Number[]>(
		[]
	);
	const [rowNum, setRowNum] = useState(0);
	const [newDescription, setDescription] = useState<string>("");
	
	//for error checking on the front-end and to display error
	const [newItemNameFirstPass, setItemNameFirstPass] = useState(true);
	const [newPriceFirstPass, setNewPriceFirstPass] = useState(true);
	const [pickedItemFirstPass, setPickedItemFirstPass] = useState(true);
	const [newIngredientFirstPass, setNewIngredientFirstPass] = useState(true);
	const [descriptionFirstPass, setDescriptionFirstPass] = useState(true);

	const tableColumns: GridColDef[] = [
		{
			field: "ingredientName",
			headerName: "Ingredient Name",
			type: "string",
			width: 600,
		},
	];

	const addToItem = () => {
		const checkPickedIngredient = !newIngredients || newIngredients[0] === "";
		const checkNewIngredient = !newIngredients || newIngredients[1] === "";

		if(checkPickedIngredient && checkNewIngredient) {
			setPickedItemFirstPass(false);
			setNewIngredientFirstPass(false);
			return;
		}

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
		setPickedItemFirstPass(true);
		setNewIngredientFirstPass(true);
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
		const checkItemName = !newMenuItemName || newMenuItemName === "";
		const checkPrice = !newMenuItemPrice || isNaN(Number(newMenuItemPrice)) || Number(newMenuItemPrice) <= 0;
		const checkList = !itemIngredients || itemIngredients.length === 0;
		const checkDescription = !newDescription || newDescription === "";

		if(checkItemName)
			setItemNameFirstPass(false);
		if(checkPrice)
			setNewPriceFirstPass(false);
		if(checkDescription)
			setDescriptionFirstPass(false);

		if (checkItemName || checkPrice || checkList || checkDescription) return;

		const data = JSON.stringify({
			itemName: newMenuItemName,
			description: newDescription,
			price: newMenuItemPrice,
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
			<SpeedDialAccess>
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
						onChange={(e) => {
							setNewMenuItemName(e.target.value);
						}}
						error={
							!newItemNameFirstPass
								? true
								: false
						}
						helperText={
							!newItemNameFirstPass
								? "Enter the item name"
								: ""
						}
						className="item_entry"></TextField>
					<TextField
						type="text"
						inputMode="numeric"
						label="Enter Price"
						onChange={(e) => {
							setNewMenuItemPrice(Number(e.target.value));
						}}
						error={
							!newPriceFirstPass
								? true
								: false
						}
						helperText={
							!newPriceFirstPass
								? "Please enter a positive number"
								: ""
						}
						className="Quantity"></TextField>
				</StyledDiv>

				<StyledDiv className="IngredientSelection" sx={{marginTop: "40px"}}>
					<FormControl 
						sx={{ minWidth: 150 }}
						error={
							!pickedItemFirstPass
								? true
								: false
						}
						>
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
						<FormHelperText>Pick an ingredient</FormHelperText>
					</FormControl>
					<TextField
						type="text"
						label="New Ingredient"
						error={
							!newIngredientFirstPass
								? true
								: false
						}
						helperText={
							!newIngredientFirstPass
								? "Enter the ingredient name"
								: ""
						}
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
				
				<StyledDiv sx={{marginTop: "-30px"}}>
					<FormHelperText>
						Note: Same item cannot be added multiple times. At least one Item
						must be added to the order to submit
					</FormHelperText>
				</StyledDiv>

				<StyledDiv>
					<TextField
						type="text"
						label="Enter description"
						multiline
						minRows={3}
						maxRows={3}
						error={
							!descriptionFirstPass
								? true
								: false
						}
						helperText={
							!descriptionFirstPass
								? "Enter the description"
								: ""
						}
						onChange={(e) => {
							setDescription((String)(e.target.value));
						}}
						sx={{marginBottom: "50px"}}
						className="item_entry"></TextField>
				</StyledDiv>
				<StyledDiv className="SubmitNewMenuItemInfo">
					<Button onClick={submitOrder}>Submit New Menu Item</Button>
				</StyledDiv>
			</SpeedDialAccess>
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
