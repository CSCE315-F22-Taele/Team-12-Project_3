import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Manager() {
	const router = useRouter();

	return (
		<>
			<div>
				<button
					onClick={() => {
						router.push("/", undefined);
					}}>
					Back
				</button>
				<button
					onClick={async (e) => {
						const url = await signOut({
							redirect: false,
							callbackUrl: "/",
						});
						router.push(url.url);
					}}>
					Sign Out
				</button>
			</div>
			<h1>Manager</h1>
			<button
				onClick={() => {
					router.push("/manager/reports", undefined);
				}}>
				Reports
			</button>
			<button
				onClick={() => {
					router.push("/manager/menu", undefined);
				}}>
				Menu
			</button>
			<button
				onClick={() => {
					router.push("/manager/inventory", undefined);
				}}>
				Inventory
			</button>
		</>
	);
}
