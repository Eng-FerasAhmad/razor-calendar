import { ReactElement } from 'react';
import {
    FullDaysCellContainer,
    FullDayTitleWrapper,
} from 'calendar/_atomic/display-appointment/full-days-appointment/full-days-cell/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    appointment: Appointment;
    dayWidth: number;
    visibleStartIndex: number;
    visibleEndIndex: number;
    userId: string;
}

export default function FullDaysCell({
    appointment,
    dayWidth,
    visibleStartIndex,
    visibleEndIndex,
    userId,
}: Props): ReactElement {
    const { onPopperAppointment, view } = useCalendarContext();
    const width = dayWidth * (visibleEndIndex - visibleStartIndex + 1);
    const left = dayWidth * visibleStartIndex;

    const popperHandler = (event: React.MouseEvent<HTMLElement>): void => {
        onPopperAppointment({
            open: true,
            id: 'id',
            anchorEl: event.currentTarget,
            appointment,
        });
    };

    const getColor = (): string | undefined => {
        const assignedUser = appointment.assign?.find(
            (user) => user.id === userId
        );
        return assignedUser?.color;
    };

    return (
        <FullDaysCellContainer
            width={width}
            fullWidth={view === 'team' || view === 'day'}
            left={left}
            onClick={popperHandler}
        >
            <FullDayTitleWrapper color={getColor() || ''}>
                {appointment.title}
            </FullDayTitleWrapper>
        </FullDaysCellContainer>
    );
}
