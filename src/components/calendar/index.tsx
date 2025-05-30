import { ThemeProvider, CssBaseline } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { CalendarProvider } from 'calendar/_context/CalendarContext';
import AddServiceEventIndex from 'calendar/_dialogs/add-service-event';
import CalendarLayout from 'calendar/_layout/CalendarLayout';
import PopperEventDetailsIndex from 'calendar/_popper/event-details';
import DisableScrolling from 'calendar/_scrolling/Scrolling';
import { theme } from 'src/theme/theme';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { ServiceViewModel } from 'types/serviceModel';
import { TeamModel } from 'types/teamModel';

import '../../i18n/i18n';

export interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    config: RazorCalendarConfig<CalendarConfig>;
    teamModel: TeamModel;
    services?: ServiceViewModel[];
    handleChangeAppointment: (appointment: Appointment[]) => void;
    handleSaveAppointment: (appointment: Appointment) => void;
    handleDeleteAppointment: (appointment: Appointment) => void;
    onViewChange: (view: ViewType) => void;
    onChangeDate: (date: DateTime) => void;
    onUpdateTeamModel: (updatedTeamModel: TeamModel) => void;
}

export function RazorCalendar({
    appointments,
    view,
    config,
    selectedDate,
    teamModel,
    services,
    handleChangeAppointment,
    handleSaveAppointment,
    handleDeleteAppointment,
    onViewChange,
    onChangeDate,
    onUpdateTeamModel,
}: Props): ReactElement {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CalendarProvider
                currentView={view}
                config={config}
                teamModel={teamModel}
                selectedDate={selectedDate}
                services={services || []}
                incomingAppointments={appointments}
                onExternalChangeAppointment={handleChangeAppointment}
                onExternalViewChange={onViewChange}
                onExternalChangeDate={onChangeDate}
                onExternalSaveAppointment={handleSaveAppointment}
                onExternalDeleteAppointment={handleDeleteAppointment}
                onUpdateTeamModel={onUpdateTeamModel}
            >
                <DisableScrolling />
                <PopperEventDetailsIndex />
                <AddServiceEventIndex />
                <CalendarLayout initView={view} />
            </CalendarProvider>
        </ThemeProvider>
    );
}
