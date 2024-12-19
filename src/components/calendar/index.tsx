import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import { CalendarProvider } from 'calendar/context/CalendarContext';
import CalendarLayout from 'calendar/layout/CalendarLayout';
import { Event, ViewType } from 'types/calendar';
import { shouldForwardProp } from 'utils/common';

export interface Props {
    events: Event[];
    view: ViewType;
    selectedDate: DateTime;
    language: string;
}

export function RazorCalendar({
    events,
    view,
    selectedDate,
    language,
}: Props): ReactElement {
    return (
        <CalendarProvider>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <CalendarLayout
                    view={view}
                    language={language}
                    selectedDate={selectedDate}
                    events={events}
                />
            </StyleSheetManager>
        </CalendarProvider>
    );
}
