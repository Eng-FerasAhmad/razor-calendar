import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/types';
import { getDateRange, formatDate } from 'utils/dates';

interface WeekProps {
    startWorkHour: number; // Start of working hours (0-23)
    endWorkHour: number; // End of working hours (0-23)
}

const Week: React.FC<WeekProps> = ({ startWorkHour, endWorkHour }) => {
    const selectedDate = useSelector((state: RootState) => state.ui.date);
    const events = useSelector((state: RootState) => state.events.events);

    // Interval options and state
    const intervalOptions = [60, 30, 15, 10, 5]; // Available intervals in minutes
    const [intervalIndex, setIntervalIndex] = useState(0); // Default interval: 60 minutes
    const [is24HourFormat, setIs24HourFormat] = useState(true);

    const interval = intervalOptions[intervalIndex]; // Current interval

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
                            padding: '1px',
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
                {days.map((day) => (
                    <div
                        key={day.toISO()}
                        style={{
                            flex: 1,
                            borderLeft: '1px solid #ccc',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header for each day */}
                        <div
                            style={{
                                height: '30px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                backgroundColor: '#f9f9f9',
                                borderBottom: '1px solid #ddd',
                                lineHeight: '30px',
                            }}
                        >
                            {formatDate(day, 'EEE, MMM d')}
                        </div>

                        {/* Hours for each day */}
                        {timeSlots.map(({ hour, minute }) => {
                            // Filter events for the current time slot
                            const hourEvents = events.filter((event) => {
                                const eventStart = DateTime.fromISO(
                                    event.start
                                );
                                const eventEnd = DateTime.fromISO(event.end);
                                return (
                                    eventStart.hasSame(day, 'day') &&
                                    eventStart.hour === hour &&
                                    eventStart.minute >= minute &&
                                    eventEnd.minute < minute + interval
                                );
                            });

                            return (
                                <div
                                    key={`${day.toISO()}-${hour}:${minute}`}
                                    style={{
                                        minHeight: '30px',
                                        height: `${Math.max(
                                            30,
                                            60 / (60 / interval)
                                        )}px`,
                                        position: 'relative',
                                        backgroundColor:
                                            hour >= startWorkHour &&
                                            hour < endWorkHour
                                                ? '#ffffff' // Working hours: White
                                                : '#f0f0f0', // Non-working hours: Gray
                                        borderBottom: '1px solid #ddd',
                                    }}
                                >
                                    {/* Display events */}
                                    {hourEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            style={{
                                                position: 'absolute',
                                                top: '5px',
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
                                            }}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
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
