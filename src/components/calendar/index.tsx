import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import { CalendarProvider } from 'calendar/context/CalendarContext';
import CalendarLayout from 'calendar/layout/CalendarLayout';
import { shouldForwardProp } from 'utils/common';

export function CalendarIndex(): ReactElement {
    const events = [
        {
            id: '1',
            title: 'Meeting',
            start: '2024-12-04T09:00',
            end: '2024-12-04T10:00',
        },
        {
            id: '2',
            title: 'Lunch',
            start: '2024-12-04T12:00',
            end: '2024-12-04T13:00',
        },
    ];
    const handleViewChange = (view: string): void => {
        console.log('View changed to:', view);
    };

    const handleDateChange = (date: DateTime): void => {
        console.log('Date changed to:', date.toISO());
    };

    return (
        <CalendarProvider
            events={events}
            selectedDate={DateTime.now()}
            view={'week'}
            onDateChange={handleDateChange}
            onViewChange={handleViewChange}
        >
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <CalendarLayout />
            </StyleSheetManager>
        </CalendarProvider>
    );
}
