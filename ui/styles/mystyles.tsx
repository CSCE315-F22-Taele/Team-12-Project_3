import { Button, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { create } from "@mui/material/styles/createTransitions";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { SxProps } from "@mui/system";

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

export const StyledDiv = styled("div")(({ theme, ...otherProps }) => ({
  margin: "20px",
  textAlignLast: "center",
}));

export const StyledTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          
          borderRadius: 10,
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          color: "grey",
          // border: "2px solid",
          textDecoration: "italic",
          minWidth: 20,
          margin: "auto",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 5,
          margin: "auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          alignContent: "center",
          // border: '2px solid blue',
          // backgroundColor: "blue",
          backgroundColor: "rgb(167, 11, 40)",
          borderRadius: 10,
          marginRight: 10,
          marginLeft: 10,
          height: 55,
          textAlignLast: "center",
          size: "large",
          "&:hover": {
            color: "black",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
        h1: {
          fontSize: 30,
          textAlignLast: "center",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          stickyHeader: true,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          [`&.${tableCellClasses.head}`]: {
            backgroundColor: "rgb(167, 11, 40)",
            color: "white",
            fontWeight: "bolder",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: 50,
          [`& fieldset`]: {
            borderRadius: 10,
          },
        },
      },
    },
  },
});

export const StyledThemeDark = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          color: "grey",
          // border: "2px solid",
          textDecoration: "italic",
          minWidth: 20,
          margin: "auto",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 5,
          margin: "auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          alignContent: "center",
          // border: '2px solid blue',
          // backgroundColor: "blue",
          backgroundColor: "rgb(167, 11, 40)",
          borderRadius: 10,
          marginRight: 10,
          marginLeft: 10,
          height: 55,
          textAlignLast: "center",
          size: "large",
          "&:hover": {
            color: "white",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
        h1: {
          fontSize: 30,
          textAlignLast: "center",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          [`&.${tableCellClasses.head}`]: {
            backgroundColor: "rgb(167, 11, 40)",
            color: "white",
            fontWeight: "bolder",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        multiline: {
          width: "40vw",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: 50,
          [`& fieldset`]: {
            borderRadius: 10,
          },
        },
      },
    },
  },
});

export const StyledThemeHighContrast = createTheme({
  palette: {
    mode: "dark",
    error: {
      main: "#EA8181",
    },
  },

  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          color: "grey",
          border: "2px solid white",
          textDecoration: "italic",
          minWidth: 20,
          margin: "auto",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 5,
          margin: "auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          alignContent: "center",
          border: "2px solid white",
          // backgroundColor: "blue",
          backgroundColor: "rgb(167, 11, 40)",
          borderRadius: 10,
          marginRight: 10,
          marginLeft: 10,
          height: 55,
          textAlignLast: "center",
          size: "large",
          "&:hover": {
            color: "white",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
        h1: {
          fontSize: 30,
          textAlignLast: "center",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          [`&.${tableCellClasses.head}`]: {
            backgroundColor: "rgb(167, 11, 40)",
            color: "white",
            fontWeight: "bolder",
          },
          border: "2px solid white",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          height: 50,
          [`& fieldset`]: {
            borderRadius: 10,
            border: "2px solid white",
          },
        },
      },
    },
  },
});
