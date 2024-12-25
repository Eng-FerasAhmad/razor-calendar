import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import Agenda from 'agenda/Agenda';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { LayoutContainer } from 'calendar/_layout/styles';
import Day from 'day/Day';
import Month from 'month/Month';
import { Appointment } from 'types/appointment';
import Week from 'week/Week';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function CalendarLayout({
    selectedDate,
    appointments,
    handleChangeAppointment,
}: Props): ReactElement {
    const { view } = useCalendarContext();

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
