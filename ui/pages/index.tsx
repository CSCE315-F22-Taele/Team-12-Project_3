import { Typography, Button, Grid, Grow } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import Reveille from "@/p/ReveillePic.jpg";
import Revs from "../public/images/RevsLogo.png";
import { StyledDiv } from "@/s/mystyles";
import Head from "next/head";
import Image from "next/dist/client/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const justMainPageStyleDiv = {
	marginTop: "3.5%",
};
const justMainPageStyleButtons = {
	size: "large",
};

export default function HomePage({}) {
	const router = useRouter();
	const { data: session } = useSession();
	const { user, isLoading } = useUser();

	const login = async () => {
		if (session) {
			router.push("/login/redirect");
		} else {
			await signIn("auth0", {
				callbackUrl: "/login/redirect",
			});
		}
	};

	const userType: string | undefined = useMemo(() => {
		if (user)
			return (user["https://stockDB.com/user_type"] as string).toString();
		return;
	}, [user]);

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

							{userType ? (
								userType.localeCompare("server") === 0 ? (
									<Button
										onClick={() => router.push("/server")}
										sx={justMainPageStyleButtons}>
										Server
									</Button>
								) : (
									<>
										<Button
											onClick={() =>
												router.push("/server")
											}
											sx={justMainPageStyleButtons}>
											Server
										</Button>
										<Button
											onClick={() =>
												router.push(
													"/manager/dashboard"
												)
											}
											sx={justMainPageStyleButtons}>
											Manager
										</Button>
									</>
								)
							) : (
								<Link href="/api/auth/login">
									Not a customer?
								</Link>
							)}
						</StyledDiv>
					</StyledDiv>
				</Grow>
			</StyledDiv>
		</>
	);
}
