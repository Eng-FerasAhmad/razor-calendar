import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    ShortLabelZoomIntervalWrapper,
    ShortTimerZoomIntervalWrapper,
    ZoomIntervalViewContainer,
} from 'calendar/_atomic/display-appointment/views/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import { timeConverter } from 'utils/timeFormatConverter';

interface Props {
    appointment: Appointment;
    color: string;
}

export default function ZoomIntervalView({
    appointment,
    color,
}: Props): ReactElement {
    const { onPopperAppointment, view, config } = useCalendarContext();

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
        <ZoomIntervalViewContainer
            color={color}
            data-testid="zoom-interval-view-container"
            onClick={popperHandler}
        >
            {view === 'day' && (
                <ShortTimerZoomIntervalWrapper>
                    {start} - {end}
                </ShortTimerZoomIntervalWrapper>
            )}
            <ShortLabelZoomIntervalWrapper>
                {appointment.title}
            </ShortLabelZoomIntervalWrapper>
        </ZoomIntervalViewContainer>
    );
}
