import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    ShortLabelViewWrapper,
    ShortTimerViewWrapper,
    StandardViewContainer,
} from 'calendar/_atomic/display-appointment/views/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    appointment: Appointment;
    color: string;
}

export default function StandardView({
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
        <StandardViewContainer
            color={color || config.style.primaryColor}
            data-testid="standard-view-container"
            onClick={popperHandler}
        >
            <ShortTimerViewWrapper>
                {start} - {end}
            </ShortTimerViewWrapper>
            <ShortLabelViewWrapper>{appointment.title}</ShortLabelViewWrapper>
        </StandardViewContainer>
    );
}
