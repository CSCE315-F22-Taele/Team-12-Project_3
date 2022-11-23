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
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


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

// export const StyledButton = styled(Button)(({theme, variant}) => ({
//   color: 'white',
//   alignContent: 'center',
//   // border: '2px solid blue',
//   // backgroundColor: "blue",
//   backgroundColor: 'rgb(167, 11, 40)',
//   borderRadius: 10,
//   marginRight: 10,
//   textAlignLast: "center",
//   size: "large",
//   '&:hover': {
//     color: "black"
//   }
  
//   // '&.Mui-checked': {
//   //   color: 'green'
//   // }
// }));

export const StyledDiv = styled('div')(({theme, ...otherProps}) => ({
  margin: "20px",
  textAlignLast: "center",

}));



const StyledTheme = createTheme({
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
          // margin: "auto",
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          alignContent: 'center',
          // border: '2px solid blue',
          // backgroundColor: "blue",
          backgroundColor: 'rgb(167, 11, 40)',
          borderRadius: 10,
          margin: 10,
          height: 55,
          textAlignLast: "center",
          size: "large",
          '&:hover': {
            color: "black"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          h1: {
            fontSize: 30,
            textAlignLast: "center",
          }
          
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          [`&.${tableCellClasses.head}`]: {
            backgroundColor: "rgb(167, 11, 40)",
            color: "white",
            fontWeight: "bolder"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: 50,
          [`& fieldset`]: {
            borderRadius: 10,
          },
          margin: 10,
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        }
      }
    }
  }
});

export { StyledTheme };

