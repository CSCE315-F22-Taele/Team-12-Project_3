import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";
export default async function Order() {
	// const [order, setOrder] = useState("");

	const order = JSON.stringify({
		name: "Dien",
		items: [
			{
				itemName: "pee",
				quantity: 2,
			},
		],
	});

/* 	const server = axios.create({
		baseURL: "http://127.0.0.1:5000",
	});

	await server.post("/order", {
		data: {
			 order,
		},
	});
 */	// const data = response.data;
	// console.log(data);

	/* const submitOrder = async () => {
		const response = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify(order),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
	}; */

	return (
		<>
			{/* <input
				type="text"
				value={order}
				onChange={(e) => setOrder(e.target.value)}
			/>
			<button onClick={submitOrder}>Submit order</button> */}
			<StyledH1>Order Page</StyledH1>
		</>
	);
}
