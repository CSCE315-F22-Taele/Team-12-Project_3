import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function useGlobalUser() {
	const { data: session } = useSession();

	const isAuthorized = useCallback(
		(type?: string) => {
			// console.log(session);
			if (session) {
				if (type) {
					return session.userType === 2 || session.userType === 1;
				}
				return session.userType === 1;
			}
			return false;
		},
		[session]
	);

	return { session, isAuthorized };
}
