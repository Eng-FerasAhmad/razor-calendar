import { DateTime } from 'luxon';
import { MouseEvent, ReactElement } from 'react';
import {
    AssigneeWrapper,
    MultiAssigneeWrapper,
    ShortLabelViewWrapper,
    ShortTimerViewWrapper,
    StandardViewContainer,
} from 'calendar/_atomic/display-appointment/views/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import { timeConverter } from 'utils/timeFormatConverter';

interface Props {
    appointment: Appointment;
    color: string;
}

export default function StandardView({
    appointment,
    color,
}: Props): ReactElement {
    const { onPopperAppointment, config } = useCalendarContext();

    const popperHandler = (event: MouseEvent<HTMLElement>): void => {
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
    const multiAssignees =
        Array.isArray(appointment.teamMember) &&
        appointment.teamMember.length > 1;
    return (
        <StandardViewContainer
            color={color}
            data-testid="standard-view-container"
            onClick={popperHandler}
        >
            <div>
                <ShortTimerViewWrapper>
                    {start} - {end}
                </ShortTimerViewWrapper>
                <ShortLabelViewWrapper>
                    {appointment.title}
                </ShortLabelViewWrapper>
            </div>
            <AssigneeWrapper>
                {multiAssignees &&
                    appointment.teamMember?.map((user) => (
                        <MultiAssigneeWrapper
                            key={user.id}
                            color={user.color}
                        ></MultiAssigneeWrapper>
                    ))}
            </AssigneeWrapper>
        </StandardViewContainer>
    );
}
