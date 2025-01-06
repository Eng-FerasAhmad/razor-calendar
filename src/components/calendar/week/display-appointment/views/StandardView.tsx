import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
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
}

export default function StandardView({
    start,
    end,
    title,
    color,
}: Props): ReactElement {
    const { onDialogAppointmentDetails } = useCalendarContext();

    const dialogHandler = (event: React.MouseEvent<HTMLElement>): void => {
        onDialogAppointmentDetails({
            open: true,
            id: 'id',
            anchorEl: event.currentTarget, // Pass the clicked element as anchorEl
        });
    };

    return (
        <StandardViewContainer
            color={color}
            data-testid="standard-view-container"
            onClick={dialogHandler}
        >
            <ShortTimerViewWrapper>
                {start} - {end}
            </ShortTimerViewWrapper>
            <ShortLabelViewWrapper>{title}</ShortLabelViewWrapper>
        </StandardViewContainer>
    );
}
