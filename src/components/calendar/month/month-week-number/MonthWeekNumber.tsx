import { DateTime } from 'luxon';
import React from 'react';
import { useCalendarContext } from 'calendar/context/CalendarContext';

interface WeekNumberProps {
    weekStart: DateTime;
}

const WeekNumber: React.FC<WeekNumberProps> = ({ weekStart }) => {
    const { onViewChange, onDateChange } = useCalendarContext();

    const handleWeekClick = (): void => {
        onDateChange(weekStart);
        onViewChange('week');
    };

    return (
        <div
            onClick={handleWeekClick}
            style={{
                width: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                backgroundColor: '#f9f9f9',
                borderRight: '1px solid #ccc',
                lineHeight: '30px',
                cursor: 'pointer',
            }}
            title={`Go to week ${weekStart.weekNumber}`}
        >
            W{weekStart.weekNumber}
        </div>
    );
};

export default WeekNumber;
