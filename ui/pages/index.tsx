import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useGlobalUser } from "../components/utils";
import { useEffect } from "react";
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
			<button onClick={() => routerPush("server", setUserType)}>
				Manager
			</button>
		</div>
	);
}
