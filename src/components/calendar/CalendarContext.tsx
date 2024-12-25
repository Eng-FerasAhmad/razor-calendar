import { DateTime } from 'luxon';
import {
    createContext,
    ReactElement,
    useState,
    useCallback,
    ReactNode,
    useContext,
} from 'react';
import { basicConfig } from 'calendar/config';
import { CalendarContextProps } from 'calendar/types';
import {
    Appointment,
    CalendarConfig,
    RazorCalendarConfig,
} from 'types/calendar';
import { mergeConfig } from 'utils/config';

interface Props {
    children: ReactNode;
    config: RazorCalendarConfig<CalendarConfig>;
}

export const CalendarContext = createContext<CalendarContextProps>({
    view: 'week',
    config: basicConfig,
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

export function CalendarProvider({ children, config }: Props): ReactElement {
    const mergedConfig = mergeConfig(basicConfig, config);

    const [view, setView] = useState<string>('week');
    const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());
    const [language, setLanguage] = useState<string>(mergedConfig.common.lang);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(
        mergedConfig.month.startWithWeekday ? 1 : 0
    );

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
                config: mergedConfig,
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
