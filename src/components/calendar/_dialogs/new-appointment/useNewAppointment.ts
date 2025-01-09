// useNewAppointment.ts
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

export interface UseWeekAppointmentReturn {
    title: string;
    setTitle: (title: string) => void;
    fromTime: DateTime;
    setFromTime: (time: DateTime) => void;
    toTime: DateTime;
    setToTime: (time: DateTime) => void;
    isFullDay: boolean;
    setIsFullDay: (isFullDay: boolean) => void;
    color: string;
    setColor: (color: string) => void;
    is24Hours: boolean;
    dateFormat: string;
    handleSave: () => void;
}

export const useNewAppointment = (): UseWeekAppointmentReturn => {
    const { config, dialogAppointment, onSaveAppointment } =
        useCalendarContext();

    const is24Hours = config.hour?.is24HourFormat || false;
    const dateFormat =
        config.common?.dateFormat ||
        (config.common.lang === 'de' ? 'dd.MM.yyyy' : 'dd/MM/yyyy');

    const [fromTime, setFromTime] = useState<DateTime>(DateTime.now());
    const [toTime, setToTime] = useState<DateTime>(
        DateTime.now().plus({ minutes: 30 })
    );
    const [title, setTitle] = useState('');
    const [isFullDay, setIsFullDay] = useState(false);
    const [color, setColor] = useState('#33b679');

    useEffect(() => {
        const [year, month, day, time] =
            dialogAppointment?.slotId?.split('-') || [];
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
    }, [dialogAppointment?.slotId]);

    const handleSave = (): void => {
        const appointment: Appointment = {
            id: 'new',
            title,
            start: fromTime.toFormat(`${dateFormat} HH:mm`),
            end: toTime.toFormat(`${dateFormat} HH:mm`),
            isFullDay,
            color,
        };
        onSaveAppointment(appointment);
    };

    return {
        title,
        setTitle,
        fromTime,
        setFromTime,
        toTime,
        setToTime,
        isFullDay,
        setIsFullDay,
        color,
        setColor,
        is24Hours,
        dateFormat,
        handleSave,
    };
};
