import React from 'react';

export interface TimeColumnProps {
    interval: number; // Interval in minutes (e.g., 60, 30, 15)
    is24HourFormat: boolean; // Whether to use 24-hour format
    onIntervalChange: (newInterval: number) => void; // Callback for changing the interval
    startWorkHour: number; // Start of working hours (0–23)
    endWorkHour: number; // End of working hours (0–23)
}

const TimeColumn: React.FC<TimeColumnProps> = ({
    interval,
    is24HourFormat,
    onIntervalChange,
    startWorkHour,
    endWorkHour,
}) => {
    // Generate time slots
    const generateTimeSlots = () => {
        const slots: { hour: number; minute: number; label: string }[] = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const timeLabel = is24HourFormat
                    ? `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
                    : `${(hour % 12 || 12).toString()}:${String(minute).padStart(2, '0')} ${
                          hour < 12 ? 'AM' : 'PM'
                      }`;
                slots.push({ hour, minute, label: timeLabel });
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <div style={{ width: '100px', borderRight: '1px solid #ccc' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px',
                }}
            >
                {/* Interval Adjustment Buttons */}
                <button
                    onClick={() => onIntervalChange(interval - 15)}
                    disabled={interval <= 15}
                    style={{ padding: '2px 5px' }}
                >
                    -
                </button>
                <button
                    onClick={() => onIntervalChange(interval + 15)}
                    disabled={interval >= 60}
                    style={{ padding: '2px 5px' }}
                >
                    +
                </button>
            </div>
            {timeSlots.map(({ hour, minute, label }) => (
                <div
                    key={`${hour}:${minute}`}
                    style={{
                        height: `${60 / (60 / interval)}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:
                            hour >= startWorkHour && hour < endWorkHour
                                ? '#fff' // Working hours
                                : '#f0f0f0', // Non-working hours
                        borderBottom: '1px solid #ddd',
                    }}
                >
                    {label}
                </div>
            ))}
        </div>
    );
};

export default TimeColumn;
