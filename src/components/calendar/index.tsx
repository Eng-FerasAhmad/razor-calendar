import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import { CalendarProvider } from 'calendar/CalendarContext';
import CalendarLayout from 'calendar/CalendarLayout';
import {
    Appointment,
    CalendarConfig,
    RazorCalendarConfig,
    ViewType,
} from 'types/calendar';
import { shouldForwardProp } from 'utils/common';

export interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    handleChangeAppointment: (appointment: Appointment) => void;
    config: RazorCalendarConfig<CalendarConfig>;
}

export function RazorCalendar({
    appointments,
    view,
    config,
    selectedDate,
    handleChangeAppointment,
}: Props): ReactElement {
    return (
        <CalendarProvider config={config}>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <CalendarLayout
                    view={view}
                    selectedDate={selectedDate}
                    appointments={appointments}
                    handleChangeAppointment={handleChangeAppointment}
                />
            </StyleSheetManager>
        </CalendarProvider>
    );
}
