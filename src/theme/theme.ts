import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        border: string;
        borderLight: string;
        outOfWork?: string;
        workTime?: string;
    }
    interface PaletteOptions {
        border?: string;
        borderLight?: string;
        outOfWork?: string;
        workTime?: string;
    }
}

export const primaryColor = '#33b679';
export const secondaryColor = '#737373';
export const commonFontColor = '#4d4d4d';
export const borderColor = '#dde3ea';
export const borderLight = '#e6e6e6';
export const hoverColor = '#f8f8f8';
export const dividerColor = '#d9d9d9';

export const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
            contrastText: '#fff',
        },
        secondary: {
            main: secondaryColor,
            contrastText: commonFontColor,
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        action: {
            hover: hoverColor,
        },
        divider: dividerColor,
        border: borderColor,
        borderLight,
        outOfWork: '#fff',
        workTime: '#fff',
    },
    typography: {
        fontSize: 16,
        body1: {
            fontWeight: 400,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    fontSize: '16px',
                    fontFamily: 'Roboto, sans-serif',
                },
                body: {
                    margin: 0,
                    padding: 0,
                    height: '100%',
                    backgroundColor: '#fff',
                },
                p: {
                    fontWeight: 560,
                    letterSpacing: '0',
                },
                '#root': {
                    height: '100%',
                },
                '.no-scroll': {
                    overflow: 'hidden !important',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                outlined: {
                    color: commonFontColor,
                    borderColor,
                    '&:hover': {
                        borderColor,
                        backgroundColor: hoverColor,
                    },
                },
                contained: {
                    backgroundColor: primaryColor,
                    color: '#fff',
                    border: `1px solid ${primaryColor}`,
                    '&:hover': {
                        backgroundColor: primaryColor,
                        border: `1px solid ${primaryColor}`,
                    },
                },
            },
        },
    },
});
