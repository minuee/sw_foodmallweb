
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import localFont from "next/font/local";

export const CustomManrope = localFont({ src: "../public/fonts/Manrope-Regular.ttf"});
export const CustomSourceHanSansK = localFont({ src: "../public/fonts/SourceHanSansK-VF.ttf"})
export const CustomFutura = localFont({ src: "../public/fonts/FuturaLight.ttf"});
/* 
export const customFonts = localFont({
  src: [
    {
      path: "../public/fonts/Manrope-Bold.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope-ExtraBold.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope-ExtraLight.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope-Light.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope-Medium.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope-Regular.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope-SemiBold.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/SourceHanSansK-VF.ttf",
      weight: "normal",
      style: "normal",
    },
  ],
}); */

declare module "@mui/material/styles" {
  interface ThemeOptions {
    mobileSidebarWidth?: number;
    mobileHeaderHeight?: number;
    desktopMinWidth?: number;
  }
}

declare module "@mui/material/styles/createTypography" {
  interface Typography {
    sourceHanSans: TypographyStyleOptions | undefined;
    manrope : TypographyStyleOptions | undefined;
    futura : TypographyStyleOptions | undefined;
  }

  interface TypographyOptions {
    sourceHanSans: TypographyStyleOptions | undefined;
    manrope: TypographyStyleOptions | undefined;
    futura: TypographyStyleOptions | undefined;
  }
  
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    sourceHanSans: true;
    manrope: true;
    futura: true;
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    }
  },
  typography: {
    //fontFamily: Manrope.style.fontFamily,
    sourceHanSans : {
      fontFamily: CustomSourceHanSansK.style.fontFamily,
    },
    manrope:{
      fontFamily: CustomManrope.style.fontFamily,
    },
    futura:{
      fontFamily: CustomFutura.style.fontFamily,
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // currently, you need to provide all of the default mapping because it will replace, not merge.
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h6",
          subtitle2: "h6",
          body1: "p",
          body2: "p",
          inherit: "p",
          // You have to add this line
          // otherwise the `span` (display `inline` by default)
          // cannot have margin.
          sourceHanSans: "h6",
          manrope: "h6",
          futura : "h6"
        }
      }
    },
  },
  desktopMinWidth : 1600,
  sidebarWidth: 86,
  headerHeight: 56,
  mobileSidebarWidth: 0,
  mobileHeaderHeight: 60,
});

export default theme;