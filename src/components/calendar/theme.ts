import { createTheme, Theme } from '@mui/material/styles';

interface Config {
    style?: {
        primaryColor?: string;
    };
}

export const createDynamicTheme = (config: Config): Theme => {
    return createTheme({
        palette: {
            primary: {
                main: config.style?.primaryColor || '#1976d2', // Use provided primary color or fallback
            },
            secondary: {
                main: '#dc004e',
            },
            background: {
                default: '#f5f5f5',
                paper: '#ffffff',
            },
            text: {
                primary: '#333333',
                secondary: '#666666',
            },
            action: {
                hover: '#e0e0e0',
            },
            divider: '#d9d9d9',
        },
        typography: {
            fontSize: 16, // Base font size
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Replace with your fonts.primary
            body1: {
                lineHeight: '22px',
                fontWeight: 200, // Light font weight
                letterSpacing: '0.0625rem',
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        fontSize: '16px',
                        fontFamily:
                            '"Roboto", "Helvetica", "Arial", sans-serif',
                        lineHeight: '22px',
                        color: '#333333',
                    },
                    body: {
                        margin: 0,
                        padding: 0,
                        height: '100%',
                        backgroundColor: '#f5f5f5', // Corresponds to your global background
                        fontWeight: 200,
                    },
                    p: {
                        fontWeight: 200,
                        letterSpacing: '0.0625rem',
                    },
                    '#root': {
                        height: '100%',
                    },
                },
            },
        },
    });
};
