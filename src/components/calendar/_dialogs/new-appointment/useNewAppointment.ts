import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { ReminderValue } from 'components/shared/reminder-select/types';
import { Appointment } from 'types/appointment';
import { TeamMember } from 'types/teamModel';

export interface UseWeekAppointmentReturn {
    title: string;
    notes: string;
    setTitle: (title: string) => void;
    setNotes: (notes: string) => void;
    fromTime: DateTime;
    setFromTime: (time: DateTime) => void;
    toTime: DateTime;
    setToTime: (time: DateTime) => void;
    isFullDay: boolean;
    setIsFullDay: (isFullDay: boolean) => void;
    color: string;
    setColor: (color: string) => void;
    assign: TeamMember[];
    setAssign: (assign: TeamMember[]) => void;
    is24Hours: boolean;
    dateFormat: string;
    handleSave: () => void;
    titleRequired: boolean;
    reminder: ReminderValue;
    setReminder: (value: ReminderValue) => void;
}

export const useNewAppointment = (): UseWeekAppointmentReturn => {
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
    const [color, setColor] = useState('#33b679');
    const [assign, setAssign] = useState<TeamMember[]>([]);
    const [titleRequired, setTitleRequired] = useState(false);

    useEffect(() => {
        if (dialogAppointment?.slotId) {
            // Extract slotId components
            const [datePart, timePart, userId] =
                dialogAppointment.slotId.split('$') || [];
            const [year, month, day] = datePart?.split('-').map(Number) || [];
            const [hour, minute] = timePart?.split(':').map(Number) || [0, 0];

            // Find the assigned user from teamModel.users
            const assignedUser = teamModel?.users.find(
                (user) => user.id === userId
            );

            if (assignedUser) {
                setAssign([assignedUser]);
            } else {
                setAssign([]);
            }

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
        } else if (
            dialogAppointment?.slotId === '' &&
            dialogAppointment?.appointment
        ) {
            // Handle appointment logic
            const {
                id,
                title: appointmentTitle,
                notes: appointmentNotes,
                start,
                end,
                isFullDay: appointmentIsFullDay,
                color: appointmentColor,
                assign: appointmentAssign,
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
            setAssign(appointmentAssign || []);
        }
    }, [dialogAppointment, teamModel?.users]);

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
            assign,
            reminder,
        };
        onSaveAppointment(appointment);

        // reset all values:
        onDialogAppointment(undefined);
        setTitle('');
        setReminder({ amount: 15, unit: 'minutes' });
        setFromTime(DateTime.now());
        setToTime(DateTime.now().plus({ minutes: 30 }));
        setNotes('');
        setAppointmentId('');
        setIsFullDay(false);
        setAssign([]);
        setColor('#33b679');
    };

    return {
        title,
        notes,
        setTitle,
        setNotes,
        fromTime,
        setFromTime,
        toTime,
        setToTime,
        isFullDay,
        setIsFullDay,
        color,
        setColor,
        assign,
        setAssign,
        is24Hours,
        dateFormat,
        handleSave,
        titleRequired,
        reminder,
        setReminder,
    };
};
