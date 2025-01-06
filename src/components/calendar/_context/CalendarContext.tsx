import { DateTime } from 'luxon';
import {
    createContext,
    ReactElement,
    useState,
    useCallback,
    ReactNode,
    useContext,
} from 'react';
import { basicConfig } from 'calendar/_config/basicConfig';
import { mergeConfig } from 'calendar/_config/utils';
import {
    CalendarContextProps,
    DialogAppointmentDetails,
} from 'calendar/_context/types';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';

interface Props {
    children: ReactNode;
    config: RazorCalendarConfig<CalendarConfig>;
    onExternalViewChange: (view: ViewType) => void;
    onExternalChangeDate: (date: DateTime) => void;
}

export const CalendarContext = createContext<CalendarContextProps>({
    view: 'week',
    config: basicConfig,
    appointments: [],
    language: 'en',
    selectedDate: DateTime.now(),
    showAllFullDays: false,
    fullDaysCount: 0,
    dialogAppointmentDetails: undefined,
    onDialogAppointmentDetails: () => {},
    onUpdateFullDaysCount: () => {},
    onShowAllFullDays: () => {},
    onViewChange: () => {},
    onDateChange: () => {},
    onChangeLanguage: () => {},
    onChangeAppointments: () => {},
});

export function CalendarProvider({
    children,
    config,
    onExternalViewChange,
    onExternalChangeDate,
}: Props): ReactElement {
    const mergedConfig = mergeConfig(basicConfig, config);

    const [view, setView] = useState<ViewType>('week');
    const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());
    const [language, setLanguage] = useState<string>(mergedConfig.common.lang);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [showAllFullDays, setShowAllFullDays] = useState<boolean>(false);
    const [fullDaysCount, setFullDaysCount] = useState<number>(0);
    const [dialogAppointmentDetails, setDialogAppointmentDetails] = useState<
        DialogAppointmentDetails | undefined
    >(undefined);

    const onViewChange = useCallback(
        (newView: ViewType) => {
            setView(newView);
            onExternalViewChange(newView);
        },
        [onExternalViewChange]
    );

    const onDateChange = useCallback(
        (newDate: DateTime) => {
            setSelectedDate(newDate);
            onExternalChangeDate(newDate);
        },
        [onExternalChangeDate]
    );

    const onChangeLanguage = useCallback((newLanguage: string) => {
        setLanguage(newLanguage);
    }, []);

    const onChangeAppointments = useCallback((newEvents: Appointment[]) => {
        setAppointments(newEvents);
    }, []);

    const onShowAllFullDays = useCallback(() => {
        setShowAllFullDays((prev) => !prev);
    }, []);

    const onUpdateFullDaysCount = useCallback((count: number) => {
        setFullDaysCount(count);
    }, []);

    const onDialogAppointmentDetails = useCallback(
        (appointmentDetails: DialogAppointmentDetails | undefined) => {
            setDialogAppointmentDetails(appointmentDetails);
        },
        []
    );

    return (
        <CalendarContext.Provider
            value={{
                view,
                config: mergedConfig,
                selectedDate,
                language,
                appointments,
                showAllFullDays,
                fullDaysCount,
                dialogAppointmentDetails,
                onDialogAppointmentDetails,
                onShowAllFullDays,
                onUpdateFullDaysCount,
                onViewChange,
                onDateChange,
                onChangeLanguage,
                onChangeAppointments,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendarContext(): CalendarContextProps {
    return useContext(CalendarContext);
}
