import {
	flaskAPI,
	getOrdersAPI,
	getOrdersProxyAPI,
	serverSideInstance,
} from "../../components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { GetServerSidePropsContext } from "next";
// import { ThemeProvider } from "@emotion/react";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';
// import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface thisProp {
	serverId: string;
	serverOrders: any;
}

interface OrderItem {
	itemId: string;
	itemName: string;
	price: number;
	quantity: number;
	totalPrice: number;
}

interface ServerOrder {
	orderId: string;
	customerName: string;
	serverId: string;
	timeOrdered: string;
	isServed: boolean;
	price: number;
	items: OrderItem[];
	show?: boolean;
}


export default function Server({ serverId, serverOrders }: thisProp) {
	const [orders, setOrders] = useState<ServerOrder[]>(
		serverOrders["orders"] || []
	);

	const serveOrder = () => {};

	const router = useRouter();

	const addInfo = (index: number) => {
		orders[index].show = !orders[index].show;
		setOrders([...orders]);
	};

	/* const {data: session} = useSession()
	console.log(session?.user.id) */

	return (
		<>
			<ThemeProvider theme={StyledGrid}>
				<StyledDiv>
					<StyledButton
						onClick={() => {
							router.push("/");
						}}>
						Back
					</StyledButton>
					
					<StyledButton
						onClick={async (e) => {
							const url = await signOut({
								redirect: false,
								callbackUrl: "/",
							});
							router.push(url.url);
						}}>
						Sign Out
					</StyledButton>
				</StyledDiv>
				<StyledH1>Server</StyledH1>
				
				{orders.map((order, index) => {
					const items = order["items"];
					return (
						<StyledDiv key={index}>
							{order.customerName}
							<StyledButton onClick={() => addInfo(index)}>
								Expand
							</StyledButton>
							{order.show &&
								order.items.map((item) => {
									return (
										item.itemName +
										"; Quantity: " +
										item.quantity +
										"; Price: " +
										item.price
									);
								})}
							{order.show && order.price}
						</StyledDiv>
						// <TableContainer component={Paper}>
						// 	<Table sx={{ minWidth: 650 }} aria-label="simple table">
						// 		<TableHead>
						// 		<TableRow>
						// 			<TableCell>Customer Name</TableCell>
						// 			<TableCell align="right">Item Name</TableCell>
						// 			<TableCell align="right">Quantity</TableCell>
						// 			<TableCell align="right">Price</TableCell>
						// 		</TableRow>
						// 		</TableHead>
						// 		<TableBody>
						// 		{items.map((row) => (
						// 			<TableRow
						// 			key={row.itemName}
						// 			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						// 			>
						// 				<TableCell component="th" scope="row">
						// 					{order.customerName}
						// 				</TableCell>
						// 				<TableCell align="right">
						// 					{order.items.map((item) => {
						// 						return (
						// 							item.itemName +
						// 							"; Quantity: " +
						// 							item.quantity +
						// 							"; Price: " +
						// 							item.price
						// 						);
						// 					})}
						// 				</TableCell>
						// 				<TableCell align="right">{row.fat}</TableCell>
						// 				<TableCell align="right">{row.carbs}</TableCell>
						// 			</TableRow>
						// 		))}
						// 		</TableBody>
						// 	</Table>
						// </TableContainer>
					);
				})}
				
				<StyledDiv>	
					<StyledButton onClick={serveOrder}>Serve Order</StyledButton>
					<StyledButton
						onClick={() => {
							router.push("/server/cart");
						}}>
						Add New Order
					</StyledButton>
				</StyledDiv>
			</ThemeProvider>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const data = JSON.stringify({
		serverId: "74bfa9a8-7c52-4eaf-b7de-107c980751c4",
	});

	const instance = serverSideInstance(context);
	const response = await instance({
		method: "get",
		url: getOrdersAPI,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	});
	const orders = response.data;

	return {
		props: {
			serverOrders: orders,
		},
	};
}
