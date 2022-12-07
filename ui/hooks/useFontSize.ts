import { PaletteMode, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { StyledTheme, StyledThemeDark, StyledThemeHighContrast } from "../styles/mystyles";

const step = .06;
const max = .36;

export default function useFontSize() {
    const [fontSize, setFontSize] = useState(0);

    const increment = () => {
        setFontSize((prevFontSize) =>
            (prevFontSize + step) % max
        )
    }
    // useEffect(() => console.log(fontSize), [fontSize]);

    return { fontSize, increment };
}