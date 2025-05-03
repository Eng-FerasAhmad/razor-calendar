import { DateTime } from 'luxon';
import {
    createContext,
    ReactElement,
    useState,
    useCallback,
    ReactNode,
    useContext,
    useMemo,
    useEffect,
} from 'react';
import { basicConfig } from 'calendar/_config/basicConfig';
import { mergeConfig } from 'calendar/_config/utils';
import {
    AddServiceDialog,
    CalendarContextProps,
    DialogAppointment,
    PopperAppointment,
} from 'calendar/_context/types';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { ServiceViewModel } from 'types/serviceModel';
import { TeamModel } from 'types/teamModel';

interface Props {
    currentView: ViewType;
    children: ReactNode;
    config: RazorCalendarConfig<CalendarConfig>;
    teamModel: TeamModel | undefined;
    services: ServiceViewModel[];
    selectedDate: DateTime;
    incomingAppointments: Appointment[] | [];

    onExternalViewChange: (view: ViewType) => void;
    onExternalChangeDate: (date: DateTime) => void;
    onExternalChangeAppointment: (appointment: Appointment[]) => void;
    onExternalSaveAppointment: (appointment: Appointment) => void;
    onExternalDeleteAppointment: (appointment: Appointment) => void;
    onUpdateTeamModel: (updatedTeamModel: TeamModel) => void;
}

export const CalendarContext = createContext<CalendarContextProps>({
    view: 'day',
    config: basicConfig,
    teamModel: undefined,
    services: [],
    appointments: [],
    language: 'en',
    showAllFullDays: false,
    fullDaysCount: 0,
    selectedDate: DateTime.now(),
    dialogAppointment: undefined,
    addServiceDialog: undefined,
    popperAppointment: undefined,
    dialogStaffers: false,
    onDialogStaffers: () => {},
    onDialogAppointment: () => {},
    onAddServiceDialog: () => {},
    onPopperAppointment: () => {},
    onUpdateFullDaysCount: () => {},
    onShowAllFullDays: () => {},
    onViewChange: () => {},
    onDateChange: () => {},
    onChangeLanguage: () => {},
    onChangeAppointments: () => {},
    onSaveAppointment: () => {},
    onDeleteAppointment: () => {},
    onUpdateTeamModel: () => {},
});

export function CalendarProvider({
    currentView,
    children,
    config,
    teamModel,
    services,
    selectedDate,
    incomingAppointments,
    onExternalViewChange,
    onExternalChangeAppointment,
    onExternalChangeDate,
    onExternalSaveAppointment,
    onExternalDeleteAppointment,
}: Props): ReactElement {
    const mergedConfig = mergeConfig(basicConfig, config);
    const [view, setView] = useState<ViewType>(currentView);
    const [language, setLanguage] = useState<string>(
        mergedConfig.common.locale
    );
    const [appointments, setAppointments] =
        useState<Appointment[]>(incomingAppointments);
    const [localTeamModel, setLocalTeamModel] = useState<TeamModel | undefined>(
        teamModel
    );

    const [showAllFullDays, setShowAllFullDays] = useState<boolean>(false);
    const [fullDaysCount, setFullDaysCount] = useState<number>(0);
    const [dialogAppointment, setDialogAppointment] = useState<
        DialogAppointment | undefined
    >(undefined);
    const [addServiceDialog, setAddServiceDialog] = useState<
        AddServiceDialog | undefined
    >(undefined);
    const [popperAppointment, setPopperAppointment] = useState<
        PopperAppointment | undefined
    >(undefined);
    const [dialogStaffers, setDialogStaffers] = useState<boolean>(false);

    const onUpdateTeamModel = useCallback((updatedTeamModel: TeamModel) => {
        setLocalTeamModel(updatedTeamModel);
    }, []);

    const onDialogStaffers = useCallback((open: boolean) => {
        setDialogStaffers(open);
    }, []);

    const onViewChange = useCallback(
        (newView: ViewType) => {
            setView(newView);
            onExternalViewChange(newView);
        },
        [onExternalViewChange]
    );

    const onDateChange = useCallback(
        (newDate: DateTime) => {
            onExternalChangeDate(newDate);
        },
        [onExternalChangeDate]
    );

    const onChangeLanguage = useCallback((newLanguage: string) => {
        setLanguage(newLanguage);
    }, []);

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

    const onAddServiceDialog = useCallback(
        (appointment: AddServiceDialog | undefined) => {
            setAddServiceDialog(appointment);
        },
        [setAddServiceDialog]
    );

    const onPopperAppointment = useCallback(
        (appointment: PopperAppointment | undefined) => {
            setPopperAppointment(appointment);
        },
        []
    );

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            if (
                !appointment.teamMember ||
                appointment.teamMember.length === 0
            ) {
                return true;
            }
            return appointment.teamMember.some((member) =>
                localTeamModel?.users.some(
                    (user) => user.id === member.id && user.visible
                )
            );
        });
    }, [appointments, localTeamModel]);

    const onChangeAppointments = useCallback(
        (newAppointment: Appointment[]) => {
            onExternalChangeAppointment(newAppointment);
        },
        [onExternalChangeAppointment]
    );

    const onSaveAppointment = useCallback(
        (newAppointment: Appointment | undefined) => {
            onExternalSaveAppointment(newAppointment!);
        },
        [onExternalSaveAppointment]
    );

    const onDeleteAppointment = useCallback(
        (appointmentToDelete: Appointment) => {
            onExternalDeleteAppointment(appointmentToDelete);
            setPopperAppointment(undefined);
        },
        [onExternalDeleteAppointment]
    );

    useEffect(() => {
        setAppointments(incomingAppointments);
    }, [incomingAppointments]);

    return (
        <CalendarContext.Provider
            value={{
                view,
                config: mergedConfig,
                teamModel: localTeamModel,
                services,
                selectedDate,
                language,
                appointments: filteredAppointments,
                showAllFullDays,
                fullDaysCount,
                dialogAppointment,
                addServiceDialog,
                dialogStaffers,

                onDialogStaffers,
                onDialogAppointment,
                onAddServiceDialog,
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
                onUpdateTeamModel,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendarContext(): CalendarContextProps {
    return useContext(CalendarContext);
}
