import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async () => {
	const response = await fetch("link");
	const data = response.json();
	return data;
};

export default function Server({ serverId }: { serverId: string }) {
	const orderList: string[] = ["three", "four"];
	const menuItemsList: string[] = ["ketchup", "ranch sauce"];

	const router = useRouter();
	return (
		<>
			<button
				onClick={() => {
					router.push("/server", undefined, { shallow: true });
				}}>
				Back
			</button>

			<h1>Cart</h1>

			<div className="MenuItemSelection">
				<select name="menuItemsList" id="menuItemsList">
					{menuItemsList.map((menuItem, index) => {
						return (
                            <option value={menuItem}>
                                {menuItem + ": " + index}
                            </option>
						);
					})}
				</select>
				<textarea className="Quantity" rows={1} cols={25}>
					{"Quantity"}
				</textarea>
				<button>add</button>
			</div>
			<div className="itemsList">
				{orderList.map((order, index) => {
					return (
						<div key={index}>
							<h1>{order}</h1>
							<button>Expand</button>
						</div>
					);
				})}
			</div>

			<div className="AddOrdersSection">
				<button>Delete All</button>
				<textarea className="CustomerName" rows={1} cols={25}>
					{"Enter Name"}
				</textarea>
				<button>Submit Order</button>
			</div>
		</>
	);
}
