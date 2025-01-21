import { ThemeProvider, useTheme } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import TeamList from 'components/sidebar/TeamList';
import { createDynamicTheme } from 'src/theme/theme';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { TeamConfig } from 'types/teamConfig';

interface SidebarProps {
    currentDate: DateTime;
    onChangeDate: (newDate: DateTime) => void;
    config: RazorCalendarConfig<CalendarConfig>;
    teamConfig: TeamConfig;
    onChangeTeamList: (userId: string, checked: boolean) => void;
}

export function RazorCalendarSidebar({
    currentDate,
    onChangeDate,
    config,
    teamConfig,
    onChangeTeamList,
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

                        maxHeight: '300px',
                        height: '300px',

                        '& .MuiPickersDay-root': {
                            borderRadius: '50%',

                            '&:hover': {
                                backgroundColor: palette.action.hover, // Hover effect
                                color: '#4d4d4d',
                            },
                            '&.Mui-selected': {
                                color: '#fff', // Selected day text color
                            },
                        },
                        '& .MuiPickersCalendarHeader-label': {
                            marginRight: 0,
                            fontSize: '16px',
                        },
                        '& .MuiPickersYear-yearButton': {
                            fontSize: '16px', // Smaller font size for year options
                        },
                        '& .MuiYearCalendar-root': {
                            width: '275px',
                        },
                        '& .MuiPickersYear-yearButton.Mui-selected': {
                            color: '#fff',
                        },
                        '& .MuiPickersYear-yearButton:hover': {},
                        '& .MuiPickersYearPicker-root': {},
                    }}
                />

                <TeamList
                    teamConfig={teamConfig}
                    onChangeTeamList={onChangeTeamList}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}
