import { createTheme, Theme } from '@mui/material/styles';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { ToolbarConfig } from 'types/toolbarConfig';

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

export const createDynamicTheme = (
    config: RazorCalendarConfig<CalendarConfig> | Partial<ToolbarConfig>
): Theme => {
    let primaryColor = '#33b679'; // Default color

    if ('primaryColor' in config && config.primaryColor) {
        primaryColor = config.primaryColor;
    } else if ('style' in config && config.style?.primaryColor) {
        primaryColor = config.style.primaryColor;
    }

    return createTheme({
        palette: {
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: '#737373',
            },
            background: {
                default: '#f5f5f5',
                paper: '#ffffff',
            },
            text: {
                primary: '#4d4d4d',
                secondary: '#737373',
            },
            action: {
                hover: '#f8f8f8',
            },
            divider: '#d9d9d9',
            border: '#dde3ea',
            borderLight: '#e6e6e6',
            outOfWork: '#fff',
            workTime: '#fff',
        },
        typography: {
            fontSize: 16,
            fontFamily: 'Roboto, sans-serif',
            body1: {
                lineHeight: '22px',
                fontWeight: 200,
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
                        backgroundColor: '#fff',
                        fontWeight: 200,
                    },
                    p: {
                        fontWeight: 200,
                        letterSpacing: '0.0625rem',
                    },
                    '#root': {
                        height: '100%',
                    },
                    '.no-scroll': {
                        overflow: 'hidden !important', // Disable scrolling
                    },
                },
            },
        },
    });
};
