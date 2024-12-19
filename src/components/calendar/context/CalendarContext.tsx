import { DateTime } from 'luxon';
import {
    createContext,
    PropsWithChildren,
    ReactElement,
    useContext,
    useMemo,
    useState,
    useCallback,
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
    view: initialView = 'week',
    selectedDate: initialSelectedDate = DateTime.now(),
    language: initialLanguage = 'en',
    events,
    firstDayOfWeek,
    children,
}: PropsWithChildren<Partial<CalendarContextProps>>): ReactElement {
    const [view, setView] = useState<string>(initialView);
    const [selectedDate, setSelectedDate] =
        useState<DateTime>(initialSelectedDate);
    const [language, setLanguage] = useState<string>(initialLanguage);

    // Callback to update view
    const onViewChange = useCallback((newView: string) => {
        setView(newView);
    }, []);

    // add a function to handle on update the date

    // Callback to update date
    const onDateChange = useCallback((newDate: DateTime) => {
        setSelectedDate(newDate);
    }, []);

    // Callback to update language
    const onChangeLanguage = useCallback((newLanguage: string) => {
        setLanguage(newLanguage);
    }, []);

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
