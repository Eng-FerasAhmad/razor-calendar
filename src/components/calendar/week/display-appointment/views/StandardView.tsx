import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import {
    ShortLabelViewWrapper,
    ShortTimerViewWrapper,
    StandardViewContainer,
} from 'week/display-appointment/views/styles';

interface Props {
    start: string;
    end: string;
    title: string;
    color: string;
    appointment: Appointment;
}

export default function StandardView({
    start,
    end,
    title,
    color,
    appointment,
}: Props): ReactElement {
    const { onPopperAppointment } = useCalendarContext();

    const popperHandler = (event: React.MouseEvent<HTMLElement>): void => {
        onPopperAppointment({
            open: true,
            id: 'id',
            anchorEl: event.currentTarget,
            appointment,
        });
    };

    return (
        <StandardViewContainer
            color={color}
            data-testid="standard-view-container"
            onClick={popperHandler}
        >
            <ShortTimerViewWrapper>
                {start} - {end}
            </ShortTimerViewWrapper>
            <ShortLabelViewWrapper>{title}</ShortLabelViewWrapper>
        </StandardViewContainer>
    );
}
