import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { DayBox, AppointmentDot } from 'calendar/year/styles';

interface Props {
    date?: DateTime;
    label?: string;
    isPlaceholder?: boolean;
    isHeader?: boolean;
}

export default function DayCell({
    date,
    label,
    isPlaceholder = false,
    isHeader = false,
}: Props): ReactElement {
    const { config, appointments } = useCalendarContext();

    if (isPlaceholder) {
        return <DayBox color="transparent" />;
    }

    if (isHeader) {
        return <DayBox color={config.style.primaryColor}>{label}</DayBox>;
    }

    const isToday = date!.hasSame(DateTime.now(), 'day');
    const hasAppointments = appointments!.some((appointment) =>
        DateTime.fromISO(appointment.start).hasSame(date!, 'day')
    );

    return (
        <DayBox
            isToday={isToday}
            color={config.style.primaryColor}
            onClick={() => console.log(date!.toISODate())}
        >
            {date!.day}
            {hasAppointments && (
                <AppointmentDot color={config.style.primaryColor} />
            )}
        </DayBox>
    );
}
