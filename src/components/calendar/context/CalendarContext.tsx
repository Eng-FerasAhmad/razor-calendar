import { DateTime } from 'luxon';
import {
    createContext,
    PropsWithChildren,
    ReactElement,
    useContext,
    useMemo,
} from 'react';
import { CalendarContextProps } from 'calendar/context/types';

export const CalendarContext = createContext<CalendarContextProps>({
    view: 'week',
    events: [],
    language: 'en',
    firstDayOfWeek: 1,
    selectedDate: DateTime.now(),
    onViewChange: () => {},
    onDateChange: () => {},
    onChangeLanguage: () => {},
});

export function CalendarProvider({
    view,
    selectedDate,
    language,
    events,
    firstDayOfWeek,
    onViewChange,
    onDateChange,
    onChangeLanguage,
    children,
}: PropsWithChildren<CalendarContextProps>): ReactElement {
    const contextValue = useMemo(
        () => ({
            view,
            selectedDate,
            language,
            events,
            firstDayOfWeek,
            onViewChange,
            onDateChange,
            onChangeLanguage,
        }),
        [
            view,
            selectedDate,
            language,
            events,
            firstDayOfWeek,
            onViewChange,
            onDateChange,
            onChangeLanguage,
        ]
    );

    return (
        <CalendarContext.Provider value={contextValue}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendarContext(): CalendarContextProps {
    return useContext(CalendarContext);
}
