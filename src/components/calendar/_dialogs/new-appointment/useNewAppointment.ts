import { DateTime } from 'luxon';
import { useState, useMemo } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';

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
    colors: { name: string; value: string }[];
    is24Hours: boolean;
    dateFormat: string;
    handleSave: () => void;
}

export const useNewAppointment = (): UseWeekAppointmentReturn => {
    const { config, dialogAppointment } = useCalendarContext();

    const is24Hours = config.hour?.is24HourFormat || false;
    const dateFormat =
        config.common?.dateFormat ||
        (config.common.lang === 'de' ? 'dd.MM.yyyy' : 'dd/MM/yyyy');

    // Parse slotId (format: 2025-01-02-10:0)
    const [year, month, day, time] =
        dialogAppointment?.slotId?.split('-') || [];
    const [hour, minute] = time?.split(':').map(Number) || [0, 0];

    const initialFromTime = useMemo(() => {
        return year && month && day && time
            ? DateTime.fromObject({
                  year: Number(year),
                  month: Number(month),
                  day: Number(day),
                  hour,
                  minute,
              })
            : DateTime.now();
    }, [year, month, day, time, hour, minute]);

    const [fromTime, setFromTime] = useState<DateTime>(initialFromTime);
    const [toTime, setToTime] = useState<DateTime>(
        initialFromTime.plus({ minutes: 30 })
    );
    const [title, setTitle] = useState('');
    const [isFullDay, setIsFullDay] = useState(false);
    const [color, setColor] = useState('red');

    const colors = useMemo(
        () => [
            { name: 'Red', value: 'red' },
            { name: 'Blue', value: 'blue' },
            { name: 'Green', value: 'green' },
            { name: 'Orange', value: 'orange' },
            { name: 'Yellow', value: 'yellow' },
            { name: 'Cyan', value: 'cyan' },
        ],
        []
    );

    const handleSave = (): void => {
        console.log({
            title,
            from: fromTime.toFormat(`${dateFormat} HH:mm`),
            to: toTime.toFormat(`${dateFormat} HH:mm`),
            isFullDay,
            color,
        });
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
        colors,
        is24Hours,
        dateFormat,
        handleSave,
    };
};
