import { ThemeProvider, useTheme } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import TeamList from 'components/sidebar/TeamList';
import { createDynamicTheme } from 'src/theme/theme';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { TeamModel } from 'types/teamModel';

interface SidebarProps {
    currentDate: DateTime;
    onChangeDate: (newDate: DateTime) => void;
    config: RazorCalendarConfig<CalendarConfig>;
    teamConfig: TeamModel;
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
                        width: '250px', // Adjust the calendar's width
                        height: '265px',
                        '& .MuiPickersDay-root': {
                            width: '30px', // Set the day cell width
                            height: '30px', // Set the day cell height
                            fontSize: '12px', // Adjust font size for day numbers
                            borderRadius: '50%', // Keep the circular shape

                            '&:hover': {
                                backgroundColor: palette.action.hover, // Hover effect
                                color: '#4d4d4d',
                            },
                            '&.Mui-selected': {
                                color: '#fff', // Selected day text color
                                // Selected day background
                            },
                        },
                        '& .MuiPickersCalendarHeader-label': {
                            marginRight: 0,
                            fontSize: '14px', // Adjust font size for header
                        },
                        '& .MuiPickersYear-yearButton': {
                            fontSize: '12px', // Smaller font size for year options
                        },
                        '& .MuiYearCalendar-root': {
                            width: '240px', // Adjust width of the year selection panel
                        },
                        '& .MuiPickersYear-yearButton.Mui-selected': {
                            color: '#fff',
                        },
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
