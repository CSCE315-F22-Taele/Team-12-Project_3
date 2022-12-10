import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function useGlobalUser() {
	const { data: session, status } = useSession();

	const isAuthorized = useCallback(
		(type?: number) => {
			// console.log(session);
			if (session) {
				if (type) {
					return session.userType !== 0;
				}
				return session.userType !== 2;
			} else if (status !== "loading") return false;
		},
		[session, status]
	);

	return { session, isAuthorized };
}
