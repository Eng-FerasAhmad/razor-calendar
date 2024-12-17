import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import { CalendarProvider } from 'calendar/context/CalendarContext';
import CalendarLayout from 'calendar/layout/CalendarLayout';
import { Event } from 'types/calendar';
import { shouldForwardProp } from 'utils/common';

export interface Props {
    events: Event[];
    handleViewChange: (view: string) => void;
    handleDateChange: (date: DateTime) => void;
    handleLanguageChange: (lang: string) => void;
}

export function CalendarIndex({
    events,
    handleDateChange,
    handleViewChange,
    handleLanguageChange,
}: Props): ReactElement {
    return (
        <CalendarProvider
            events={events}
            selectedDate={DateTime.now()}
            view={'week'}
            onDateChange={handleDateChange}
            onViewChange={handleViewChange}
            language={'en'}
            onChangeLanguage={handleLanguageChange}
            firstDayOfWeek={0}
        >
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <CalendarLayout />
            </StyleSheetManager>
        </CalendarProvider>
    );
}
