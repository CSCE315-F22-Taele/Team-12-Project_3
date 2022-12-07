import { Typography, Button, Grid, Grow } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import Reveille from "../../public/ReveillePic.jpg";
import { StyledDiv } from "../../styles/mystyles";
import Image from "next/dist/client/image";

const justMainPageStyleDiv = {
	marginTop: "3.5%",
};
const justMainPageStyleButtons = {
	size: "large",
};

export default function HomePage({}) {
    const router = useRouter();
    return (
        <>
            <head>
				<title>Welcome!</title>
			</head>
            <StyledDiv sx={justMainPageStyleDiv}>
                <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                    <StyledDiv>
                        <Typography variant="h1">Welcome to Rev&#39;s American Grill!</Typography>
                        <Grid>
                            <Image
                                style={{ width: "auto", height: "50vh", position: "relative", zIndex: 1}}
                                src={Reveille}
                                alt="Reveille"
                            />
                        </Grid>
                    </StyledDiv>
                </Grow>
            </StyledDiv>
            <StyledDiv>
                
            </StyledDiv>

            <StyledDiv>
                <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                    <StyledDiv>
                        <StyledDiv>
                            <Button
                                sx={justMainPageStyleButtons}
                                onClick={() => {
                                    router.push("/customer/cart");
                                }}>
                                Click to Start
                            </Button>
                        </StyledDiv>
                        <StyledDiv>
                            <Link href="/login">Not A Customer?</Link>
                        </StyledDiv>
                    </StyledDiv>
                </Grow>
            </StyledDiv>
        </>
    );
}
