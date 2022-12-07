import { Button } from "@mui/material";
import Image from "next/dist/client/image";
import { routerPush, useGlobalUser } from "../components/utils";
import Reveille from "../public/ReveillePic.jpg";
import { StyledDiv } from "../styles/mystyles";
import Head from "next/head";

const justMainPageStyleDiv = {
	marginTop: "3.5%",
};
const justMainPageStyleButtons = {
	size: "large",
};

export default function Home() {
	const [userType, setUserType] = useGlobalUser();
	// const theme = useTheme()

	return (
		<>
			<head>
				<title>Rev&#39;s American Grill</title>
			</head>
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
					onClick={() => routerPush("server", setUserType)}
					sx={justMainPageStyleButtons}>
					Server
				</Button>
				<Button
					onClick={() => routerPush("manager", setUserType)}
					sx={justMainPageStyleButtons}>
					Manager
				</Button>
			</StyledDiv>
		</>
	);
}
