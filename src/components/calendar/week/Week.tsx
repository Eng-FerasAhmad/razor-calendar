import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';
import { WeekContainer, WeekHeaderRow, WeekDayHeader } from './styles';
import { useCalendarContext } from 'calendar/context/CalendarContext';
import DayColumn from 'components/calendar/week/days-columns/DaysColumns';
import TimeColumn from 'components/calendar/week/time-column/TimeColumn';
import WeekHeader from 'components/calendar/week/week-header/WeekHeader';
import { getDateRange, formatDate } from 'utils/dates';

interface Props {
    startWorkHour: number;
    endWorkHour: number;
}

export default function Week({
    startWorkHour,
    endWorkHour,
}: Props): ReactElement {
    const { selectedDate, events, onDateChange, onViewChange } =
        useCalendarContext();

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

    // Navigate to Day View
    const navigateToDay = (day: DateTime): void => {
        onDateChange(day); // Pass DateTime object directly
        onViewChange('day'); // Change view to 'day'
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
}
