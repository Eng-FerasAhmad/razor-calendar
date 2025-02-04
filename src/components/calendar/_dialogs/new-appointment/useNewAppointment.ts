import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
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
}

export const useNewAppointment = (): UseWeekAppointmentReturn => {
    const {
        config,
        dialogAppointment,
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
    const [appointmentId, setAppointmentId] = useState('');
    const [isFullDay, setIsFullDay] = useState(false);
    const [color, setColor] = useState('#33b679');
    const [assign, setAssign] = useState<TeamMember[]>([]);
    const [titleRequired, setTitleRequired] = useState(false);

    useEffect(() => {
        if (dialogAppointment?.slotId) {
            // Handle slotId logic
            const [year, month, day, time] =
                dialogAppointment.slotId.split('-') || [];
            const [hour, minute] = time?.split(':').map(Number) || [0, 0];

            if (year && month && day && time) {
                const newFromTime = DateTime.fromObject({
                    year: Number(year),
                    month: Number(month),
                    day: Number(day),
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
            } = dialogAppointment.appointment;

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
    }, [dialogAppointment]);

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
        };
        onSaveAppointment(appointment);

        // reset all values:
        onDialogAppointment(undefined);
        setTitle('');
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
    };
};
