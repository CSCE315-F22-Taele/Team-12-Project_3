import NoAccess from "@/c/NoAccess";
import useGlobalUser from "@/h/useGlobalUser";
import Reveille from "@/p/ReveillePic.jpg";
import { StyledDiv } from "@/s/mystyles";
import { Button } from "@mui/material";
import Image from "next/dist/client/image";
import Head from "next/head";
import { useRouter } from "next/router";

const justMainPageStyleDiv = {
	marginTop: "3.5%",
};
const justMainPageStyleButtons = {
	size: "large",
};

export default function Manager() {
	const router = useRouter();
	const { isAuthorized } = useGlobalUser();
	if (!isAuthorized()) {
		return <NoAccess />;
	}

	return (
		<>
			<Head>
				<title>Server or Manager</title>
			</Head>
			<StyledDiv sx={justMainPageStyleDiv}>
				<Image
					style={{
						width: "auto",
						height: "50vh",
						position: "relative",
						zIndex: 1,
					}}
					src={Reveille}
					alt="Reveille"
				/>
			</StyledDiv>
			<StyledDiv>
				<Button
					onClick={() => router.push("/server")}
					sx={justMainPageStyleButtons}>
					Server
				</Button>
				<Button
					onClick={() => router.push("/manager/dashboard")}
					sx={justMainPageStyleButtons}>
					Manager
				</Button>
			</StyledDiv>
		</>
	);
}
