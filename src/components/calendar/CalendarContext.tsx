import { DateTime } from 'luxon';
import {
    createContext,
    ReactElement,
    useState,
    useCallback,
    ReactNode,
    useContext,
} from 'react';
import { CalendarContextProps } from 'calendar/types';
import { Appointment } from 'types/calendar';

interface Props {
    children: ReactNode;
}

export const CalendarContext = createContext<CalendarContextProps>({
    view: 'week',
    appointments: [],
    language: 'en',
    firstDayOfWeek: 1,
    selectedDate: DateTime.now(),
    onViewChange: () => {},
    onDateChange: () => {},
    onChangeLanguage: () => {},
    onChangeAppointments: () => {},
    onChangeFirstDay: () => {},
});

export function CalendarProvider({ children }: Props): ReactElement {
    const [view, setView] = useState<string>('week');
    const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());
    const [language, setLanguage] = useState<string>('en');
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(1);

    const onViewChange = useCallback((newView: string) => {
        setView(newView);
    }, []);

    const onDateChange = useCallback((newDate: DateTime) => {
        setSelectedDate(newDate);
    }, []);

    const onChangeLanguage = useCallback((newLanguage: string) => {
        setLanguage(newLanguage);
    }, []);

    const onChangeAppointments = useCallback((newEvents: Appointment[]) => {
        setAppointments(newEvents);
    }, []);

    const onChangeFirstDay = useCallback((firstDay: number) => {
        setFirstDayOfWeek(firstDay);
    }, []);

    return (
        <CalendarContext.Provider
            value={{
                view,
                selectedDate,
                language,
                appointments,
                firstDayOfWeek,
                onViewChange,
                onDateChange,
                onChangeLanguage,
                onChangeAppointments,
                onChangeFirstDay,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendarContext(): CalendarContextProps {
    return useContext(CalendarContext);
}
