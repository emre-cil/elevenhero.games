import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

export function AppThemeProvider({ children }) {
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: '#0F8B0F',
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
      },

      typography: {
        fontFamily: 'Source Sans Pro',
        fontstyle: 'normal',
        fontColor: 'white',

        Title1: {
          fontSize: '48px',
          lineHeight: '56px',
          fontWeight: 700,
        },
        Title2: {
          fontSize: '32px',
          lineHeight: '36px',
          fontWeight: 700,
        },
        Title3: {
          fontSize: '24px',
          lineHeight: '32px',
          fontWeight: 700,
        },
        // ==== Large ====
        LargeNoneBold: {
          fontSize: '18px',
          lineHeight: '18px',
          fontWeight: 700,
        },
        LargeNoneMedium: {
          fontSize: '18px',
          lineHeight: '18px',
          fontWeight: 600,
        },
        LargeNoneRegular: {
          fontSize: '18px',
          lineHeight: '18px',
          fontWeight: 400,
        },
        LargeTightBold: {
          fontSize: '18px',
          lineHeight: '20px',
          fontWeight: 700,
        },
        LargeTightMedium: {
          fontSize: '18px',
          lineHeight: '20px',
          fontWeight: 600,
        },
        LargeTightRegular: {
          fontSize: '18px',
          lineHeight: '20px',
          fontWeight: 400,
        },
        LargeNormalBold: {
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 700,
        },
        LargeNormalMedium: {
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 600,
        },
        LargeNormalRegular: {
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 400,
        },
        // ==== REGULAR ====
        RegularNoneBold: {
          fontSize: '16px',
          lineHeight: '16px',
          fontWeight: 700,
        },
        RegularNoneMedium: {
          fontSize: '16px',
          lineHeight: '16px',
          fontWeight: 600,
        },
        RegularNoneRegular: {
          fontSize: '16px',
          lineHeight: '16px',
          fontWeight: 400,
        },
        RegularTightBold: {
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: 700,
        },
        RegularTightMedium: {
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: 600,
        },
        RegularTightRegular: {
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: 400,
        },
        RegularNormalBold: {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 700,
        },
        RegularNormalMedium: {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 600,
        },
        RegularNormalRegular: {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 400,
        },
        // ==== SMALL ====
        SmallNoneBold: {
          fontSize: '14px',
          lineHeight: '14px',
          fontWeight: 700,
        },
        SmallNoneMedium: {
          fontSize: '14px',
          lineHeight: '14px',
          fontWeight: 600,
        },
        SmallNoneRegular: {
          fontSize: '14px',
          lineHeight: '14px',
          fontWeight: 400,
        },
        SmallTightBold: {
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 700,
        },
        SmallTightMedium: {
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 600,
        },
        SmallTightRegular: {
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: 400,
        },
        SmallNormalBold: {
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 700,
        },
        SmallNormalMedium: {
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 600,
        },
        SmallNormalRegular: {
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 400,
        },
        // ==== TINY ====
        TinyNoneBold: {
          fontSize: '12px',
          lineHeight: '12px',
          fontWeight: 700,
        },
        TinyNoneMedium: {
          fontSize: '12px',
          lineHeight: '12px',
          fontWeight: 600,
        },
        TinyNoneRegular: {
          fontSize: '12px',
          lineHeight: '12px',
          fontWeight: 400,
        },
        TinyTightBold: {
          fontSize: '12px',
          lineHeight: '14px',
          fontWeight: 700,
        },
        TinyTightMedium: {
          fontSize: '12px',
          lineHeight: '14px',
          fontWeight: 600,
        },
        TinyTightRegular: {
          fontSize: '12px',
          lineHeight: '14px',
          fontWeight: 400,
        },
        TinyNormalBold: {
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: 700,
        },
        TinyNormalMedium: {
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: 600,
        },
        TinyNormalRegular: {
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: 400,
        },
      },

      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: '#000',
              color: '#fff',
              height: '100%',
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {
              // cursor: 'pointer',
              // textDecoration: 'none',
              // lineHeight: '16px',
              // transition: 'all 0.1s ease-in-out',
              // '&:hover': {
              //   opacity: 0.8,
              // },
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
      },
    }),
  );
  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
}
