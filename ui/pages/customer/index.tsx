import { Button, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	addOrderAPI,
	flaskAPI,
	getMenuAPI,
	serverSideInstance,
} from "../../components/utils";
import { StyledDiv } from "../../styles/mystyles";
import { Typography } from "@mui/material";

export default function HomePage({}) {
    const router = useRouter();
    return (
        <>
            <Typography variant="h1">Welcome to Rev's American Grill!</Typography>
            <StyledDiv>
                <Button
                    sx={{
                        width: 500,
                        height: 500
                    }}
					onClick={() => {
						router.push("/customer/cart");
					}}>
					Click to Get Started!
				</Button>
            </StyledDiv>
        </>
    );
}