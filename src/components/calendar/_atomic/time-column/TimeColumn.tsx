import { ReactElement } from 'react';
import {
    TimeColumnContainer,
    TimeLabelTextWrapper,
    TimeLabelWrapper,
} from 'calendar/_atomic/time-column/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { isWorkTime } from 'utils/dateTime';

interface Props {
    interval: number;
}

export default function TimeColumn({ interval }: Props): ReactElement {
    const { config } = useCalendarContext();

    const generateTimeSlots = (): {
        hour: number;
        minute: number;
        label: string;
    }[] => {
        const slots: { hour: number; minute: number; label: string }[] = [];

        for (let hour = 0; hour < 24; hour += 1) {
            for (let minute = 0; minute < 60; minute += interval) {
                const label = config.hour.is24HourFormat
                    ? `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
                    : `${String(hour % 12 || 12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${
                          hour < 12 ? 'AM' : 'PM'
                      }`;
                slots.push({ hour, minute, label });
            }
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <TimeColumnContainer data-testid="time-column-container">
            {timeSlots.map(({ hour, minute, label }) => (
                <TimeLabelWrapper
                    data-testid="time-label-wrapper"
                    key={`${hour}:${minute}`}
                    workTime={isWorkTime(
                        hour,
                        config.hour.workHoursStart,
                        config.hour.workHoursEnd
                    )}
                    intervalIndex={config.hour.hourIntervalIndex}
                >
                    {hour !== 0 && minute === 0 && (
                        <TimeLabelTextWrapper>{label}</TimeLabelTextWrapper>
                    )}
                </TimeLabelWrapper>
            ))}
        </TimeColumnContainer>
    );
}
