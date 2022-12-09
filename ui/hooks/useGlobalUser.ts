import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function useGlobalUser() {
	const { data: session } = useSession();
	const { user, isLoading } = useUser();

	const isAuthorized = useCallback(
		(type?: number) => {
			// console.log(session);
			if (session) {
				if (type) {
					return (
						session.userType === 0 ||
						session.userType === 1
					);
				}
				return session.userType === 0;
			}
			return false;
		},
		[session]
	);

	return { session, isAuthorized };
}
