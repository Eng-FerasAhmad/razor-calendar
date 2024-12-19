import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { WeekContainer, WeekHeaderRow, WeekDayHeader } from './styles';
import { useCalendarContext } from 'calendar/CalendarContext';
import DayColumn from 'components/calendar/week/days-columns/DaysColumns';
import TimeColumn from 'components/calendar/week/time-column/TimeColumn';
import { Appointment } from 'types/calendar';
import { getDateRange, formatDate } from 'utils/dates';

interface Props {
    startWorkHour: number;
    endWorkHour: number;
    appointments: Appointment[];
    selectedDate: DateTime;
    intervalIndex: number;
    is24HourFormat: boolean;
}

export default function Week({
    startWorkHour,
    endWorkHour,
    appointments,
    selectedDate,
    intervalIndex,
    is24HourFormat,
}: Props): ReactElement {
    const { onDateChange, onViewChange } = useCalendarContext();

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
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
                        appointments={appointments!}
                        interval={interval}
                        startWorkHour={startWorkHour}
                        endWorkHour={endWorkHour}
                    />
                ))}
            </div>
        </WeekContainer>
    );
}
