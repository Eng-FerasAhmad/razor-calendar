import { ThemeProvider, useTheme } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { dateCalendarStyles } from './styles';
import TeamList from 'components/sidebar/TeamList';
import { createDynamicTheme } from 'src/theme/theme';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { TeamModel } from 'types/teamModel';

interface SidebarProps {
    currentDate: DateTime;
    onChangeDate: (newDate: DateTime) => void;
    config: RazorCalendarConfig<CalendarConfig>;
    teamModel: TeamModel;
    onChangeTeamList: (userId: string, checked: boolean) => void;
}

export function RazorCalendarSidebar({
    currentDate,
    onChangeDate,
    config,
    teamModel,
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
                    showDaysOutsideCurrentMonth
                    displayWeekNumber={config.sidebar?.showWeekNumber}
                    value={currentDate}
                    onChange={(newValue) => {
                        if (newValue) {
                            onChangeDate(
                                DateTime.fromJSDate(newValue.toJSDate())
                            );
                        }
                    }}
                    sx={dateCalendarStyles(palette)}
                />

                <TeamList
                    teamModel={teamModel}
                    onChangeTeamList={onChangeTeamList}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}
