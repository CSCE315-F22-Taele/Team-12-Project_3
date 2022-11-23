const getExcessReportAPI = "/api/excess-report";
const setRestockAPI = "/api/restock";
const setThresholdAPI = "/api/threshold";
const setRestockAllAPI = "/api/restock-all";
const getMenuAPI = "/api/menu";
const getRestockReportAPI = "/api/restock-report";
const getSalesReportAPI = "/api/sales-report";
const addOrderAPI = "/api/add-order";
const getOrdersAPI = "/api/orders";
const getInventoryAPI = "/api/inventory";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: getExcessReportAPI,
				destination:
					process.env.FLASK_URL + "/api/orders/items/excess-report",
			},
			{
				source: setRestockAPI,
				destination: process.env.FLASK_URL + "/api/inventory/restock",
			},
			{
				source: setThresholdAPI,
				destination: process.env.FLASK_URL + "/api/inventory/threshold",
			},
			{
				source: setRestockAllAPI,
				destination: process.env.FLASK_URL + "/api/restock?all",
			},
			{
				source: getMenuAPI,
				destination: process.env.FLASK_URL + "/api/menu",
			},
			{
				source: getRestockReportAPI,
				destination:
					process.env.FLASK_URL + "/api/inventory?restock-report",
			},
			{
				source: getSalesReportAPI,
				destination:
					process.env.FLASK_URL + "/api/orders/items/sales-report",
			},
			{
				source: addOrderAPI,
				destination: process.env.FLASK_URL + "/api/orders/order",
			},
			{
				source: getOrdersAPI,
				// TODO: add a server's ID
				destination: process.env.FLASK_URL + "/api/orders?not-served",
			},
			{
				source: getInventoryAPI,
				destination: process.env.FLASK_URL + "/api/inventory",
			},
		];
	},
};

module.exports = nextConfig;
