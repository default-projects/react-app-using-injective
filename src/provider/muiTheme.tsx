import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sx: true
    sm: true
    md: true
    lg: true
    xl: true
  }

  interface CommonColors {
    mainBg: string
  }

  // interface Palette {
  //   mainBg: PaletteColor;
  // }

  // interface PaletteOptions {
  //   mainBg: PaletteColorOptions;
  // }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    // mainBg: true;
  }
}

const MuiThemeProvider = ({ children }: any) => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sx: 450,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      }
    },
    palette: {
      mode: "dark",
      common: {
        black: '#000',
        white: '#fff',
        mainBg: '#141416',
      },

      // mainBg: { main: '#141416', light: '#24262f', contrastText: "#fff" },
      // primary: { main: '#fff', light: '#f55b00', dark: '#1e0500', contrastText: 'rgba(0,0,0,0.87)' },
    },
    typography: {
      allVariants: { color: "#ffffff" },
      htmlFontSize: 16,
      fontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 800,
    },
  })

  // theme.typography.h1 = {
  //   ...theme.typography.h1,

  //   fontSize: 50,
  //   fontWeight: 500,

  //   [theme.breakpoints.down('lg')]: {
  //     fontSize: 45,
  //   },

  //   [theme.breakpoints.down('md')]: {
  //     fontSize: 40,
  //   },

  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: 35,
  //   },
  // }

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export { MuiThemeProvider };