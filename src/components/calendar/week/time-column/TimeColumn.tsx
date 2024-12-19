import { ReactElement } from 'react';
import { isWorkTime } from 'utils/dateTime';

export interface Props {
    interval: number; // Interval in minutes (e.g., 60, 30, 15)
    is24HourFormat: boolean; // Whether to use 24-hour format
    startWorkHour: number; // Start of working hours (0–23)
    endWorkHour: number; // End of working hours (0–23)
}

export default function TimeColumn({
    interval,
    is24HourFormat,
    startWorkHour,
    endWorkHour,
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
                    : `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${
                          hour < 12 ? 'AM' : 'PM'
                      }`;
                slots.push({ hour, minute, label });
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <div style={{ width: '100px' }}>
            {/* Time Slots */}
            {timeSlots.map(({ hour, minute, label }) => (
                <div
                    key={`${hour}:${minute}`}
                    style={{
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isWorkTime(
                            hour,
                            startWorkHour,
                            endWorkHour
                        )
                            ? '#ffffff'
                            : '#f0f0f0',
                        borderBottom: '1px solid #ddd',
                    }}
                >
                    {label}
                </div>
            ))}
        </div>
    );
}
