import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    IntervalViewContainer,
    ShortLabelIntervalViewWrapper,
    ShortTimerIntervalViewWrapper,
} from 'calendar/_atomic/display-appointment/views/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    appointment: Appointment;
    color: string;
}

export default function IntervalView({
    appointment,
    color,
}: Props): ReactElement {
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
            color={color || config.style.primaryColor}
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
