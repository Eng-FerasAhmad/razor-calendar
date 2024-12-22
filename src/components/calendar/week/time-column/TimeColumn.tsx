import { ReactElement } from 'react';
import { isWorkTime } from 'utils/dateTime';
import {
    TimeColumnContainer,
    TimeLabelTextWrapper,
    TimeLabelWrapper,
} from 'week/time-column/styles';

export interface Props {
    interval: number; // Interval in minutes (e.g., 60, 30, 15)
    is24HourFormat: boolean; // Whether to use 24-hour format
    startWorkHour: number; // Start of working hours (0–23)
    endWorkHour: number; // End of working hours (0–23)
    intervalIndex: number; // Index of the interval
}

export default function TimeColumn({
    interval,
    is24HourFormat,
    startWorkHour,
    endWorkHour,
    intervalIndex,
}: Props): ReactElement {
    const generateTimeSlots = (): {
        hour: number;
        minute: number;
        label: string;
    }[] => {
        const slots: { hour: number; minute: number; label: string }[] = [];

        for (let hour = 0; hour < 24; hour += 1) {
            for (let minute = 0; minute < 60; minute += interval) {
                const label = is24HourFormat
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
        <TimeColumnContainer>
            {timeSlots.map(({ hour, minute, label }) => (
                <TimeLabelWrapper
                    key={`${hour}:${minute}`}
                    workTime={isWorkTime(hour, startWorkHour, endWorkHour)}
                    intervalIndex={intervalIndex}
                >
                    {hour !== 0 && minute === 0 && (
                        <TimeLabelTextWrapper>{label}</TimeLabelTextWrapper>
                    )}
                </TimeLabelWrapper>
            ))}
        </TimeColumnContainer>
    );
}
