import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import DaysInTheWeek from 'components/calendar/month/month-days-in-week/MonthDaysInWeek';
import WeekNumber from 'components/calendar/month/month-week-number/MonthWeekNumber';
import DraggableEvent from 'month/drag-and-drop/DraggableEvent';
import { useDragAndDrop } from 'month/drag-and-drop/useDragAndDrop';
import {
    MonthGridContainer,
    MonthGridContentWrapper,
} from 'month/month-grid/styles';

interface Props {
    weeksRow: DateTime[][];
}

export default function MonthGrid({ weeksRow }: Props): ReactElement {
    const { config } = useCalendarContext();
    const { handleDragStart, handleDragEnd, activeDrag } = useDragAndDrop();

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
        >
            <MonthGridContainer data-testid="month-grid-container">
                {weeksRow.map((week, weekIndex) => (
                    <MonthGridContentWrapper
                        data-testid="month-grid-content-container"
                        key={weekIndex}
                    >
                        {config.month.showWeekNumbers && (
                            <WeekNumber weekStart={week[0]} />
                        )}
                        <DaysInTheWeek week={week} />
                    </MonthGridContentWrapper>
                ))}

                <DragOverlay dropAnimation={null}>
                    {activeDrag && (
                        <DraggableEvent
                            key={activeDrag.id}
                            id={activeDrag.id}
                            appointment={activeDrag}
                            title={activeDrag.title}
                            color={
                                activeDrag.color || config.style.primaryColor
                            }
                        />
                    )}
                </DragOverlay>
            </MonthGridContainer>
        </DndContext>
    );
}
