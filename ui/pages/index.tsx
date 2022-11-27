import { Button } from "@mui/material";
import Image from "next/dist/client/image";
import { routerPush, useGlobalUser } from "../components/utils";
import Reveille from "../public/ReveillePic.jpg";
import { StyledDiv } from "../styles/mystyles";

const justMainPageStyleDiv = {
	marginTop: "20%",
};
const justMainPageStyleButtons = {
	size: "large",
};

export default function Home() {
	const [userType, setUserType] = useGlobalUser();
	// const theme = useTheme()

	return (
		<StyledDiv sx={justMainPageStyleDiv}>
			<Image
				style={{ width: "auto", height: "50vh", position: "relative", zIndex: 1}}
				src={Reveille}
				alt="Reveille"
			/>

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
	);
}
