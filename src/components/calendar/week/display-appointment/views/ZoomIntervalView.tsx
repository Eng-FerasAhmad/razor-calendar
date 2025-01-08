import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import {
    ShortLabelZoomIntervalWrapper,
    ShortTimerZoomIntervalWrapper,
    ZoomIntervalViewContainer,
} from 'week/display-appointment/views/styles';

interface Props {
    appointment: Appointment;
}

export default function ZoomIntervalView({ appointment }: Props): ReactElement {
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
        <ZoomIntervalViewContainer
            color={appointment.color || config.style.primaryColor}
            data-testid="zoom-interval-view-container"
            onClick={popperHandler}
        >
            <ShortTimerZoomIntervalWrapper>
                {start} -{end}
            </ShortTimerZoomIntervalWrapper>
            <ShortLabelZoomIntervalWrapper>
                {appointment.title}
            </ShortLabelZoomIntervalWrapper>
        </ZoomIntervalViewContainer>
    );
}
