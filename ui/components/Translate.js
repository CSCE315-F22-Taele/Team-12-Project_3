// import { Translate } from "@google-cloud/translate/build/src/v2";
// import { useEffect } from 'react'
// import { useRouter } from 'next/router'

// const MyApp = ({ Component, pageProps }) => {
//   const { isFallback, events } = useRouter()

//   const googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element')
//   }

//   useEffect(() => {
//     const id = 'google-translate-script'

//     const addScript = () => {
//       const s = document.createElement('script')
//       s.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
//       s.setAttribute('id', id)
//       const q = document.getElementById(id)
//       if (!q) {
//         document.body.appendChild(s)
//         window.googleTranslateElementInit = googleTranslateElementInit
//       }
//     }

//     const removeScript = () => {
//       const q = document.getElementById(id)
//       if (q) q.remove()
//       const w = document.getElementById('google_translate_element')
//       if (w) w.innerHTML = ''
//     }

//     isFallback || addScript()

//     events.on('routeChangeStart', removeScript)
//     events.on('routeChangeComplete', addScript)

//     return () => {
//       events.off('routeChangeStart', removeScript)
//       events.off('routeChangeComplete', addScript)
//     }
//   }, [])

//   return <Component {...pageProps} />
// }

// export default MyApp

import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React, { useContext, useEffect } from 'react'
import { styled } from "@mui/material"
import { StyledDiv } from '../styles/mystyles';


export default function TranslatedText({ children }) {

    const ThisDiv = styled("div")(({ theme, ...otherProps }) => ({
        // margin: "2000px",
        // textAlignLast: "center",
    }));

    var duplicateCounter = 0;

    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, [])

    const googleTranslateElementInit = () => {

        if (duplicateCounter == 0) {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                // includedLanguages : "en,ms,ta,zh-CN", // include this for selected languages
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            },
                'google_translate_element');
        }
        duplicateCounter++;

    }
    document.body.style.zoom = "100%";



    return (
        <ThisDiv
        // id="google_translate_element"
        // className={styles.container}
        >

            <div id="google_translate_element"></div>



            {children}

        </ThisDiv>
    )
}
