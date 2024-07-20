import { ReactElement } from 'react';
import { IoCalendarSharp } from 'react-icons/io5';
import { CalendarContainer } from 'components/cal-header/calendar/styles';

export default function Calendar(): ReactElement {
    return (
        <CalendarContainer>
            <IoCalendarSharp size={18} />
        </CalendarContainer>
    );
}
