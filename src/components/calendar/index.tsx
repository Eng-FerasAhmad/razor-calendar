import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import { CalendarProvider } from 'calendar/CalendarContext';
import CalendarLayout from 'calendar/CalendarLayout';
import { Appointment, ViewType } from 'types/calendar';
import { shouldForwardProp } from 'utils/common';

export interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    language: string;
    primaryColor: string;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export function RazorCalendar({
    appointments,
    view,
    selectedDate,
    language,
    primaryColor,
    handleChangeAppointment,
}: Props): ReactElement {
    return (
        <CalendarProvider>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <CalendarLayout
                    view={view}
                    language={language}
                    selectedDate={selectedDate}
                    appointments={appointments}
                    primaryColor={primaryColor}
                    handleChangeAppointment={handleChangeAppointment}
                />
            </StyleSheetManager>
        </CalendarProvider>
    );
}
