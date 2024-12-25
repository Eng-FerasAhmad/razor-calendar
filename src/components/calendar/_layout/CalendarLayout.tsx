import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import Agenda from 'agenda/Agenda';
import { LayoutContainer } from 'calendar/_layout/styles';
import Day from 'day/Day';
import Month from 'month/Month';
import { Appointment, ViewType } from 'types/appointment';
import Week from 'week/Week';

interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function CalendarLayout({
    view,
    selectedDate,
    appointments,
    handleChangeAppointment,
}: Props): ReactElement {
    const renderView = (): ReactElement => {
        switch (view) {
            case 'month':
                return (
                    <Month
                        appointments={appointments}
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
            case 'week':
                return (
                    <Week
                        appointments={appointments}
                        selectedDate={selectedDate}
                    />
                );
            case 'day':
                return (
                    <Day
                        appointments={appointments}
                        selectedDate={selectedDate}
                    />
                );
            case 'agenda':
                return <Agenda />;
            default:
                return (
                    <Month
                        appointments={appointments}
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
        }
    };

    return (
        <LayoutContainer data-testid="calendar-layout">
            {renderView()}
        </LayoutContainer>
    );
}
