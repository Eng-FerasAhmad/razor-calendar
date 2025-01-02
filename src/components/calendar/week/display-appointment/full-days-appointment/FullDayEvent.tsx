import { ReactElement } from 'react';
import { FullDaysEventHeaderWrapper, FullDayTitleWrapper } from './styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    appointment: Appointment;
    width: number;
    left: number;
}

export default function FullDayEvent({
    appointment,
    width,
    left,
}: Props): ReactElement | null {
    const { config } = useCalendarContext();

    return (
        <FullDaysEventHeaderWrapper
            key={`${appointment.id}-end`}
            style={{
                width: `calc(${width}% - 1px)`,
                left: `${left}%`,
                position: 'absolute',
            }}
        >
            <FullDayTitleWrapper
                color={config.style.primaryColor}
                style={{
                    width: '100%',
                }}
            >
                {appointment.title}
            </FullDayTitleWrapper>
        </FullDaysEventHeaderWrapper>
    );
}
