import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	flaskAPI,
	getOrdersAPI,
	getOrdersProxyAPI,
	serveOrderProxyAPI,
	serverSideInstance,
} from "../../components/utils";
// import { ThemeProvider } from "@emotion/react";
import {
	Box,
	Button,
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
import { GridColDef } from "@mui/x-data-grid";
import { SWRConfig, useSWRConfig } from "swr";
import Orders, { ServerOrder } from "../../components/Orders";

interface thisProp {
	orders: ServerOrder[];
	serverId: string;
}

export default function Server({ orders, serverId }: thisProp) {
	const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
	const { mutate } = useSWRConfig();

	const serveOrder = () => {
		selectedOrders.forEach(async (orderId) => {
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

			mutate(
				getOrdersProxyAPI,
				(orders: ServerOrder[]) => {
					return [
						...orders.filter((order) => order.orderId !== orderId),
					];
				},
				{ revalidate: false }
			);
			await flaskAPI(config);

			// TODO: show "Served!" popup
		});
		setSelectedOrders([]);
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
					<Table stickyHeader aria-label="collapsible table">
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
							<SWRConfig
								value={{
									fallbackData: orders,
									fetcher: (url) =>
										flaskAPI(url).then(
											(r) => r.data.orders
										),
									refreshInterval: 2000,
								}}>
								<Orders setSelectedOrders={setSelectedOrders} />
							</SWRConfig>
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
	const serverId = "74bfa9a8-7c52-4eaf-b7de-107c980751c4";
	const data = JSON.stringify({
		serverId: serverId,
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
	const orders = response.data.orders;

	return {
		props: {
			orders: orders,
			serverId: serverId,
		},
	};
}
