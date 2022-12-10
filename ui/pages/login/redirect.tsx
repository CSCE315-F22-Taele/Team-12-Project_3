import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		// console.log(status);
		if (session) {
			// console.log(session.userType);
			if (session.userType !== 2) {
				router.push("/manager");
			} else if (session.userType === 2) {
				router.push("/server");
			} else {
				router.push("/");
			}
		} else if (status !== "loading") {
			router.push("/");
		}
	}, [session, status]);

	return <>Loading...</>;
}
