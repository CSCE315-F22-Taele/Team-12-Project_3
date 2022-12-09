import { Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Reveille from "@/p/ReveillePic.jpg";
import { StyledDiv } from "@/s/mystyles";
import Image from "next/dist/client/image";
import Grow from "@mui/material/Grow";
import Head from "next/head";

const justMainPageStyleDiv = {
	marginTop: "3.5%",
};
const justMainPageStyleButtons = {
	size: "large",
};

export default function HomePage({}) {
	const router = useRouter();

	setTimeout(() => {
		router.push("/");
	}, 5000);

	return (
		<>
			<Head>
				<title>Thanks!</title>
			</Head>
			<StyledDiv sx={justMainPageStyleDiv}>
				<Grow in={true} {...(true ? { timeout: 1000 } : {})}>
					<StyledDiv>
						<Grid>
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
						</Grid>
					</StyledDiv>
				</Grow>
			</StyledDiv>
			<StyledDiv>
				<Grow in={true} {...(true ? { timeout: 1000 } : {})}>
					<StyledDiv>
						<Grid
							container
							spacing={1}
							sx={{ justifyContent: "center" }}>
							<StyledDiv>
								<Typography variant="h1">
									Thank You for the Order!
								</Typography>
								<Typography variant="h6">
									Your order will be up shortly
								</Typography>
							</StyledDiv>
						</Grid>
					</StyledDiv>
				</Grow>
			</StyledDiv>
		</>
	);
}
