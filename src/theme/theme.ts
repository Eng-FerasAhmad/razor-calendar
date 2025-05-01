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

export const commonFontSize = 16;
export const inputsFontSize = 15;
export const inputHoverColor = '#737373';

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
        fontSize: commonFontSize,
        body1: {
            fontWeight: 400,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    fontSize: commonFontSize,
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
                    borderColor: borderLight,
                    fontSize: commonFontSize,
                    '&:not(.Mui-disabled):hover': {
                        borderColor: borderLight,
                        backgroundColor: hoverColor,
                    },
                },
                contained: {
                    backgroundColor: primaryColor,
                    color: '#fff',
                    fontSize: commonFontSize,
                    border: `1px solid ${primaryColor}`,
                    '&:not(.Mui-disabled):hover': {
                        backgroundColor: primaryColor,
                        border: `1px solid ${primaryColor}`,
                    },
                    '&.Mui-disabled': {
                        borderColor: borderLight,
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    color: commonFontColor,
                    fontSize: commonFontSize,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontSize: inputsFontSize,
                    color: commonFontColor,

                    '&:not(.Mui-disabled):hover': {
                        borderColor: inputHoverColor,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: primaryColor,
                    },
                },
            },
        },
    },
});
