import { useRouter } from "next/router";
import { useGlobalUser } from "../components/utils";
import { routerPush } from "../components/utils";
import { useSession } from "next-auth/react";
import { Button, createTheme, Grid, Box } from "@mui/material";
import { StyledDiv, StyledTheme } from "../styles/mystyles";
import { ThemeProvider } from "@mui/material/styles";
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
		<ThemeProvider theme={StyledTheme}>
			<StyledDiv sx={justMainPageStyleDiv}>
				{/* <Image src={img} alt="Reveille"/> */}
				<Button onClick={() => routerPush("server", setUserType)} sx={justMainPageStyleButtons}>
					Server
				</Button>
				<Button onClick={() => routerPush("manager", setUserType)} sx={justMainPageStyleButtons}>
					Manager
				</Button>
			</StyledDiv>
		</ThemeProvider>
	);
}
