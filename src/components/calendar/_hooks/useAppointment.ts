import { DateTime } from 'luxon';
import { Appointment } from 'types/appointment';

interface UseWeek {
    fullDayAppointments: Appointment[];
}

export default function useAppointment(
    appointments: Appointment[],
    selectedDate: DateTime
): UseWeek {
    // Filter all-day or multi-day appointments
    const fullDayAppointments = appointments.filter((appointment) => {
        const start = DateTime.fromISO(appointment.start).startOf('day');
        const end = DateTime.fromISO(appointment.end).startOf('day');
        const weekStart = selectedDate.startOf('week'); // Start of the current week
        const weekEnd = selectedDate.endOf('week'); // End of the current week

        // Check if the appointment spans multiple days or is marked as full-day
        const isFullDay = start < end || appointment.isFullDay;

        // Ensure the appointment is within the range of the current week
        const isInWeekRange =
            (start >= weekStart && start <= weekEnd) ||
            (end >= weekStart && end <= weekEnd) ||
            (start < weekStart && end > weekEnd);

        return isFullDay && isInWeekRange;
    });

    return {
        fullDayAppointments,
    };
}
