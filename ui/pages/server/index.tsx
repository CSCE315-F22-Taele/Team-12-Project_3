import { getOrdersAPI, serveOrderAPI } from "@/c/utils";
import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
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
import NoAccess from "@/c/NoAccess";
import Orders, { ServerOrder } from "@/c/Orders";
import { serverSideInstance } from "@/c/serverSideUtils";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { unstable_getServerSession } from "next-auth/next";
import Head from "next/head";
import useSWR from "swr";
import { authOptions } from "../api/auth/[...nextauth]";

interface thisProp {
	ordersData: ServerOrder[];
	serverId: string;
	toggleDarkTheme: () => void;
}

export default function ServerView({
	ordersData,
	serverId,
	toggleDarkTheme,
}: thisProp) {
	const router = useRouter();

	const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
	const [shouldServe, setShouldServe] = useState(false);
	const { data: orders, mutate: ordersMutate } = useSWR(
		getOrdersAPI,
		(url) => axios(url).then((r) => r.data.orders),
		{
			fallbackData: ordersData,
		}
	);

	useSWR(shouldServe ? serveOrderAPI : null, (url) => {
		selectedOrders.forEach((orderId) => {
			ordersMutate(
				(thisOrders: ServerOrder[]) => {
					return [
						...thisOrders.filter(
							(order) => order.orderId !== orderId
						),
					];
				},
				{ revalidate: false }
			);
		});
		selectedOrders.forEach(async (orderId) => {
			const data = JSON.stringify({
				orderId,
			});

			const config = {
				method: "PUT",
				url,
				headers: {
					"Content-Type": "application/json",
				},
				data: data,
			};

			await axios(config);

			// TODO: show "Served!" popup
		});
		setShouldServe(false);
		setSelectedOrders([]);
	});

	const serveOrder = () => {
		setShouldServe(true);
	};

	const columns: GridColDef[] = [
		{ field: "id", headerName: "Order ID", width: 130 },
		{ field: "customerName", headerName: "Customer Name", width: 130 },
		{ field: "totalPrice", headerName: "Price", width: 130 },
		{ field: "age", headerName: "Age", type: "number", width: 90 },
	];

	return (
		<>
			<Head>
				<title>Server Orders</title>
			</Head>
			<StyledDiv>
				<Button
					onClick={() => {
						router.push("/");
					}}>
					Back
				</Button>

				<Button
					onClick={async () => {
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
							<Orders
								orders={orders}
								setSelectedOrders={setSelectedOrders}
							/>
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
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	if (!session)
		return {
			props: {},
		};

	let serverId = "";
	if (session.userType === 2) {
		serverId = session.user.id;
		// console.log(serverId);
	}
	const data = JSON.stringify({
		serverId,
	});

	const instance = await serverSideInstance(context);
	const response = await instance({
		url: getOrdersAPI,
		params: {
			"not-served": "",
		},
		data: data,
	});
	const ordersData = response.data.orders;

	return {
		props: {
			ordersData: ordersData,
			serverId,
		},
	};
}
