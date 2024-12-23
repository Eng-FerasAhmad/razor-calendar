import { DateTime } from 'luxon';
import React from 'react';
import { useCalendarContext } from 'calendar/CalendarContext';

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
            data-testid="month-week-number"
            onClick={handleWeekClick}
            style={{
                width: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                backgroundColor: '#fff',
                lineHeight: '30px',
                cursor: 'pointer',
                fontSize: '12px',
            }}
            title={`Go to week ${weekStart.weekNumber}`}
        >
            W{weekStart.weekNumber}
        </div>
    );
};

export default WeekNumber;
