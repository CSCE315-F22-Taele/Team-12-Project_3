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
import { StyledDiv, StyledTheme } from "../../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";
import { Collapse, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';
// import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


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

function Row(order: ServerOrder) {
	// const { row } = props;
	const [open, setOpen] = useState(false);

	
  
	return (
		<ThemeProvider theme={StyledTheme}>
			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell>
					<IconButton
					aria-label="expand row"
					size="small"
					onClick={() => setOpen(!open)}
					>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell> 
				<TableCell component="th" scope="row" align="left">
					{order.customerName}
				</TableCell>
				<TableCell align="right">{Math.round(order.price * 100) / 100}</TableCell>
				<TableCell align="right">{order.timeOrdered}</TableCell>
			</TableRow>
			
			
			<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={open} timeout="auto" unmountOnExit>
				<Box sx={{ margin: 1 }}>
					<Typography variant="h6" gutterBottom component="div">
					Order Details
					</Typography>
					<Table size="small" aria-label="details">
					<TableHead>
						<TableRow>
						<TableCell>Item Name</TableCell>
						<TableCell align="right">Quantity</TableCell>
						<TableCell align="right">Price&nbsp;($)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{order.items.map((orderItem) => (
						<TableRow key={orderItem.itemName}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component="th" scope="row">
							{orderItem.itemName}
							</TableCell>
							<TableCell align="right">{orderItem.quantity}</TableCell>
							<TableCell align="right">{Math.round(orderItem.totalPrice * 100) / 100}</TableCell>
						</TableRow>
						))}
					</TableBody>
					</Table>
				</Box>
				</Collapse>
			</TableCell>
			</TableRow>
		</ThemeProvider>
	);
}

export default function Server({ serverId, serverOrders }: thisProp) {
	const [orders, setOrders] = useState<ServerOrder[]>(
		serverOrders["orders"] || null
	);

	const serveOrder = () => {};

	const router = useRouter();

	const addInfo = (index: number) => {
		orders[index].show = !orders[index].show;
		setOrders([...orders]);
	};

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'Order ID', width: 130 },
		{ field: 'customerName', headerName: 'Customer Name', width: 130 },
		{ field: 'totalPrice', headerName: 'Price', width: 130 },
		{ field: 'age', headerName: 'Age', type: 'number', width: 90}
	];



	return (
		<>
			<ThemeProvider theme={StyledTheme}>
				<StyledDiv>
					<Button
						onClick={() => {
							router.push("/");
						}}>
						Back
					</Button>
					
					<Button
						onClick={async (e) => {
							const url = await signOut({
								redirect: false,
								callbackUrl: "/",
							});
							router.push(url.url);
						}}>
						Sign Out
					</Button>
				</StyledDiv>
				<Typography><h1>Server</h1></Typography>

				<ThemeProvider theme={StyledTheme}>
				
					<Box sx={{
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
						p: 1,
						m: 1,
						bgcolor: 'background.paper',
						borderRadius: 1,
					}}>
						<TableContainer component={Paper} sx={{ maxWidth: 1000, maxHeight: 1000 }}>
					
							<Table aria-label="collapsible table">
								<TableHead>
								<TableRow>
									<TableCell />
									<TableCell>Customer Name</TableCell>
									<TableCell align="right">Total Price ($)</TableCell>
									<TableCell align="right">Time Ordered</TableCell>
								</TableRow>
								</TableHead>
								<TableBody>
								{orders.map((row) => (
									<Row key={row.customerName} orderId={row.orderId} customerName={row.customerName} serverId={row.serverId} timeOrdered={row.timeOrdered} isServed={row.isServed} price={row.price} items={row.items}/>
									// <Row key={row.customerName} order={row}/>
								))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</ThemeProvider>
				
				{/* {orders.map((order, index) => {
					const items = order["items"];
					return (
						<StyledDiv key={index}>
							{order.customerName}
							<Button onClick={() => addInfo(index)}>
								Expand
							</Button>
							{order.show &&
								order.items.map((item) => {
									return (
										item.itemName +
										"; Quantity: " +
										item.quantity +
										"; Price: " +
										item.totalPrice + " "
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
				})} */}
				
				<StyledDiv>	
					<Button onClick={serveOrder}>Serve Order</Button>
					<Button
						onClick={() => {
							router.push("/server/cart");
						}}>
						Add New Order
					</Button>
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
