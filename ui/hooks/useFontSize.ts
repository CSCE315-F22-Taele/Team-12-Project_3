import { useState } from "react";

const step = 0.06;
const max = 0.36;

export default function useFontSize() {
	const [fontSize, setFontSize] = useState(0);

	const increment = () => {
		setFontSize((prevFontSize) => (prevFontSize + step) % max);
	};
	// useEffect(() => console.log(fontSize), [fontSize]);

	return { fontSize, increment };
}
