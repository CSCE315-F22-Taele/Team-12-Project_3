import { Typography, Button } from "@mui/material";
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
            <Typography variant="h1">Welcome to Rev's American Grill!</Typography>
            <StyledDiv sx={justMainPageStyleDiv}>
                <Image
                    style={{ width: "auto", height: "50vh", position: "relative", zIndex: 1}}
                    src={Reveille}
                    alt="Reveille"
                />
            </StyledDiv>
            <StyledDiv>
                <Button
                    sx={justMainPageStyleButtons}
					onClick={() => {
						router.push("/customer/cart");
					}}>
					Click to Get Started!
				</Button>
            </StyledDiv>
        </>
    );
}