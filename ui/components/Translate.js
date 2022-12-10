// import { Translate } from "@google-cloud/translate/build/src/v2";
// import styles from '../styles/Home.module.css'
import { styled } from "@mui/material";
import { useEffect } from "react";

export default function TranslatedText({ children }) {
	const customDiv = styled("div")(({ theme, ...otherProps }) => ({
		// margin: "2000px",
		// textAlignLast: "center",
	}));

	var duplicateCounter = 0;

	useEffect(() => {
		var addScript = document.createElement("script");
		addScript.setAttribute(
			"src",
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		);
		document.body.appendChild(addScript);
		window.googleTranslateElementInit = googleTranslateElementInit;
	}, []);

	const googleTranslateElementInit = () => {
		if (duplicateCounter == 0) {
			new window.google.translate.TranslateElement(
				{
					pageLanguage: "en",
					// includedLanguages : "en,ms,ta,zh-CN", // include this for selected languages
					layout: google.translate.TranslateElement.InlineLayout
						.SIMPLE,
				},
				"google_translate_element"
			);
		}
		duplicateCounter++;
	};
	document.body.style.zoom = "100%";

	return (
		<customDiv
		// id="google_translate_element"
		// className={styles.container}
		>
			<div id="google_translate_element"></div>

			{children}
		</customDiv>
	);
}
