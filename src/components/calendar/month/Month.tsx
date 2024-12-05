import { DateTime } from 'luxon';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/types';
import { setView, setDate } from 'src/store/ui/uiSlice';
import {
    getDateRange,
    getLocalizedWeekdays,
    getLocalizedMonths,
} from 'utils/dates';

const Month: React.FC = () => {
    const dispatch = useDispatch();
    const { date: selectedDate, language } = useSelector(
        (state: RootState) => state.ui
    );
    const events = useSelector((state: RootState) => state.events.events);

    // Localized weekdays and months
    const localizedWeekdays = getLocalizedWeekdays(language, 1); // Monday as the default first day
    const localizedMonths = getLocalizedMonths(language);

    const startOfMonth = selectedDate.startOf('month');
    const endOfMonth = selectedDate.endOf('month');

    const days = getDateRange(
        startOfMonth.startOf('week'),
        endOfMonth.endOf('week')
    );
    const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, i) =>
        days.slice(i * 7, i * 7 + 7)
    );

    const currentDay = DateTime.now();

    // Helper to get events for a specific day
    const getEventsForDay = (day: DateTime) => {
        return events.filter((event) =>
            DateTime.fromISO(event.start).hasSame(day, 'day')
        );
    };

    // Handle navigation to the week view
    const handleWeekClick = (weekStart: DateTime) => {
        dispatch(setDate(weekStart));
        dispatch(setView('week'));
    };

    return (
        <div style={{ padding: '10px' }}>
            {/* Month Header */}
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                <h3>
                    {localizedMonths[selectedDate.month - 1]}{' '}
                    {selectedDate.year}
                </h3>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    {localizedWeekdays.map((day, index) => (
                        <div
                            key={index}
                            style={{
                                flex: 1,
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Month Grid */}
            {weeks.map((week, weekIndex) => (
                <div
                    key={weekIndex}
                    style={{ display: 'flex', marginBottom: '5px' }}
                >
                    {/* Week Number */}
                    <div
                        onClick={() => handleWeekClick(week[0])} // Navigate to the week view
                        style={{
                            width: '40px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#f9f9f9',
                            borderRight: '1px solid #ccc',
                            lineHeight: '30px',
                            cursor: 'pointer',
                        }}
                        title={`Go to week ${week[0].weekNumber}`}
                    >
                        W{week[0].weekNumber}
                    </div>

                    {/* Days in the Week */}
                    {week.map((day) => {
                        const dailyEvents = getEventsForDay(day);
                        const isToday = day.hasSame(currentDay, 'day');

                        return (
                            <div
                                key={day.toISO()}
                                style={{
                                    flex: 1,
                                    minHeight: '100px',
                                    padding: '5px',
                                    border: '1px solid #ccc',
                                    backgroundColor: isToday
                                        ? '#d4edda'
                                        : '#ffffff',
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        marginBottom: '5px',
                                    }}
                                >
                                    {day.day}
                                </span>
                                {/* Display events */}
                                {dailyEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            padding: '2px',
                                            borderRadius: '4px',
                                            fontSize: '10px',
                                            marginTop: '2px',
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
    );
};

export default Month;
