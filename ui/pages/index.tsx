import { useRouter } from "next/router";
import { useGlobalUser } from "../components/utils";
import { routerPush } from "../components/utils";
import { useSession } from "next-auth/react";
import { StyledButton, StyledDiv, StyledGrid, StyledH1 } from "../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
import { Button, createTheme, Grid, Box } from "@mui/material";
// import img from "../public/Reveille.jpg"

const justMainPageStyleDiv = {
	marginTop: "20%",
};
const justMainPageStyleButtons = {
	size: "large"
};

export default function Home() {
	const router = useRouter();
	const [userType, setUserType] = useGlobalUser();
	const {data: session} = useSession()

	return (
		<StyledDiv sx={justMainPageStyleDiv}>
			{/* <Image src={img} alt="Reveille"/> */}
			<StyledButton onClick={() => routerPush("server", setUserType)} sx={justMainPageStyleButtons}>
				Server
			</StyledButton>
			<StyledButton onClick={() => routerPush("manager", setUserType)} sx={justMainPageStyleButtons}>
				Manager
			</StyledButton>
		</StyledDiv>
	);
}
