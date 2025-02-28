import { DateTime } from 'luxon';
import { ReactElement, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AgendaRow from './AgendaRow';
import { CalendarContext } from 'calendar/_context/CalendarContext';
import { AgendaContainer } from 'calendar/agenda/styles';
import { Appointment } from 'types/appointment';

interface Props {
    selectedDate: DateTime;
}

export default function Agenda({ selectedDate }: Props): ReactElement {
    const { t } = useTranslation();
    const { appointments, config } = useContext(CalendarContext);

    const lang = config.common.locale;
    const startOfMonth = selectedDate.startOf('month');
    const endOfMonth = selectedDate.endOf('month');

    const monthEvents: Appointment[] = useMemo(() => {
        return appointments!.filter((appointment: Appointment) => {
            const eventStart = DateTime.fromISO(appointment.start);
            const eventEnd = DateTime.fromISO(appointment.end);
            return eventStart >= startOfMonth && eventEnd <= endOfMonth;
        });
    }, [appointments, startOfMonth, endOfMonth]);

    const eventsByDay: Record<string, Appointment[]> = useMemo(() => {
        return monthEvents.reduce<Record<string, Appointment[]>>(
            (acc, event) => {
                const eventDate = DateTime.fromISO(event.start).toISODate();
                if (eventDate) {
                    if (!acc[eventDate]) {
                        acc[eventDate] = [];
                    }
                    acc[eventDate].push(event);
                }
                return acc;
            },
            {}
        );
    }, [monthEvents]);

    return (
        <AgendaContainer data-testid="agenda-container">
            {Object.keys(eventsByDay).length > 0 ? (
                Object.entries(eventsByDay).map(([date, dayEvents]) => (
                    <AgendaRow
                        key={date}
                        date={date}
                        events={dayEvents}
                        lang={lang}
                    />
                ))
            ) : (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    {t('agenda.noAppointments')}
                </p>
            )}
        </AgendaContainer>
    );
}
