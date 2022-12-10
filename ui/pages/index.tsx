import { StyledDiv } from "@/s/mystyles";
import { Button, Grid, Grow, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Image from "next/dist/client/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Revs from "../public/images/RevsLogo.png";

const justMainPageStyleDiv = {
	marginTop: "3.5%",
};
const justMainPageStyleButtons = {
	size: "large",
};

export default function HomePage({}) {
	const router = useRouter();
	const { data: session } = useSession();

	const login = async () => {
		if (session) {
			router.push("/login/redirect");
		} else {
			await signIn("google", {
				callbackUrl: "/login/redirect",
			});
		}
	};

	return (
		<>
			<Head>
				<title>Rev&#39;s</title>
			</Head>
			<StyledDiv sx={justMainPageStyleDiv}>
				<Grow in={true} {...(true ? { timeout: 1000 } : {})}>
					<StyledDiv>
						<Typography variant="h1">
							Welcome to Rev&#39;s American Grill!
						</Typography>
						<Grid>
							<Image
								style={{
									width: "auto",
									height: "50vh",
									position: "relative",
									zIndex: 1,
								}}
								src={Revs}
								alt="Reveille"
							/>
						</Grid>
					</StyledDiv>
				</Grow>
			</StyledDiv>
			<StyledDiv></StyledDiv>

			<StyledDiv>
				<Grow in={true} {...(true ? { timeout: 1000 } : {})}>
					<StyledDiv>
						<StyledDiv>
							<Button
								sx={justMainPageStyleButtons}
								onClick={() => {
									router.push("/customer");
								}}>
								Click to Start
							</Button>
						</StyledDiv>
						<StyledDiv>
							{/* <Link href="/login">Not A Customer?</Link> */}
							{/* <Button onClick={() => login()}>
								Not a customer?
							</Button> */}
							<Button onClick={login}>Not a customer?</Button>
						</StyledDiv>
					</StyledDiv>
				</Grow>
			</StyledDiv>
		</>
	);
}
