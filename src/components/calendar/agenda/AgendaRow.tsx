import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import EventItem from './EventItem';
import {
    AgendaRowContainer,
    DateColumn,
    EventColumn,
    DateText,
    EventList,
} from 'calendar/agenda/styles';
import { Appointment } from 'types/appointment';

interface Props {
    date: string;
    events: Appointment[];
    lang: string;
}

export default function AgendaRow({ date, events, lang }: Props): ReactElement {
    const formattedDate = DateTime.fromISO(date)
        .setLocale(lang)
        .toFormat('dd. EEEE');

    return (
        <AgendaRowContainer data-testid="agenda-row-container">
            <DateColumn>
                <DateText>{formattedDate}</DateText>
            </DateColumn>
            <EventColumn>
                <EventList>
                    {events.map((event) => (
                        <EventItem
                            key={event.id}
                            appointment={event}
                            lang={lang}
                        />
                    ))}
                </EventList>
            </EventColumn>
        </AgendaRowContainer>
    );
}
