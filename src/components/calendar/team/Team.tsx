import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { TimeDayWrapper, TeamContainer } from './styles';
import DayColumns from 'calendar/_atomic/day-columns/DayColumns';
import DraggableAppointment from 'calendar/_atomic/drag-and-drop/DraggableAppointment';
import TimeColumn from 'calendar/_atomic/time-column/TimeColumn';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import useAppointment from 'calendar/_hooks/useAppointment';
import useDragAndDropHandler from 'calendar/_hooks/useDragAndDropHandler';
import TeamHeaderRow from 'calendar/team/header-row/TeamHeaderRow';
import { Appointment } from 'types/appointment';
import { TeamConfig } from 'types/teamConfig';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
    teamConfig: TeamConfig;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function Week({
    appointments,
    selectedDate,
    teamConfig,
    handleChangeAppointment,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const { fullDayAppointments } = useAppointment(appointments, selectedDate);
    const { handleDragStart, handleDragEnd, activeDrag, updatedAppointments } =
        useDragAndDropHandler(appointments, handleChangeAppointment);

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    return (
        <TeamContainer data-testid="team-container">
            <TeamHeaderRow
                selectedDate={selectedDate}
                fullDayAppointments={fullDayAppointments}
                teamConfig={teamConfig}
            />

            <TimeDayWrapper
                id="time-day-wrapper"
                data-testid="time-day-wrapper"
            >
                <TimeColumn interval={interval} />

                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToWindowEdges]}
                >
                    {teamConfig.teams.map((user, i) => (
                        <DayColumns
                            key={user.id + i}
                            day={selectedDate}
                            interval={interval}
                            appointments={updatedAppointments.filter(
                                (appointment) => appointment.assign === user.id
                            )}
                            fullDayAppointments={fullDayAppointments}
                        />
                    ))}

                    <DragOverlay dropAnimation={null}>
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
                                style={{ top: '0', height: 'auto' }}
                                isOverlay={true}
                            />
                        )}
                    </DragOverlay>
                </DndContext>
            </TimeDayWrapper>
        </TeamContainer>
    );
}
