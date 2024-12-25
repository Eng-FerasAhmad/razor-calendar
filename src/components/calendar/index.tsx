import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import { CalendarProvider } from 'calendar/_context/CalendarContext';
import CalendarLayout from 'calendar/_layout/CalendarLayout';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/config';
import { shouldForwardProp } from 'utils/common';

export interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    config: RazorCalendarConfig<CalendarConfig>;
    handleChangeAppointment: (appointment: Appointment) => void;
    onViewChange: (view: ViewType) => void;
}

export function RazorCalendar({
    appointments,
    view,
    config,
    selectedDate,
    handleChangeAppointment,
    onViewChange,
}: Props): ReactElement {
    return (
        <CalendarProvider config={config} onExternalViewChange={onViewChange}>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <CalendarLayout
                    initView={view}
                    selectedDate={selectedDate}
                    appointments={appointments}
                    handleChangeAppointment={handleChangeAppointment}
                />
            </StyleSheetManager>
        </CalendarProvider>
    );
}
