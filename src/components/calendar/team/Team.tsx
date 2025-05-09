import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { ReactElement } from 'react';
import { TimeDayWrapper, TeamContainer } from './styles';
import DayColumns from 'calendar/_atomic/day-columns/DayColumns';
import DraggableAppointment from 'calendar/_atomic/drag-and-drop/DraggableAppointment';
import TimeColumn from 'calendar/_atomic/time-column/TimeColumn';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import HeaderTemplate from 'calendar/_header-template/HeaderTemplate';
import useAppointment from 'calendar/_hooks/useAppointment';
import useDragAndDropHandler from 'calendar/_hooks/useDragAndDropHandler';
import TeamHeaderRow from 'calendar/team/header-row/TeamHeaderRow';

export default function Team(): ReactElement {
    const { config, appointments, teamModel, selectedDate } =
        useCalendarContext();
    const { fullDayAppointments } = useAppointment(appointments!, selectedDate);
    const { handleDragStart, handleDragEnd, activeDrag } =
        useDragAndDropHandler();

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    return (
        <TeamContainer data-testid="team-container">
            <HeaderTemplate>
                <TeamHeaderRow
                    selectedDate={selectedDate}
                    fullDayAppointments={fullDayAppointments}
                    teamModel={teamModel!}
                />
            </HeaderTemplate>

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
                    {teamModel &&
                        teamModel.users
                            .filter((user) => user.visible)
                            .map((user, i) => {
                                const userAppointments = appointments!.filter(
                                    (appointment) =>
                                        appointment.teamMember &&
                                        appointment.teamMember.some(
                                            (assignee) =>
                                                assignee.id === user.id
                                        )
                                );

                                const userFullDayAppointments =
                                    fullDayAppointments.filter(
                                        (fullDay) =>
                                            fullDay.teamMember &&
                                            fullDay.teamMember.some(
                                                (assignee) =>
                                                    assignee.id === user.id
                                            )
                                    );

                                return (
                                    <DayColumns
                                        key={user.id + i}
                                        day={selectedDate}
                                        interval={interval}
                                        appointments={userAppointments}
                                        fullDayAppointments={
                                            userFullDayAppointments
                                        }
                                        userId={user.id}
                                    />
                                );
                            })}

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
