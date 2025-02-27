import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    IntervalViewContainer,
    ShortLabelIntervalViewWrapper,
    ShortTimerIntervalViewWrapper,
} from 'calendar/_atomic/display-appointment/views/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import { timeConverter } from 'utils/timeFormatConverter';

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

    const start = timeConverter(
        DateTime.fromISO(appointment.start).toString(),
        config.hour.is24HourFormat
    );

    const end = timeConverter(
        DateTime.fromISO(appointment.end).toString(),
        config.hour.is24HourFormat
    );

    return (
        <IntervalViewContainer
            color={color}
            data-testid="interval-view-container"
            onClick={popperHandler}
        >
            <ShortTimerIntervalViewWrapper data-testid="short-timer-interval-view-wrapper">
                {start} - {end}
            </ShortTimerIntervalViewWrapper>
            <ShortLabelIntervalViewWrapper>
                {appointment.title}
            </ShortLabelIntervalViewWrapper>
        </IntervalViewContainer>
    );
}
