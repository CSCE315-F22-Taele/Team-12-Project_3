// import * as React from 'react';
// import { createTheme, Button, Container, ThemeProvider } from '@mui/material';

// const theme = createTheme({
//   // components: {
//   //   MuiButton: {
//   //     variants: [
//   //       {
//   //         props: { variant: 'contained'},
//   //         style: {
//   //           border: '5px solid red',
//   //           color: 'red',
//   //         }
//   //       }
//   //     ]
//   //   },
  
    
//   // },

//   // palette: {
//   //   neutral: {
//   //     main: '#d79b4a',
//   //   }
//   // }
// });

// // declare module '@mui/material/styles' {
// //   interface MuiButton {
// //     interface: MuiButton[];
// //   }
// //   interface Palette {
// //     neutral: Palette['primary'];
// //   }
// //   interface PaletteOptions {
// //     neutral: PaletteOptions['primary'];
// //   }
// // }

// // 2. Update the Button's color prop options
// declare module "@mui/material/Button" {
//   interface ButtonPropsVariantOverrides {
//     dashed: true;
//   }
// }

// export default function getNothing() {
//   return (<></>);
// }

// export function customStyles() {
//   // 3. Profit
//   return (
//     <ThemeProvider theme={theme}>
//       <Button variant="dashed" color="error">
//         dashed
//       </Button>
//     </ThemeProvider>
//   );
// }

// // // 3. Update the Button's color prop options
// // declare module '@mui/material/Button' {
// //   interface ButtonPropsColorOverrides {
// //     neutral: true;
    
// //   }
// // }

import { Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { create } from '@mui/material/styles/createTransitions';

// const StyledFormTheme = createTheme({
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           color: "grey",
//           border: "2px solid",
//           textDecoration: "italic",
//           minWidth: 75,
//           margin: 2,
//         }
//       }
//     }
//   }
// });

// export { StyledFormTheme };

export const StyledButton = styled(Button)(({theme, variant}) => ({
  color: 'black',
  alignContent: 'center',
  // border: '2px solid blue',
  // backgroundColor: "blue",
  backgroundColor: 'lightblue',
  borderRadius: 10,
  marginRight: 10,
  textAlignLast: "center",
  size: "large",
  // '&.hover': {
  //   backgroundColor: 'red'
  // }
  
  // '&.Mui-checked': {
  //   color: 'green'
  // }
}));

export const StyledDiv = styled('div')(({theme, ...otherProps}) => ({
  margin: "auto",
  textAlignLast: "center",

}));


export const StyledH1 = styled('h1')(({theme, ...otherProps}) => ({
  fontSize: 30,
  textAlignLast: "center",
}));

const StyledGrid = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          color: "grey",
          // border: "2px solid",
          textDecoration: "italic",
          minWidth: 20,
          margin: "auto",
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 5,
          margin: "auto",
        }
      }
    }
  }
});

export { StyledGrid };

