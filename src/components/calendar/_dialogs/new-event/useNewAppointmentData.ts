import { DateTime } from 'luxon';
import { useState, useEffect, ChangeEvent } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { ReminderValue } from 'components/shared/reminder-select/types';
import { primaryColor } from 'src/theme/theme';
import { Appointment } from 'types/appointment';
import { TeamMember } from 'types/teamModel';

export interface UseNewAppointmentDataReturn {
    title: string;
    notes: string;
    fromTime: DateTime;
    toTime: DateTime;
    isFullDay: boolean;
    color: string;
    is24Hours: boolean;
    dateFormat: string;
    titleRequired: boolean;
    reminder: ReminderValue;
    teamMember: TeamMember[];

    setTitle: (title: string) => void;
    setNotes: (notes: string) => void;
    setFromTime: (time: DateTime) => void;
    setToTime: (time: DateTime) => void;
    setIsFullDay: (value: boolean) => void;
    setColor: (color: string) => void;
    setReminder: (value: ReminderValue) => void;
    setAssign: (users: TeamMember[]) => void;

    handleSave: () => void;
    handleFromTimeChange: (time: DateTime | null) => void;
    handleToTimeChange: (time: DateTime | null) => void;
    handleFromDateChange: (date: DateTime | null) => void;
    handleToDateChange: (date: DateTime | null) => void;
    handleTitleChange: (value: string) => void;
    handleNotesChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAssignChange: (list: TeamMember[]) => void;

    toTimeError: boolean;
    toDateError: boolean;
    titleError: boolean;
    isSaveDisabled: boolean;
}

export const useNewAppointmentData = (): UseNewAppointmentDataReturn => {
    const {
        config,
        dialogAppointment,
        teamModel,
        onSaveAppointment,
        onDialogAppointment,
    } = useCalendarContext();

    const is24Hours = config.hour?.is24HourFormat || false;
    const dateFormat =
        config.common?.dateFormat ||
        (config.common.locale === 'de' ? 'dd.MM.yyyy' : 'dd/MM/yyyy');

    const [fromTime, setFromTime] = useState<DateTime>(DateTime.now());
    const [toTime, setToTime] = useState<DateTime>(
        DateTime.now().plus({ minutes: 30 })
    );
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [reminder, setReminder] = useState<ReminderValue>({
        amount: 15,
        unit: 'minutes',
    });
    const [appointmentId, setAppointmentId] = useState('');
    const [isFullDay, setIsFullDay] = useState(false);
    const [color, setColor] = useState(primaryColor);
    const [teamMember, setTeamMember] = useState<TeamMember[]>([]);
    const [titleRequired, setTitleRequired] = useState(false);

    const [toTimeError, setToTimeError] = useState(false);
    const [toDateError, setToDateError] = useState(false);
    const [titleError, setTitleError] = useState(false);

    useEffect(() => {
        if (dialogAppointment?.slotId) {
            const [datePart, timePart, userId] =
                dialogAppointment.slotId.split('$') || [];
            const [year, month, day] = datePart?.split('-').map(Number) || [];
            const [hour, minute] = timePart?.split(':').map(Number) || [0, 0];

            const assignedUser = teamModel?.users.find(
                (user) => user.id === userId
            );
            setTeamMember(assignedUser ? [assignedUser] : []);

            if (year && month && day && timePart) {
                const newFromTime = DateTime.fromObject({
                    year,
                    month,
                    day,
                    hour,
                    minute,
                });
                setFromTime(newFromTime);
                setToTime(newFromTime.plus({ minutes: 30 }));
            }
        } else if (dialogAppointment?.appointment) {
            const {
                id,
                title: appointmentTitle,
                notes: appointmentNotes,
                start,
                end,
                isFullDay: appointmentIsFullDay,
                color: appointmentColor,
                teamMember: appointmentAssign,
                reminder: appointmentReminder,
            } = dialogAppointment.appointment;

            setReminder(appointmentReminder!);
            setAppointmentId(id || '');
            setTitle(appointmentTitle || '');
            setNotes(appointmentNotes || '');
            setFromTime(start ? DateTime.fromISO(start) : DateTime.now());
            setToTime(
                end
                    ? DateTime.fromISO(end)
                    : DateTime.now().plus({ minutes: 30 })
            );
            setIsFullDay(appointmentIsFullDay || false);
            setColor(appointmentColor || '#33b679');
            setTeamMember(appointmentAssign || []);
        }
    }, [dialogAppointment, teamModel?.users]);

    const handleFromTimeChange = (newTime: DateTime | null): void => {
        if (newTime) {
            setFromTime(
                fromTime.set({ hour: newTime.hour, minute: newTime.minute })
            );
            setToTimeError(toTime <= newTime);
        }
    };

    const handleToTimeChange = (newTime: DateTime | null): void => {
        if (newTime) {
            setToTime(
                toTime.set({ hour: newTime.hour, minute: newTime.minute })
            );
            setToTimeError(newTime <= fromTime);
        }
    };

    const handleFromDateChange = (newDate: DateTime | null): void => {
        if (newDate) {
            setFromTime(
                fromTime.set({
                    year: newDate.year,
                    month: newDate.month,
                    day: newDate.day,
                })
            );
            setToDateError(toTime < newDate.endOf('day'));
        }
    };

    const handleToDateChange = (newDate: DateTime | null): void => {
        if (newDate) {
            setToTime(
                toTime.set({
                    year: newDate.year,
                    month: newDate.month,
                    day: newDate.day,
                })
            );
            setToDateError(newDate.startOf('day') <= fromTime);
        }
    };

    const handleTitleChange = (value: string): void => {
        setTitle(value);
        setTitleError(!value.trim());
    };

    const handleNotesChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setNotes(event.target.value);
    };

    const handleAssignChange = (list: TeamMember[]): void => {
        setTeamMember(list);
    };

    const handleSave = (): void => {
        setTitleRequired(!title);
        if (!title) return;

        const appointment: Appointment = {
            id: appointmentId,
            title,
            start: fromTime.toISO()!,
            end: toTime.toISO()!,
            isFullDay,
            color,
            notes,
            teamMember,
            reminder,
        };

        onSaveAppointment(appointment);
        onDialogAppointment(undefined);

        setTitle('');
        setReminder({ amount: 15, unit: 'minutes' });
        setFromTime(DateTime.now());
        setToTime(DateTime.now().plus({ minutes: 30 }));
        setNotes('');
        setAppointmentId('');
        setIsFullDay(false);
        setTeamMember([]);
        setColor('#33b679');
    };

    const isSaveDisabled = toTimeError || toDateError || titleError;

    return {
        title,
        notes,
        fromTime,
        toTime,
        isFullDay,
        color,
        is24Hours,
        dateFormat,
        titleRequired,
        reminder,
        teamMember,

        setTitle,
        setNotes,
        setFromTime,
        setToTime,
        setIsFullDay,
        setColor,
        setReminder,
        setAssign: setTeamMember,

        handleSave,
        handleFromTimeChange,
        handleToTimeChange,
        handleFromDateChange,
        handleToDateChange,
        handleTitleChange,
        handleNotesChange,
        handleAssignChange,

        toTimeError,
        toDateError,
        titleError,
        isSaveDisabled,
    };
};
