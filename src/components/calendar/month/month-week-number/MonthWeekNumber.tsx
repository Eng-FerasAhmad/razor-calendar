import { DateTime } from 'luxon';
import React from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { MonthWeekNumberContainer } from 'month/month-week-number/styles';

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
        <MonthWeekNumberContainer
            data-testid="month-week-number"
            onClick={handleWeekClick}
            title={`Go to week ${weekStart.weekNumber}`}
        >
            W{weekStart.weekNumber}
        </MonthWeekNumberContainer>
    );
};

export default WeekNumber;
