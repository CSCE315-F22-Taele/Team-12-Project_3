import axios, { AxiosRequestConfig } from "axios";
import { GetServerSidePropsContext } from "next";
import router from "next/router";
import { createGlobalState } from "react-use";
import { IHookStateSetAction } from "react-use/lib/misc/hookState";
import { getSession } from "next-auth/react";

export const useGlobalUser = createGlobalState<string>("");

export const routerPush = (
	userType: string,
	setUserType: (state: IHookStateSetAction<string>) => void
) => {
	router.push("/" + userType);
	setUserType(() => userType);
};

const extractAuthToken = (
	context: GetServerSidePropsContext
): { [key: string]: string } | undefined => {
	const authToken = context.req.cookies["next-auth.session-token"];
	if (!authToken) {
		return undefined;
	}
	return {
		Authorization: authToken,
	};
};

export const serverSideInstance = (context: GetServerSidePropsContext) => {
	return axios.create({
		baseURL: process.env.FLASK_URL,
		headers: {
			...extractAuthToken(context),
		},
	});
};

export const flaskAPI = async (config: AxiosRequestConfig) => {
	const session = await getSession();

	return axios({
		baseURL: process.env.NEXT_PUBLIC_FLASK_URL,
		headers: {
			Authorization: session?.accessToken ?? "blah",
		},
		...config,
	});
};

export const getExcessReportProxyAPI = "/api/orders/items/excess-report";
export const updateInventoryProxyAPI = "/api/inventory/update";
export const setRestockAllProxyAPI = "/api/inventory/restock-all";
export const getMenuProxyAPI = "/api/menu";
export const getSalesReportProxyAPI = "/api/orders/items/sales-report";
export const addOrderProxyAPI = "/api/orders/order";
export const getOrdersProxyAPI = "/api/orders?not-served";
export const getInventoryProxyAPI = "/api/inventory";
export const menuItemProxyAPI = "/api/menu/item";
export const serveOrderProxyAPI = "/api/orders/order/serve";
export const getRestockReportProxyAPI = "/api/inventory?restock-report";

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
