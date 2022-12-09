import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function useGlobalUser() {
	const { data: session } = useSession();
	const { user, isLoading } = useUser();

	const isAuthorized = useCallback(
		(type?: string) => {
			// console.log(session);
			if (user) {
				const userType: string = (
					user["https://stockDB.com/user_type"] as string
				).toString();
				if (type) {
					return (
						userType.localeCompare("server") === 0 ||
						userType.localeCompare("manager") === 0
					);
				}
				return userType.localeCompare("manager") === 0;
			}
			return false;
		},
		[user]
	);

	return { session, isAuthorized };
}
