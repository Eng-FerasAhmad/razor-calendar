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
    return (
        <>
            {appointments.map((appointment) => (
                <MonthEventContainer
                    key={appointment.id}
                    color={primaryColor}
                    data-testid="month-event-container"
                >
                    {appointment.title}
                </MonthEventContainer>
            ))}
        </>
    );
}
