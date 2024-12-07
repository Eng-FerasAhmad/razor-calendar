import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WeekContainer, WeekHeaderRow, WeekDayHeader } from './styles';
import DayColumn from 'components/calendar/week/days-columns/DaysColumns';
import TimeColumn from 'components/calendar/week/time-column/TimeColumn';
import WeekHeader from 'components/calendar/week/week-header/WeekHeader';
import { RootState } from 'src/store/types';
import { setView, setDate } from 'src/store/ui/uiSlice';
import { getDateRange, formatDate } from 'utils/dates';

interface WeekProps {
    startWorkHour: number;
    endWorkHour: number;
}

const Week: React.FC<WeekProps> = ({ startWorkHour, endWorkHour }) => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state: RootState) => state.ui.date);
    const events = useSelector((state: RootState) => state.events.events);

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const [intervalIndex, setIntervalIndex] = useState(0);
    const [is24HourFormat, setIs24HourFormat] = useState(true);
    const interval = intervalOptions[intervalIndex];

    // Days of the week
    const days = getDateRange(
        selectedDate.startOf('week'),
        selectedDate.endOf('week')
    );

    // Handle interval change
    const handleIntervalChange = (newIndex: number) => {
        setIntervalIndex(
            Math.max(0, Math.min(intervalOptions.length - 1, newIndex))
        );
    };

    // Navigate to Day View
    const navigateToDay = (day: DateTime) => {
        dispatch(setDate(day)); // Pass DateTime object directly
        dispatch(setView('day')); // Change view to 'day'
    };

    return (
        <WeekContainer>
            {/* Week Header */}
            <WeekHeader
                selectedDate={selectedDate}
                intervalOptions={intervalOptions}
                setIntervalIndex={setIntervalIndex}
                is24HourFormat={is24HourFormat}
                setIs24HourFormat={setIs24HourFormat}
            />

            {/* Week Day Names */}
            <WeekHeaderRow>
                <div style={{ width: '100px' }} />{' '}
                {/* Empty space for TimeColumn */}
                {days.map((day) => (
                    <WeekDayHeader
                        key={day.toISO()}
                        onClick={() => navigateToDay(day)} // Click to navigate
                        style={{ cursor: 'pointer' }}
                    >
                        {formatDate(day, 'EEE, MMM d')}
                    </WeekDayHeader>
                ))}
            </WeekHeaderRow>

            {/* Week Grid */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* Time Column */}
                <TimeColumn
                    interval={interval}
                    is24HourFormat={is24HourFormat}
                    onIntervalChange={handleIntervalChange}
                    startWorkHour={startWorkHour}
                    endWorkHour={endWorkHour}
                />

                {/* Day Columns */}
                {days.map((day) => (
                    <DayColumn
                        key={day.toISO()}
                        day={day}
                        events={events}
                        interval={interval}
                        startWorkHour={startWorkHour}
                        endWorkHour={endWorkHour}
                    />
                ))}
            </div>
        </WeekContainer>
    );
};

export default Week;
