import { Button } from "@mui/material";
import Image from "next/dist/client/image";
import { useGlobalUser } from "@/c/utils";
import { useRouter } from "next/router";
import Reveille from "@/p/ReveillePic.jpg";
import { StyledDiv } from "@/s/mystyles";

const justMainPageStyleDiv = {
	marginTop: "3.5%",
};
const justMainPageStyleButtons = {
	size: "large",
};

export default function Manager() {
	const [userType, setUserType] = useGlobalUser();
	// const theme = useTheme()
	const router = useRouter();

	return (
		<>
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
					onClick={() => router.push("/manager/main-view")}
					sx={justMainPageStyleButtons}>
					Manager
				</Button>
			</StyledDiv>
		</>
	);
}

export async function getServerSideProps() {
	require("dotenv-vault-core").config();
	// console.log(process.env);

	return {
		props: {},
	};
}
