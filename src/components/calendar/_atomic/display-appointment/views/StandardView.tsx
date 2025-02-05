import { DateTime } from 'luxon';
import { ReactElement } from 'react';
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
    const multiAssignees =
        Array.isArray(appointment.assign) && appointment.assign.length > 1;
    return (
        <StandardViewContainer
            color={color || config.style.primaryColor}
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
                    appointment.assign?.map((user) => (
                        <MultiAssigneeWrapper
                            key={user.id}
                            color={user.color}
                        ></MultiAssigneeWrapper>
                    ))}
            </AssigneeWrapper>
        </StandardViewContainer>
    );
}
