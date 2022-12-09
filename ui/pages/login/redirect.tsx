import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		// console.log(status);
		if (session) {
			// console.log(session.userType.localeCompare("server") === 0);
			if (session.userType === 0) {
				router.push("/manager");
			} else {
				router.push("/server");
			}
		} else if (status !== "loading") {
			router.push("/");
		}
	}, [session, status]);

	return <>Loading...</>;
}
