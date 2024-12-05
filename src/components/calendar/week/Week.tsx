import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/types';
import { setDate, setView } from 'src/store/ui/uiSlice';
import { getDateRange, getLocalizedWeekdays, formatDate } from 'utils/dates';

interface WeekProps {
    startWorkHour: number; // Start of working hours (0-23)
    endWorkHour: number; // End of working hours (0-23)
}

const Week: React.FC<WeekProps> = ({ startWorkHour, endWorkHour }) => {
    const dispatch = useDispatch();
    const { date: selectedDate, language } = useSelector(
        (state: RootState) => state.ui
    );
    const events = useSelector((state: RootState) => state.events.events);

    // Interval options and state
    const intervalOptions = [60, 30, 15, 10, 5]; // Available intervals in minutes
    const [intervalIndex, setIntervalIndex] = useState(0); // Default interval: 60 minutes
    const [is24HourFormat, setIs24HourFormat] = useState(true);

    const interval = intervalOptions[intervalIndex]; // Current interval

    // Generate localized weekday names
    const localizedWeekdays = getLocalizedWeekdays(language, 1); // Start from Monday by default

    // Generate time slots based on interval
    const generateTimeSlots = () => {
        const slots: { hour: number; minute: number; label: string }[] = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const time = DateTime.fromObject({ hour, minute });
                slots.push({
                    hour,
                    minute,
                    label: is24HourFormat
                        ? time.toFormat('HH:mm')
                        : time.toFormat('hh:mm a'),
                });
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();
    const days = getDateRange(
        selectedDate.startOf('week'),
        selectedDate.endOf('week')
    );

    // Calculate event height and position based on time and interval
    const calculateEventStyle = (start: DateTime, end: DateTime) => {
        const totalMinutes = end.diff(start, 'minutes').minutes;
        const slotHeight = Math.max(30, 60 / (60 / interval)); // Ensure minimum height
        const height = (totalMinutes / interval) * slotHeight; // Scale by interval
        const offsetMinutes = start.diff(
            start.startOf('day'),
            'minutes'
        ).minutes;
        const top = (offsetMinutes / interval) * slotHeight;

        return {
            top: `${top}px`,
            height: `${height}px`,
            position: 'absolute',
            left: '5px',
            right: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '2px 5px',
            borderRadius: '4px',
            fontSize: '10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };
    };

    // Navigate to the day view
    const handleDayClick = (day: DateTime) => {
        dispatch(setDate(day));
        dispatch(setView('day'));
    };

    return (
        <div>
            {/* Week Header */}
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Week {selectedDate.startOf('week').weekNumber} -{' '}
                {formatDate(selectedDate.startOf('week'), 'MMMM yyyy')}
            </h3>

            <button
                type="button"
                onClick={() => setIs24HourFormat((prev) => !prev)}
                style={{
                    padding: '5px 10px',
                    fontSize: '12px',
                    marginBottom: '10px',
                }}
            >
                {is24HourFormat ? 'Switch to 12h' : 'Switch to 24h'}
            </button>

            <div style={{ display: 'flex' }}>
                {/* Time Column */}
                <div style={{ width: '120px', borderRight: '1px solid #ccc' }}>
                    {/* Time Column Controls */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '5px',
                            borderBottom: '1px solid #ddd',
                        }}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setIntervalIndex((prev) =>
                                    Math.min(
                                        intervalOptions.length - 1,
                                        prev + 1
                                    )
                                )
                            }
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                        >
                            -
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setIntervalIndex((prev) =>
                                    Math.max(0, prev - 1)
                                )
                            }
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                        >
                            +
                        </button>
                    </div>

                    {/* Time Slots */}
                    {timeSlots.map(({ hour, minute, label }) => (
                        <div
                            key={`${hour}:${minute}`}
                            style={{
                                minHeight: '30px',
                                height: `${Math.max(30, 60 / (60 / interval))}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                    hour >= startWorkHour && hour < endWorkHour
                                        ? '#ffffff' // Working hours: White
                                        : '#f0f0f0', // Non-working hours: Gray
                                borderBottom: '1px solid #ddd',
                            }}
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* Days Columns */}
                {days.map((day, index) => (
                    <div
                        key={day.toISO()}
                        style={{
                            flex: 1,
                            borderLeft: '1px solid #ccc',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                        }}
                    >
                        {/* Header for each day */}
                        <div
                            onClick={() => handleDayClick(day)}
                            style={{
                                height: '30px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                backgroundColor: '#f9f9f9',
                                borderBottom: '1px solid #ddd',
                                lineHeight: '30px',
                                cursor: 'pointer',
                            }}
                            title={`Go to ${formatDate(day, 'EEEE, MMM d')}`}
                        >
                            {localizedWeekdays[index]}
                        </div>

                        {/* Hours for each day */}
                        {timeSlots.map(({ hour, minute }) => (
                            <div
                                key={`${day.toISO()}-${hour}:${minute}`}
                                style={{
                                    minHeight: '30px',
                                    height: `${Math.max(30, 60 / (60 / interval))}px`,
                                    position: 'relative',
                                    backgroundColor:
                                        hour >= startWorkHour &&
                                        hour < endWorkHour
                                            ? '#ffffff' // Working hours: White
                                            : '#f0f0f0', // Non-working hours: Gray
                                    borderBottom: '1px solid #ddd',
                                }}
                            />
                        ))}

                        {/* Display events */}
                        {events.map((event) => {
                            const eventStart = DateTime.fromISO(event.start);
                            const eventEnd = DateTime.fromISO(event.end);

                            if (!eventStart.hasSame(day, 'day')) return null;

                            return (
                                <div
                                    key={event.id}
                                    style={calculateEventStyle(
                                        eventStart,
                                        eventEnd
                                    )}
                                >
                                    {event.title}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Week;
