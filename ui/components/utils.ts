import axios from "axios";
import { GetServerSidePropsContext } from "next";
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
		baseURL: process.env.BASE_URL,
		headers: {
			...extractAuthToken(context),
		},
	});
};

export const flaskAPI = axios.create({
	baseURL: process.env.BASE_URL,
});

export const getExcessReportProxyAPI = "/api/proxy/orders/items/excess-report";
export const updateInventoryProxyAPI = "/api/proxy/inventory/update";
export const setRestockAllProxyAPI = "/api/proxy/inventory/restock-all";
export const getMenuProxyAPI = "/api/proxy/menu";
export const getSalesReportProxyAPI = "/api/proxy/orders/items/sales-report";
export const addOrderProxyAPI = "/api/proxy/orders/order";
export const getOrdersProxyAPI = "/api/proxy/orders?not-served";
export const getInventoryProxyAPI = "/api/proxy/inventory";
export const menuItemProxyAPI = "/api/proxy/menu/item";
export const serveOrderProxyAPI = "/api/proxy/orders/order/serve";
export const getRestockReportProxyAPI = "/api/proxy/inventory?restock-report";

export const getExcessReportAPI = "/api/excess-report";
export const setRestockAPI = "/api/restock";
export const setThresholdAPI = "/api/threshold";
export const setRestockAllAPI = "/api/restock-all";
export const getMenuAPI = "/api/menu";
export const getMenuPlusDescriptionsAPI = "/api/menu?descriptions";
export const getRestockReportAPI = "/api/restock-report";
export const getSalesReportAPI = "/api/sales-report";
export const addOrderAPI = "/api/add-order";
export const getOrdersAPI = "/api/orders";
export const getInventoryAPI = "/api/inventory";


/* {setRestockAPI,
setThresholdAPI,
setRestockAllAPI,
getMenuAPI,
getRestockReportAPI,
getSalesReportAPI,
addOrderAPI,
getOrdersAPI,
getInventoryAPI} */
