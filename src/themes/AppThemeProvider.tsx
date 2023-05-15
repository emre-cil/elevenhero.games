import { ReactNode, FC } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

type AppThemeProviderProps = {
  children: ReactNode;
};

declare module '@mui/material/styles' {
  interface TypeString {
    [key: string]: string;
  }

  interface TypeColor {
    Darkest?: string;
    Darker?: string;
    Dark?: string;
    Base?: string;
    Light?: string;
    Lighter?: string;
    Lightest?: string;
    White?: string;
  }
  interface PaletteOptions {
    Gradient: TypeString;
    Ink: TypeColor;
    Sky: TypeColor;
    Red: TypeColor;
    Green: TypeColor;
    Card: TypeString;
  }
}

const AppThemeProvider: FC<AppThemeProviderProps> = ({ children }) => {
  const mode = 'dark';
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode,

        // bg 191A19
        // 1E5128
        // 4E9F3D
        // D8E9A8
        primary: {
          main: '#e4e6df',
        },
        secondary: {
          main: '#4E9F3D',
        },
        background: {
          default: '#191A19',
          paper: '#1E5128',
        },
        text: {
          primary: '#e4e6df',
          secondary: '#e4e6df',
        },

        Ink: {
          Darkest: '#000000',
          Darker: '#222222',
          Dark: '#303437',
          Base: '#404446',
          Light: '#6C7072',
          Lighter: '#72777A',
        },
        Sky: {
          Dark: '#979C9E',
          Base: '#CDCFD0',
          Light: '#E3E5E5',
          Lighter: '#F2F4F5',
          Lightest: '#F7F9FA',
          White: '#FFFFFF',
        },

        Red: {
          Darkest: '#6B0206',
          Base: '#E8282B',
          Light: '#F94739',
          Lighter: '#FF9898',
          Lightest: '#FFE5E5',
        },

        Card: {
          Bronze: '#847545',
          Silver: '#69797e',
          Gold: '#ffb900',
        },
        Green: {
          Darkest: '#0A4C0A',
          Base: '#0F8B0F',
          Light: '#1EB01E',
          Lighter: '#7FF77F',
          Lightest: '#E5FFE5',
        },

        Gradient: {
          Bronze: 'linear-gradient(180deg, #9C6D3E 0%, #E8C8A9 100%)',
          Silver: 'linear-gradient(180deg, #808080 0%, #DFDFDF 100%)',
          Gold: 'linear-gradient(180deg, #A3873C 0%, #E3D294 100%)',
        },
        grey: {
          50: mode === 'dark' ? 'hsl(0, 0%, 10%)' : 'hsl(0, 5%, 95%)',
          100: mode === 'dark' ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 90%)',
          200: mode === 'dark' ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 80%)',
          300: mode === 'dark' ? 'hsl(0, 0%, 40%)' : 'hsl(0, 0%, 70%)',
          400: mode === 'dark' ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 60%)',
          500: mode === 'dark' ? 'hsl(0, 0%, 60%)' : 'hsl(0, 0%, 50%)',
          600: mode === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 40%)',
          700: mode === 'dark' ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 30%)',
          800: mode === 'dark' ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 20%)',
          900: mode === 'dark' ? 'hsl(0, 5%, 95%)' : 'hsl(0, 0%, 10%)',
        },
      },

      typography: {
        fontFamily: 'Source Sans Pro',
        body1: {
          lineHeight: '20px',
        },
        body2: {
          lineHeight: '18px',
        },
      },

      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              height: '100%',
              // lineargradient top to bottom
              background: `linear-gradient(180deg, #0b0f0c 0%, #0f1b12 25%, #16331c 50%,#1E5128 75%, #217532 100%)`,
            },
          },
        },

        MuiTypography: {
          styleOverrides: {
            root: {
              display: 'block',
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              aspectRatio: '1/1',
            },
          },
        },
        // '& .MuiOutlinedInput-root': {
        //   '& fieldset': {
        //     borderColor: 'primary.main',
        //   },
        //   '&:hover fieldset': {
        //     borderColor: 'secondary.main',
        //   },
        // },
        MuiLink: {
          styleOverrides: {
            root: {
              cursor: 'pointer',
              textDecoration: 'none',
              color: '#D8E9A8',
            },
          },
        },
      },
    }),
  );
  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
};

export default AppThemeProvider;
