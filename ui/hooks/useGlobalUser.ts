import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function useGlobalUser() {
	const { data: session } = useSession();

	const isAuthorized = useCallback(
		(type?: string) => {
			// console.log(session);
			if (session) {
				if (type) {
					return (
						session.userType.localeCompare("server") === 0 ||
						session.userType.localeCompare("manager") === 0
					);
				}
				return session.userType.localeCompare("manager") === 0;
			}
			return false;
		},
		[session]
	);

	return { session, isAuthorized };
}
