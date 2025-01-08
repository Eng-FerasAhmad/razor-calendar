import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import {
    IntervalViewContainer,
    ShortLabelIntervalViewWrapper,
    ShortTimerIntervalViewWrapper,
} from 'week/display-appointment/views/styles';

interface Props {
    appointment: Appointment;
}

export default function IntervalView({ appointment }: Props): ReactElement {
    const { onPopperAppointment, config } = useCalendarContext();

    const popperHandler = (event: React.MouseEvent<HTMLElement>): void => {
        onPopperAppointment({
            open: true,
            id: appointment.id,
            anchorEl: event.currentTarget,
            appointment,
        });
    };

    const start = DateTime.fromISO(appointment.start).toFormat('hh:mm');
    const end = DateTime.fromISO(appointment.end).toFormat('hh:mm');

    return (
        <IntervalViewContainer
            color={appointment.color || config.style.primaryColor}
            data-testid="interval-view-container"
            onClick={popperHandler}
        >
            <ShortTimerIntervalViewWrapper data-testid="short-timer-interval-view-wrapper">
                {start} -{end}
            </ShortTimerIntervalViewWrapper>
            <ShortLabelIntervalViewWrapper>
                {appointment.title}
            </ShortLabelIntervalViewWrapper>
        </IntervalViewContainer>
    );
}
