import { Typography, Button, Grid, Grow } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import Reveille from "@/p/ReveillePic.jpg";
import Revs from "../public/images/RevsLogo.png";
import { StyledDiv } from "@/s/mystyles";
import Head from "next/head";
import Image from "next/dist/client/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

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
			await signIn("auth0", {
				callbackUrl: "/login/redirect",
			});
		}
	};

	return (
		<>
			<head>
				<title>Welcome</title>
			</head>
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
							<Button onClick={() => login()}>
								Not a customer?
							</Button>
						</StyledDiv>
					</StyledDiv>
				</Grow>
			</StyledDiv>
		</>
	);
}
