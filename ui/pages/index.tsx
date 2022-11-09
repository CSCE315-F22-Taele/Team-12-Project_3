import { useRouter } from "next/router";
import { useGlobalUser } from "../components/utils";
import { routerPush } from "../components/utils";
// import img from "../public/Reveille.jpg"

export default function Home() {
	const router = useRouter();
	const [userType, setUserType] = useGlobalUser();

	return (
		<div>
			{/* <Image src={img} alt="Reveille"/> */}
			<button onClick={() => routerPush("server", setUserType)}>
				Server
			</button>
			<button onClick={() => routerPush("manager", setUserType)}>
				Manager
			</button>
		</div>
	);
}
