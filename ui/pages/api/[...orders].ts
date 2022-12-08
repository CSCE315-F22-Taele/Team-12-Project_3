import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import {
	getMenuPlusDescriptionsAPI,
	getOrdersAPI,
	// getRestockReportAPI,
} from "../../components/utils";
import { authOptions } from "./auth/[...nextauth]";
import jwtDecode from "jwt-decode";

function getParams(url: string | undefined) {
	switch (url) {
		case getMenuPlusDescriptionsAPI:
			return { descriptions: "" };
		// case getRestockReportAPI:
		// 	return { "restock-report": "" };
		case getOrdersAPI:
			return { "not-served": "" };
		default:
			return {};
	}
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let session = null;
	if (!Object.keys(req.query).includes("customer")) {
		session = await unstable_getServerSession(req, res, authOptions);
		if (!session) {
			res.status(401).json({ error: "Unauthenticated user" });
		}
	}

	let config = {};
	if (req.method !== "GET") {
		config = {
			method: req.method,
			data: req.body,
			headers: req.headers,
		};
	}

	const response = await axios({
		baseURL: process.env.FLASK_URL,
		headers: {
			Authorization: session?.accessToken,
		},
		url: req.url,
		params: { ...getParams(req.url) },
		...config,
	});

	res.status(200).json(response.data);
};

export default handler;