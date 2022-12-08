import { createTheme, styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import type { } from '@mui/x-data-grid/themeAugmentation';

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
  // boxShadow: "22px 22px 79px #120d0d,-22px -22px 79px #463535;",
}));

export const StyledTheme = createTheme({
  // palette: {
  //   background: {
  //     default: "rgb(75, 64, 39)",
  //   }
  // },
  typography: {
    allVariants: {
      fontFamily: "sans-serif",
    }
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgb(167, 11, 40)',
            color: "white",
          },
          '& .MuiDataGrid-columnHeaderCheckbox': {
            backgroundColor: 'rgb(167, 11, 40)',
          },
        },
        
      }
    },
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
    MuiTableContainer: {
      styleOverrides: {
        root: {
          // boxShadow: "22px 22px 79px #120d0d,-22px -22px 79px #463535;",
        }
      }
    }
  },
});

export const StyledThemeDark = createTheme({
  palette: {
    mode: "dark",
    
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "22px 22px 79px #120d0d,-22px -22px 79px #463535;",
        }
      }
    },
    MuiDataGrid: {
      
      styleOverrides: {
        
        root: {
          // borderRadius: "55px",
          boxShadow: "22px 22px 79px #120d0d,-22px -22px 79px #463535;",
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgb(167, 11, 40)',
            color: "white",
          },
          '& .MuiDataGrid-columnHeaderCheckbox': {
            backgroundColor: 'rgb(167, 11, 40)',
          },
        }
      }
    },
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
          // boxShadow: "22px 22px 79px #120d0d,-22px -22px 79px #463535;",
          
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
          boxShadow: "22px 22px 79px #120d0d,-22px -22px 79px #463535;",
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
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "22px 22px 79px #120d0d,-22px -22px 79px #463535;",
        }
      }
    }
  },
});

export const StyledThemeHighContrast = createTheme({
  palette: {
    mode: "dark",
    error: {
      main: "#EA8181",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "sans-serif",
    }
  },
  components: {
    
    MuiCard: {
      styleOverrides: {
        root: {
          border: "2px solid white",
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "1px solid white",
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgb(167, 11, 40)',
          },
          '& .PrivateSwitchBase-root': {
            color: 'white',
          }
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          color: "grey",
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
