import { Button } from "@mui/material";
import { routerPush, useGlobalUser } from "../components/utils";
import { StyledDiv } from "../styles/mystyles";
// import img from "../public/Reveille.jpg"

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
			{/* <Image src={img} alt="Reveille"/> */}

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
