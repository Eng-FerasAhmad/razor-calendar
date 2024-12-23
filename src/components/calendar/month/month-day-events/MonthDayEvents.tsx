import { ReactElement } from 'react';
import { MonthEventContainer } from 'month/month-day-events/styles';
import { Appointment } from 'types/calendar';

interface Props {
    primaryColor: string;
    appointments: Appointment[]; // Replace `any` with the appropriate event type
}

export default function DisplayEvents({
    appointments,
    primaryColor,
}: Props): ReactElement {
    // Limit to first 3 events
    const visibleAppointments = appointments.slice(0, 3);
    const remainingCount = appointments.length - visibleAppointments.length;

    return (
        <>
            {visibleAppointments.map((appointment) => (
                <MonthEventContainer
                    key={appointment.id}
                    color={primaryColor}
                    data-testid="month-event-container"
                >
                    {appointment.title}
                </MonthEventContainer>
            ))}

            {/* Show remaining events count if applicable */}
            {remainingCount > 0 && (
                <MonthEventContainer
                    color={primaryColor}
                    data-testid="month-event-container-more"
                >
                    {`${remainingCount} more events`}
                </MonthEventContainer>
            )}
        </>
    );
}
