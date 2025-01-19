import { ThemeProvider, useTheme } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { createDynamicTheme } from 'src/theme/theme';
import { SidebarProps } from 'types/sidebarConfig';

export function RazorCalendarSidebar({
    currentDate,
    onChangeDate,
    config,
}: SidebarProps): ReactElement {
    const theme = createDynamicTheme(config);
    const { palette } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider
                localeText={{
                    calendarWeekNumberHeaderText: '#',
                    calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
                }}
                dateAdapter={AdapterLuxon}
                adapterLocale={config.common?.locale}
            >
                <DateCalendar
                    displayWeekNumber={config.sidebar?.showWeekNumber}
                    value={currentDate}
                    onChange={(newValue) => {
                        if (newValue) {
                            onChangeDate(
                                DateTime.fromJSDate(newValue.toJSDate())
                            );
                        }
                    }}
                    sx={{
                        color: '#4d4d4d',
                        width: '290px',
                        '& .MuiPickersDay-root': {
                            borderRadius: '50%', // Optional: circular day styling
                            '&:hover': {
                                backgroundColor: palette.action.hover, // Hover effect
                                color: '#4d4d4d',
                            },
                            '&.Mui-selected': {
                                color: '#fff', // Selected day text color
                            },
                        },
                    }}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}
