import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import router from "next/router";
import { createGlobalState } from "react-use";
import { IHookStateSetAction } from "react-use/lib/misc/hookState";

export const useGlobalUser = createGlobalState<string>("");

export const routerPush = (
	userType: string,
	setUserType: (state: IHookStateSetAction<string>) => void
) => {
	router.push("/" + userType);
	setUserType(() => userType);
};

export const flaskAPI = async (config: AxiosRequestConfig) => {
	const session = await getSession();
	console.log(JSON.stringify(session))

	return axios({
		baseURL: process.env.NEXT_PUBLIC_FLASK_URL,
		headers: {
			Authorization: session?.accessToken,
		},
		...config,
	});
};

export const getExcessReportAPI = "/api/orders/items/excess-report";
export const updateInventoryAPI = "/api/inventory/update";
export const setRestockAllAPI = "/api/inventory/restock-all";
export const getMenuAPI = "/api/menu";
export const getMenuPlusDescriptionsAPI = "/api/menu?descriptions";
export const getRestockReportAPI = "/api/inventory?restock-report";
export const getSalesReportAPI = "/api/orders/items/sales-report";
export const addOrderAPI = "/api/orders/order";
export const getOrdersAPI = "/api/orders?not-served";
export const getInventoryAPI = "/api/inventory";
export const menuItemAPI = "/api/menu/item";
export const serveOrderAPI = "/api/orders/order/serve";

/* {setRestockAPI,
setThresholdAPI,
setRestockAllAPI,
getMenuAPI,
getRestockReportAPI,
getSalesReportAPI,
addOrderAPI,
getOrdersAPI,
getInventoryAPI} */
