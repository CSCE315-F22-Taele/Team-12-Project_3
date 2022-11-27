import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
	Box,
	Checkbox,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { ServerOrder } from "./Orders";

export interface rowProps {
	order: ServerOrder;
	setSelectedOrders: Dispatch<SetStateAction<string[]>>;
}

export default function OrderRow({ order, setSelectedOrders }: rowProps) {
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
