import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import Agenda from 'agenda/Agenda';
import Day from 'day/Day';
import Month from 'month/Month';
import { Event, ViewType } from 'types/calendar';
import Week from 'week/Week';

interface Props {
    events: Event[];
    view: ViewType;
    selectedDate: DateTime;
    language: string;
}

export default function CalendarLayout({
    view,
    selectedDate,
    events,
}: Props): ReactElement {
    const renderView = (): ReactElement => {
        switch (view) {
            case 'month':
                return <Month events={events} selectedDate={selectedDate} />;
            case 'week':
                return (
                    <Week
                        endWorkHour={9}
                        startWorkHour={17}
                        events={events}
                        selectedDate={selectedDate}
                    />
                );
            case 'day':
                return <Day events={events} selectedDate={selectedDate} />;
            case 'agenda':
                return <Agenda />;
            default:
                return <Month events={events} selectedDate={selectedDate} />;
        }
    };

    return <div className="calendar">{renderView()}</div>;
}
