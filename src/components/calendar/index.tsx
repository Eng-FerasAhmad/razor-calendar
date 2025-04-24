import { ThemeProvider, CssBaseline } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { CalendarProvider } from 'calendar/_context/CalendarContext';
import NewEventIndex from 'calendar/_dialogs/new-event';
import CalendarLayout from 'calendar/_layout/CalendarLayout';
import PopperEventDetailsIndex from 'calendar/_popper/event-details';
import DisableScrolling from 'calendar/_scrolling/Scrolling';
import { createDynamicTheme } from 'src/theme/theme';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { TeamModel } from 'types/teamModel';

import '../../i18n/i18n';

export interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    config: RazorCalendarConfig<CalendarConfig>;
    teamModel: TeamModel;
    handleChangeAppointment: (appointment: Appointment[]) => void;
    handleSaveAppointment: (appointment: Appointment) => void;
    handleDeleteAppointment: (appointment: Appointment) => void;
    onViewChange: (view: ViewType) => void;
    onChangeDate: (date: DateTime) => void;
}

export function RazorCalendar({
    appointments,
    view,
    config,
    selectedDate,
    teamModel,
    handleChangeAppointment,
    handleSaveAppointment,
    handleDeleteAppointment,
    onViewChange,
    onChangeDate,
}: Props): ReactElement {
    const theme = createDynamicTheme(config);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CalendarProvider
                currentView={view}
                config={config}
                teamModel={teamModel}
                incomingAppointments={appointments}
                onExternalChangeAppointment={handleChangeAppointment}
                onExternalViewChange={onViewChange}
                onExternalChangeDate={onChangeDate}
                onExternalSaveAppointment={handleSaveAppointment}
                onExternalDeleteAppointment={handleDeleteAppointment}
            >
                <DisableScrolling />
                <PopperEventDetailsIndex />
                <NewEventIndex />
                <CalendarLayout
                    initView={view}
                    selectedDate={selectedDate}
                    teamModel={teamModel}
                />
            </CalendarProvider>
        </ThemeProvider>
    );
}
