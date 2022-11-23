import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import {
	flaskAPI,
	getOrdersAPI,
	serveOrderProxyAPI,
	serverSideInstance,
} from "../../components/utils";
// import { ThemeProvider } from "@emotion/react";
import {
	Box,
	Button,
	Checkbox,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { StyledDiv } from "../../styles/mystyles";
// import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { GridColDef } from "@mui/x-data-grid";

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

interface rowProps {
	order: ServerOrder;
	setSelectedOrders: Dispatch<SetStateAction<string[]>>;
}

function Row({ order, setSelectedOrders }: rowProps) {
	// const { row } = props;
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow
				sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell>
					<Checkbox
						value={order.orderId}
						onChange={(e) => {
							if (e.target.checked) {
								setSelectedOrders((orders) => {
									return [...orders, e.target.value];
								});
							}
						}}
					/>
				</TableCell>
				<TableCell component="th" scope="row" align="left">
					{order.customerName}
				</TableCell>
				<TableCell align="right">
					{/* TODO: include .00 */}
					{Math.round(order.price * 100) / 100}
				</TableCell>
				<TableCell align="right">{order.timeOrdered}</TableCell>
			</TableRow>

			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div">
								Order Details
							</Typography>
							<Table size="small" aria-label="details">
								<TableHead>
									<TableRow>
										<TableCell>Item Name</TableCell>
										<TableCell align="right">
											Quantity
										</TableCell>
										<TableCell align="right">
											Price&nbsp;($)
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order.items.map((orderItem) => (
										<TableRow
											key={orderItem.itemName}
											sx={{
												"&:last-child td, &:last-child th":
													{ border: 0 },
											}}>
											<TableCell
												component="th"
												scope="row">
												{orderItem.itemName}
											</TableCell>
											<TableCell align="right">
												{orderItem.quantity}
											</TableCell>
											<TableCell align="right">
												{Math.round(
													orderItem.totalPrice * 100
												) / 100}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default function Server({ serverId, serverOrders }: thisProp) {
	const [orders, setOrders] = useState<ServerOrder[]>(
		serverOrders["orders"] || null
	);
	const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

	const serveOrder = () => {
		selectedOrders.forEach(async (orderId) => {
			setOrders((orders) =>
				orders.filter((order) => order.orderId !== orderId)
			);

			const data = JSON.stringify({
				orderId,
			});

			const config = {
				method: "PUT",
				url: serveOrderProxyAPI,
				headers: {
					"Content-Type": "application/json",
				},
				data: data,
			};

			const response = await flaskAPI(config);
		});
	};

	const router = useRouter();

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Order ID", width: 130 },
		{ field: "customerName", headerName: "Customer Name", width: 130 },
		{ field: "totalPrice", headerName: "Price", width: 130 },
		{ field: "age", headerName: "Age", type: "number", width: 90 },
	];

	return (
		<>
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
			<Typography variant="h1">Server</Typography>

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					p: 1,
					m: 1,
					bgcolor: "background.paper",
					borderRadius: 1,
				}}>
				<TableContainer
					component={Paper}
					sx={{ maxWidth: 1000, maxHeight: "60vh" }}>
					<Table aria-label="collapsible table">
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell>Select</TableCell>
								<TableCell>Customer Name</TableCell>
								<TableCell align="right">
									Total Price ($)
								</TableCell>
								<TableCell align="right">
									Time Ordered
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((row) => (
								<Row
									key={row.customerName}
									order={row}
									setSelectedOrders={setSelectedOrders}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

			<StyledDiv>
				<Button onClick={serveOrder}>Serve Order</Button>
				<Button
					onClick={() => {
						router.push("/server/cart");
					}}>
					Add New Order
				</Button>
			</StyledDiv>
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
