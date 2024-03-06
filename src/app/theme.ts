import { createTheme } from '@mui/material/styles';
import { Urbanist } from 'next/font/google';

const font = Urbanist({ subsets: ['latin'], weight: ['400'] });

declare module '@mui/material/styles' {
  interface PaletteColor {
    success?: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    swipe: Palette['primary'];
    glass: Palette['primary'];
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary'];
    swipe?: PaletteOptions['primary'];
    glass?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true;
    glass: true;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    success: {
      main: '#CCFE8C',
    },
    primary: {
      main: '#93CBF3',
    },
    secondary: {
      main: '#FFA958',
    },
    warning: {
      main: '#f46523',
    },
    error: {
      main: '#86001a',
    },
    swipe: {
      main: 'FFD954',
    },
    glass: {
      main: 'rgba(255, 169, 88, 1)',
    },
    white: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    allVariants: font.style,
  },

  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `linear-gradient(217deg, rgba(46, 49, 54, 1), rgba(46, 49, 54, 0) 100.71%),
            linear-gradient(127deg, rgba(157, 225, 121, .7), rgba(157, 225, 121, 0) 50.71%),
            linear-gradient(336deg, rgba(73, 201, 230, .7), rgba(73, 201, 230, 0) 70.71%);`,
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(50px)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

export default theme;
