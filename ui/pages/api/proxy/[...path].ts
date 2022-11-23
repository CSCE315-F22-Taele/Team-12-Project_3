import Cookies from "cookies";
import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";

let API_URL = process.env.FLASK_URL;
const proxy = httpProxy.createProxyServer();

export const config = {
	api: {
		bodyParser: false,
	},
};

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

		req.url = req.url!.replace("/proxy", "");
		// console.log(req.url)

		req.headers.cookie = "";
		req.headers["Authorization"] = authToken;

		proxy.web(req, res, {
			target: API_URL,
			autoRewrite: false,
		});
	});
};
