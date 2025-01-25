import { ReactElement } from 'react';
import FullDaysCell from 'calendar/_atomic/display-appointment/full-days-appointment/full-days-cell/FullDaysCell';
import { FullDaysRowContainer } from 'calendar/_atomic/display-appointment/full-days-appointment/full-days-row/styles';
import { Appointment } from 'types/appointment';

interface Props {
    appointments: Appointment[];
    dayWidth: number;
    days: Date[];
    userId: string;
}

export default function FullDaysRow({
    appointments,
    dayWidth,
    days,
    userId,
}: Props): ReactElement {
    return (
        <FullDaysRowContainer>
            {appointments.map((appointment) => {
                const start = new Date(appointment.start);
                const end = new Date(appointment.end);

                const visibleStartIndex = days.findIndex(
                    (day) => day.toDateString() === start.toDateString()
                );
                const visibleEndIndex = days.findIndex(
                    (day) => day.toDateString() === end.toDateString()
                );

                if (visibleStartIndex === -1 || visibleEndIndex === -1) {
                    return null; // Skip if the appointment is outside the visible range
                }

                return (
                    <FullDaysCell
                        key={appointment.id}
                        appointment={appointment}
                        dayWidth={dayWidth} // Pass dayWidth down
                        visibleStartIndex={visibleStartIndex}
                        visibleEndIndex={visibleEndIndex}
                        userId={userId}
                    />
                );
            })}
        </FullDaysRowContainer>
    );
}
