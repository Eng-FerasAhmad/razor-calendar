import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    ShortLabelZoomIntervalWrapper,
    ShortTimerZoomIntervalWrapper,
    ZoomIntervalViewContainer,
} from 'calendar/_atomic/display-appointment/views/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    appointment: Appointment;
    color: string;
}

export default function ZoomIntervalView({
    appointment,
    color,
}: Props): ReactElement {
    const { onPopperAppointment, config, view } = useCalendarContext();

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
            color={color || config.style.primaryColor}
            data-testid="zoom-interval-view-container"
            onClick={popperHandler}
        >
            {view === 'day' && (
                <ShortTimerZoomIntervalWrapper>
                    {start} -{end}
                </ShortTimerZoomIntervalWrapper>
            )}
            <ShortLabelZoomIntervalWrapper>
                {appointment.title}
            </ShortLabelZoomIntervalWrapper>
        </ZoomIntervalViewContainer>
    );
}
