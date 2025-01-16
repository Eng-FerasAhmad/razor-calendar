import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import TimeColumn from 'components/calendar/week/time-column/TimeColumn';
import { Appointment } from 'types/appointment';
import { getDateRange } from 'utils/dates';
import DayColumns from 'week/day-columns/DayColumns';
import DraggableAppointment from 'week/drag-and-drop/DraggableAppointment';
import WeekHeaderRow from 'week/header-row/WeekHeaderRow';
import { TimeDayWrapper, WeekContainer } from 'week/styles';
import useWeek from 'week/useWeeks';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
    handleChangeAppointment: (appointment: Appointment) => void;
}

interface TeamMember {
    id: string;
    name: string;
}

export default function Team({
    appointments,
    selectedDate,
    handleChangeAppointment,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const { fullDayAppointments } = useWeek(appointments, selectedDate);

    const teamMembers: TeamMember[] = [
        { id: 'id-max', name: 'Max' },
        { id: 'id-martin', name: 'Martin' },
    ];

    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    const [activeDrag, setActiveDrag] = useState<Appointment | null>(null);
    const [updatedAppointments, setUpdatedAppointments] =
        useState(appointments);

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        if (!over || !activeDrag) return;

        const [dayISO, time] = over.id.split('-');
        const [hour, minute] = time.split(':').map(Number);
        const targetDay = DateTime.fromISO(dayISO);

        setUpdatedAppointments((prev) =>
            prev.map((appointment) => {
                if (appointment.id === active.id) {
                    const durationInMinutes = DateTime.fromISO(
                        appointment.end
                    ).diff(
                        DateTime.fromISO(appointment.start),
                        'minutes'
                    ).minutes;

                    const newStart = targetDay.set({ hour, minute });
                    const newEnd = newStart.plus({
                        minutes: durationInMinutes,
                    });

                    const updatedAppointment = {
                        ...appointment,
                        start: newStart.toISO(),
                        end: newEnd.toISO(),
                    };

                    handleChangeAppointment(updatedAppointment);
                    return updatedAppointment;
                }
                return appointment;
            })
        );

        setActiveDrag(null);
    };

    const handleDragStart = (event: DragStartEvent): void => {
        const draggedAppointment = appointments.find(
            (appointment) => appointment.id === String(event.active.id)
        );
        setActiveDrag(draggedAppointment || null);
    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            delay: 100,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor);

    return (
        <WeekContainer data-testid="team-container">
            <WeekHeaderRow
                days={[selectedDate]}
                fullDayAppointments={fullDayAppointments}
            />
            <TimeDayWrapper>
                {teamMembers.map((member) => (
                    <div key={member.id} style={{ flex: 1 }}>
                        <h4>{member.name}</h4>
                        <DndContext
                            sensors={sensors}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            modifiers={[restrictToWindowEdges]}
                        >
                            <TimeColumn interval={interval} />
                            <DayColumns
                                day={selectedDate}
                                interval={interval}
                                appointments={updatedAppointments.filter(
                                    (appointment) =>
                                        appointment.assign === member.id
                                )}
                                fullDayAppointments={fullDayAppointments}
                            />
                            <DragOverlay>
                                {activeDrag && (
                                    <DraggableAppointment
                                        id={activeDrag.id}
                                        from={activeDrag.start}
                                        to={activeDrag.end}
                                        appointment={activeDrag}
                                        color={
                                            activeDrag.color ||
                                            config.style.primaryColor
                                        }
                                        isOverlay
                                    />
                                )}
                            </DragOverlay>
                        </DndContext>
                    </div>
                ))}
            </TimeDayWrapper>
        </WeekContainer>
    );
}
