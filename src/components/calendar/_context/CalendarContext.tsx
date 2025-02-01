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
    DialogAppointment,
    PopperAppointment,
} from 'calendar/_context/types';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { TeamModel } from 'types/teamModel';

interface Props {
    currentView: ViewType;
    children: ReactNode;
    config: RazorCalendarConfig<CalendarConfig>;
    teamModel: TeamModel | undefined;
    incomingAppointments: Appointment[] | [];
    onExternalViewChange: (view: ViewType) => void;
    onExternalChangeDate: (date: DateTime) => void;
    onExternalSaveAppointment: (appointment: Appointment) => void;
    onExternalDeleteAppointment: (appointment: Appointment) => void;
}

export const CalendarContext = createContext<CalendarContextProps>({
    view: 'week',
    config: basicConfig,
    teamModel: undefined,
    appointments: [],
    savedAppointment: undefined,
    language: 'en',
    selectedDate: DateTime.now(),
    showAllFullDays: false,
    fullDaysCount: 0,
    dialogAppointment: undefined,
    onDialogAppointment: () => {},
    popperAppointment: undefined,
    onPopperAppointment: () => {},
    onUpdateFullDaysCount: () => {},
    onShowAllFullDays: () => {},
    onViewChange: () => {},
    onDateChange: () => {},
    onChangeLanguage: () => {},
    onChangeAppointments: () => {},
    onSaveAppointment: () => {},
    onDeleteAppointment: () => {},
});

export function CalendarProvider({
    currentView,
    children,
    config,
    teamModel,
    incomingAppointments,
    onExternalViewChange,
    onExternalChangeDate,
    onExternalSaveAppointment,
}: Props): ReactElement {
    const mergedConfig = mergeConfig(basicConfig, config);

    const [view, setView] = useState<ViewType>(currentView);
    const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());
    const [language, setLanguage] = useState<string>(
        mergedConfig.common.locale
    );
    const [appointments, setAppointments] =
        useState<Appointment[]>(incomingAppointments);
    const [savedAppointment, setSavedAppointment] = useState<
        Appointment | undefined
    >();
    const [showAllFullDays, setShowAllFullDays] = useState<boolean>(false);
    const [fullDaysCount, setFullDaysCount] = useState<number>(0);
    const [dialogAppointment, setDialogAppointment] = useState<
        DialogAppointment | undefined
    >(undefined);
    const [popperAppointment, setPopperAppointment] = useState<
        PopperAppointment | undefined
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

    const onSaveAppointment = useCallback(
        (newEvents: Appointment | undefined) => {
            setSavedAppointment(newEvents);
            if (newEvents) onExternalSaveAppointment(newEvents);
        },
        [onExternalSaveAppointment]
    );

    const onDeleteAppointment = useCallback(
        (newEvents: Appointment) => {
            onExternalSaveAppointment(newEvents);
        },
        [onExternalSaveAppointment]
    );

    const onShowAllFullDays = useCallback(() => {
        setShowAllFullDays((prev) => !prev);
    }, []);

    const onUpdateFullDaysCount = useCallback((count: number) => {
        setFullDaysCount(count);
    }, []);

    const onDialogAppointment = useCallback(
        (appointment: DialogAppointment | undefined) => {
            setDialogAppointment(appointment);
        },
        []
    );

    const onPopperAppointment = useCallback(
        (appointment: PopperAppointment | undefined) => {
            setPopperAppointment(appointment);
        },
        []
    );

    return (
        <CalendarContext.Provider
            value={{
                view,
                config: mergedConfig,
                teamModel,
                selectedDate,
                language,
                appointments,
                savedAppointment,
                showAllFullDays,
                fullDaysCount,
                dialogAppointment,
                onDialogAppointment,
                popperAppointment,
                onPopperAppointment,
                onShowAllFullDays,
                onUpdateFullDaysCount,
                onViewChange,
                onDateChange,
                onChangeLanguage,
                onChangeAppointments,
                onSaveAppointment,
                onDeleteAppointment,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendarContext(): CalendarContextProps {
    return useContext(CalendarContext);
}
