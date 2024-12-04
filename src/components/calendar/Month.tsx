import { DateTime } from 'luxon';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/types';
import { getDateRange, formatDate } from 'utils/dates';

const Month: React.FC = () => {
    const selectedDate = useSelector((state: RootState) => state.ui.date);
    const events = useSelector((state: RootState) => state.events.events);

    const today = DateTime.now();
    const startOfMonth = selectedDate.startOf('month');
    const endOfMonth = selectedDate.endOf('month');
    const startOfCalendar = startOfMonth.startOf('week');
    const endOfCalendar = endOfMonth.endOf('week');
    const allDays = getDateRange(startOfCalendar, endOfCalendar);

    // Group days into weeks
    const weeks: {
        weekNumber: number;
        startDate: DateTime;
        days: DateTime[];
    }[] = [];
    let currentWeek: DateTime[] = [];
    let currentWeekNumber = allDays[0].weekNumber;

    for (const day of allDays) {
        if (day.weekNumber !== currentWeekNumber) {
            weeks.push({
                weekNumber: currentWeekNumber,
                startDate: currentWeek[0],
                days: currentWeek,
            });
            currentWeek = [];
            currentWeekNumber = day.weekNumber;
        }
        currentWeek.push(day);
    }
    if (currentWeek.length) {
        weeks.push({
            weekNumber: currentWeekNumber,
            startDate: currentWeek[0],
            days: currentWeek,
        });
    }

    return (
        <div>
            {/* Month Header */}
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                {formatDate(startOfMonth, 'MMMM yyyy')}
            </h3>

            {/* Render weeks */}
            <div>
                {weeks.map(({ weekNumber, days }) => {
                    // Check if the week is the current week
                    const isCurrentWeek = days.some((day) =>
                        day.hasSame(today, 'week')
                    );

                    return (
                        <div
                            key={`week-${weekNumber}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px',
                                backgroundColor: isCurrentWeek
                                    ? '#f5f5ff'
                                    : 'transparent',
                                borderRadius: '5px',
                                padding: '5px 0',
                            }}
                        >
                            {/* Week Number Column */}
                            <div
                                style={{
                                    width: '50px',
                                    textAlign: 'center',
                                    padding: '10px 5px',
                                    backgroundColor: '#f0f0f0',
                                    border: '1px solid #ccc',
                                    fontWeight: 'bold',
                                }}
                            >
                                W{weekNumber}
                            </div>

                            {/* Days in the Week */}
                            <div style={{ display: 'flex', flex: 1 }}>
                                {days.map((day) => {
                                    const isToday = day.hasSame(today, 'day');

                                    // Filter events for the current day
                                    const dailyEvents = events.filter(
                                        (event) => {
                                            const eventStart = DateTime.fromISO(
                                                event.start
                                            );
                                            const eventEnd = DateTime.fromISO(
                                                event.end
                                            );
                                            return (
                                                eventStart.hasSame(
                                                    day,
                                                    'day'
                                                ) ||
                                                eventEnd.hasSame(day, 'day')
                                            );
                                        }
                                    );

                                    return (
                                        <div
                                            key={day.toISO()}
                                            style={{
                                                flex: 1,
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                minHeight: '80px',
                                                position: 'relative',
                                                backgroundColor: isToday
                                                    ? '#e6ffe6'
                                                    : 'transparent',
                                                borderRadius: isToday
                                                    ? '5px'
                                                    : '0',
                                            }}
                                        >
                                            {/* Day number */}
                                            <strong
                                                style={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    left: '5px',
                                                    fontSize: '12px',
                                                    color:
                                                        day.month ===
                                                        selectedDate.month
                                                            ? '#000'
                                                            : '#aaa',
                                                }}
                                            >
                                                {day.toFormat('d')}
                                            </strong>

                                            {/* Events */}
                                            {dailyEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    style={{
                                                        marginTop: '15px',
                                                        backgroundColor:
                                                            '#007bff',
                                                        color: '#fff',
                                                        borderRadius: '4px',
                                                        padding: '2px 5px',
                                                        fontSize: '10px',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                    }}
                                                >
                                                    {event.title}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Month;
