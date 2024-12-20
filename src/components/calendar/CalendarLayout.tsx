import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import Agenda from 'agenda/Agenda';
import { LayoutContainer } from 'calendar/styles';
import Day from 'day/Day';
import Month from 'month/Month';
import { Appointment, ViewType } from 'types/calendar';
import Week from 'week/Week';

interface Props {
    appointments: Appointment[];
    view: ViewType;
    selectedDate: DateTime;
    language: string;
    primaryColor: string;
}

export default function CalendarLayout({
    view,
    selectedDate,
    appointments,
    primaryColor,
}: Props): ReactElement {
    const renderView = (): ReactElement => {
        switch (view) {
            case 'month':
                return (
                    <Month
                        appointments={appointments}
                        selectedDate={selectedDate}
                    />
                );
            case 'week':
                return (
                    <Week
                        endWorkHour={17}
                        startWorkHour={9}
                        is24HourFormat={false}
                        intervalIndex={1}
                        appointments={appointments}
                        selectedDate={selectedDate}
                        primaryColor={primaryColor}
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
