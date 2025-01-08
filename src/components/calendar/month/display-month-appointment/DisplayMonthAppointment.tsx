import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { MoreEventsButtonWrapper } from 'month/display-month-appointment/styles';

import DraggableEvent from 'month/drag-and-drop/DraggableEvent';
import { Appointment } from 'types/appointment';

interface Props {
    appointments: Appointment[];
}

export default function DisplayMonthAppointments({
    appointments,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    // Limit to first 3 events
    const visibleAppointments = appointments.slice(0, 3);
    const remainingCount = appointments.length - visibleAppointments.length;

    return (
        <>
            {visibleAppointments.map((appointment) => (
                <DraggableEvent
                    key={appointment.id}
                    id={appointment.id}
                    appointment={appointment}
                    title={appointment.title}
                    color={appointment.color || config.style.primaryColor}
                />
            ))}

            {remainingCount > 0 && (
                <MoreEventsButtonWrapper
                    color={config.style.primaryColor}
                    data-testid="more-events-button-wrapper"
                >
                    {`${remainingCount} more events`}
                </MoreEventsButtonWrapper>
            )}
        </>
    );
}
