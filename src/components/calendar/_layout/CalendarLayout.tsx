import { DateTime } from 'luxon';
import { ReactElement, useEffect } from 'react';
import Agenda from 'agenda/Agenda';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { LayoutContainer } from 'calendar/_layout/styles';
import Team from 'calendar/team/Team';
import Day from 'day/Day';
import Month from 'month/Month';
import { Appointment, ViewType } from 'types/appointment';
import Week from 'week/Week';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
    initView: ViewType;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function CalendarLayout({
    selectedDate,
    appointments,
    initView,
    handleChangeAppointment,
}: Props): ReactElement {
    const { view, onViewChange, config } = useCalendarContext();

    useEffect(() => {
        onViewChange(initView);
    }, [initView, onViewChange]);

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
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
            case 'day':
                return (
                    <Day
                        appointments={appointments}
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
            case 'agenda':
                return <Agenda />;
            case 'team':
                return (
                    <Team
                        appointments={appointments}
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
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
        <LayoutContainer
            top={config.style.topStartFrom}
            id="calendar-layout"
            data-testid="calendar-layout"
        >
            {renderView()}
        </LayoutContainer>
    );
}
