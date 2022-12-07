import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import axios from "axios";

const extractAuthToken = async (context: GetServerSidePropsContext) => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	const authToken = session?.accessToken;
	// console.log(authToken);

	if (!authToken) {
		return undefined;
	}
	return {
		Authorization: authToken,
	};
};

export const serverSideInstance = async (
	context: GetServerSidePropsContext
) => {
	return axios.create({
		baseURL: process.env.FLASK_URL,
		headers: {
			...(await extractAuthToken(context)),
		},
	});
};
