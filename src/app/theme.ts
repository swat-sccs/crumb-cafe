import { createTheme } from '@mui/material/styles';
import { Urbanist } from 'next/font/google';

const font = Urbanist({ subsets: ['latin'], weight: ['400'] });

declare module '@mui/material/styles' {
  interface PaletteColor {
    success?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    success: {
      main: '#C2EC7E',
    },
    primary: {
      main: '#31425f',
    },
    secondary: {
      main: '#f46523',
    },
    warning: {
      main: '#f46523',
    },
    error: {
      main: '#86001a',
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
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

export default theme;
