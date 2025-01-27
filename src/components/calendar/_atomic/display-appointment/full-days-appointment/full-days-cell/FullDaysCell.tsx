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
    const { onPopperAppointment, view, config } = useCalendarContext();
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
        if (userId) {
            const assignedUser = appointment.assign?.find(
                (user) => user.id === userId
            );

            return assignedUser?.color || config.style.primaryColor;
        }

        if (appointment.assign?.length === 1) {
            return appointment.assign[0].color;
        }

        return config.style.primaryColor;
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
