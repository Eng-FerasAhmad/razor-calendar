import { ThemeProvider, CssBaseline } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { CalendarProvider } from 'calendar/_context/CalendarContext';
import DetailsAppointment from 'calendar/_dialogs/details-appointment/DetailsAppointment';
import NewAppointment from 'calendar/_dialogs/new-appointment/NewAppointment';
import CalendarLayout from 'calendar/_layout/CalendarLayout';
import DisableScrolling from 'calendar/_scrolling/Scrolling';
import { RazorToolbarCompact } from 'components/toolbar/compact-toolbar';
import { createDynamicTheme } from 'src/theme/theme';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import '../../i18n/i18n';
import { TeamModel } from 'types/teamModel';

export interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    config: RazorCalendarConfig<CalendarConfig>;
    teamModel: TeamModel;
    hasCompactToolbar: boolean;
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
    hasCompactToolbar,
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
                <DetailsAppointment />
                <NewAppointment />
                {hasCompactToolbar && (
                    <RazorToolbarCompact
                        currentView={view}
                        onViewChange={onViewChange}
                        currentDate={selectedDate}
                        onNavigate={onChangeDate}
                        config={config}
                    />
                )}
                <CalendarLayout
                    initView={view}
                    selectedDate={selectedDate}
                    teamModel={teamModel}
                />
            </CalendarProvider>
        </ThemeProvider>
    );
}
