import { ReactElement } from 'react';
import { Appointment } from 'types/appointment';
import {
    FullDaysCellContainer,
    FullDayTitleWrapper,
} from 'week/display-appointment/full-days-appointment/full-days-cell/styles';

interface Props {
    appointment: Appointment;
    dayWidth: number;
    visibleStartIndex: number;
    visibleEndIndex: number;
}

export default function FullDaysCell({
    appointment,
    dayWidth,
    visibleStartIndex,
    visibleEndIndex,
}: Props): ReactElement {
    const width = dayWidth * (visibleEndIndex - visibleStartIndex + 1);
    const left = dayWidth * visibleStartIndex;

    return (
        <FullDaysCellContainer
            style={{
                width: `calc(${width}% - 2px)`,
                left: `${left}%`,
                position: 'absolute',
            }}
        >
            <FullDayTitleWrapper color={appointment.color || ''}>
                {appointment.title}
            </FullDayTitleWrapper>
        </FullDaysCellContainer>
    );
}
