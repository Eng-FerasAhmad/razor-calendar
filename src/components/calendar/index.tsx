import { ThemeProvider, CssBaseline } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { CalendarProvider } from 'calendar/_context/CalendarContext';
import DetailsAppointment from 'calendar/_dialogs/details-appointment/DetailsAppointment';
import NewAppointment from 'calendar/_dialogs/new-appointment/NewAppointment';
import CalendarLayout from 'calendar/_layout/CalendarLayout';
import DisableScrolling from 'calendar/_scrolling/Scrolling';
import { createDynamicTheme } from 'src/theme/theme';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';

export interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    config: RazorCalendarConfig<CalendarConfig>;
    handleChangeAppointment: (appointment: Appointment) => void;
    handleSaveAppointment: (appointment: Appointment) => void;
    onViewChange: (view: ViewType) => void;
    onChangeDate: (date: DateTime) => void;
}

export function RazorCalendar({
    appointments,
    view,
    config,
    selectedDate,
    handleChangeAppointment,
    handleSaveAppointment,
    onViewChange,
    onChangeDate,
}: Props): ReactElement {
    const theme = createDynamicTheme(config);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CalendarProvider
                config={config}
                onExternalViewChange={onViewChange}
                onExternalChangeDate={onChangeDate}
                onExternalSaveAppointment={handleSaveAppointment}
            >
                <DisableScrolling />
                <DetailsAppointment />
                <NewAppointment />
                <CalendarLayout
                    initView={view}
                    selectedDate={selectedDate}
                    appointments={appointments}
                    handleChangeAppointment={handleChangeAppointment}
                />
            </CalendarProvider>
        </ThemeProvider>
    );
}
