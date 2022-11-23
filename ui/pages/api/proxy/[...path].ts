import httpProxy from "http-proxy";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";

let API_URL = process.env.FLASK_URL;
const proxy = httpProxy.createProxyServer();

export const config = {
	api: {
		bodyParser: false,
	},
};

function replaceURL(url: string) {
	let backendURL = "";

	switch (url) {
		case "/api/proxy/excess-report":
			backendURL = "/api/orders/items/excess-report";
			break;
		case "/api/proxy/restock":
			backendURL = "/api/inventory/update";
			break;
		case "/api/proxy/threshold":
			backendURL = "/api/inventory/update";
			break;
		case "/api/proxy/restock-all":
			backendURL = "/api/inventory/restock-all";
			break;
		case "/api/proxy/menu":
			backendURL = "/api/menu";
			break;
		case "/api/proxy/restock-report":
			backendURL = "/api/inventory?restock-report";
			break;
		case "/api/proxy/sales-report":
			backendURL = "/api/orders/items/sales-report";
			break;
		case "/api/proxy/add-order":
			backendURL = "/api/orders/order";
			break;
		case "/api/proxy/orders":
			backendURL = "/api/orders";
			break;
		case "/api/proxy/inventory":
			backendURL = "/api/inventory";
			break;
		case "/api/proxy/hello":
			backendURL = "/api/hello";
			break;
		case "/api/proxy/menu/item":
			backendURL = "api/menu/item";
			break;
		case "/api/proxy/serve-order":
			backendURL = "api/orders/order/serve";
			break;
	}
	return backendURL;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise(async (resolve, reject) => {
		// const token = await getToken({req})
		// console.log(token?.jti)
		const cookies = new Cookies(req, res);
		const authToken = cookies.get("next-auth.session-token");
		// console.log(authToken);

		if (!authToken) {
			signIn();
			reject();
		}

		const arr = req.url!.split("?");
		// console.log(arr[0])
		arr[0] = replaceURL(arr[0]);
		req.url = arr.join("?");
		// console.log(req.url)

		req.headers.cookie = "";
		req.headers["Authorization"] = authToken;

		proxy.web(req, res, {
			target: API_URL,
			autoRewrite: false,
		});
	});
};
