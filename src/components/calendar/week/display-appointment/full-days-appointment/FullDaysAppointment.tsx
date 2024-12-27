import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    FullDaysEventHeaderContainer,
    FullDaysEventHeaderWrapper,
    FullDayTitleWrapper,
    WeekDayHeaderWrapper,
} from './styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    days: DateTime<boolean>[];
    fullDayAppointments: Appointment[];
}

export default function FullDaysAppointment({
    fullDayAppointments,
    days,
}: Props): ReactElement {
    const { config } = useCalendarContext();

    return (
        <FullDaysEventHeaderContainer data-testid="full-days-event-header-container">
            {days.map((day) => (
                <WeekDayHeaderWrapper key={day.toISO()}>
                    {fullDayAppointments.map((appointment) => {
                        const start = DateTime.fromISO(
                            appointment.start
                        ).startOf('day');
                        const end = DateTime.fromISO(appointment.end).startOf(
                            'day'
                        );

                        // Check if the appointment spans the current day
                        const isOnDay = day >= start && day <= end;

                        if (!isOnDay) {
                            return null;
                        }

                        return (
                            <FullDaysEventHeaderWrapper key={appointment.id}>
                                <FullDayTitleWrapper
                                    color={config.style.primaryColor}
                                >
                                    {appointment.title}
                                </FullDayTitleWrapper>
                            </FullDaysEventHeaderWrapper>
                        );
                    })}
                </WeekDayHeaderWrapper>
            ))}
        </FullDaysEventHeaderContainer>
    );
}
