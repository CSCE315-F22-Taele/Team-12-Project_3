import { Typography, Button, Grid, Grow } from "@mui/material";
import { useRouter } from "next/router";
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

            <StyledDiv sx={justMainPageStyleDiv}>
                <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
                    <StyledDiv>
                        <Typography variant="h1">Welcome to Rev&#93;s American Grill!</Typography>
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
                        <Grid container spacing={1} sx={{justifyContent: "center"}}>
                            <StyledDiv>
                                <Button
                                    sx={justMainPageStyleButtons}
                                    onClick={() => {
                                        router.push("/customer/cart");
                                    }}>
                                    Click to Get Started!
                                </Button>
                            </StyledDiv>
                        </Grid>
                    </StyledDiv>
                </Grow>
            </StyledDiv>
        </>
    );
}
