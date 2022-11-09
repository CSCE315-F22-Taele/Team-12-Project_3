/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: "/excess-report",
				destination: process.env.FLASK_URL + "/orders/items/excess-report",
			},
			{
				source: "/restock",
				destination: process.env.FLASK_URL + "/inventory/restock",
			},
			{
				source: "/threshold",
				destination: process.env.FLASK_URL + "/inventory/threshold",
			},
			{
				source: "/restock-all",
				destination: process.env.FLASK_URL + "/restock?all",
			},
			{
				source: "/menu",
				destination: process.env.FLASK_URL + "/menu",
			},
			{
				source: "/restock-report",
				destination: process.env.FLASK_URL + "/inventory?restock-report",
			},
			{
				source: "/sales-report",
				destination: process.env.FLASK_URL + "/orders/items/sales-report",
			},
			{
				source: "/add-order",
				destination: process.env.FLASK_URL + "/orders/order",
			},
			{
				source: "/orders",
				destination: process.env.FLASK_URL + "/orders",
			},
			{
				source: "/inventory",
				destination: process.env.FLASK_URL + "/inventory",
			},
		];
	},
};

module.exports = nextConfig;
