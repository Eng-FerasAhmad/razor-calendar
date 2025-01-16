import { useDroppable } from '@dnd-kit/core';
import { ReactElement } from 'react';
import { DroppableSlotWrapper } from 'calendar/_atomic/drag-and-drop/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { isWorkTime } from 'utils/dateTime';

interface Props {
    slotId: string;
    hour: number;
    minute: number;
    isFirstRow: boolean;
    isLastRow: boolean;
    intervalIndex: number;
    workHoursStart: number;
    workHoursEnd: number;
}

export default function DroppableTimeSlot({
    slotId,
    hour,
    minute,
    isFirstRow,
    isLastRow,
    intervalIndex,
    workHoursStart,
    workHoursEnd,
}: Props): ReactElement {
    const { setNodeRef, isOver } = useDroppable({ id: slotId });
    const { onDialogAppointment } = useCalendarContext();

    const handleOpenClick = (): void => {
        onDialogAppointment({
            open: true,
            slotId,
        });
    };

    return (
        <DroppableSlotWrapper
            ref={setNodeRef}
            data-testid="droppable-time-slot-wrapper"
            id={slotId}
            key={slotId}
            isFullHour={minute === 0}
            isFirstRow={isFirstRow}
            intervalIndex={intervalIndex}
            isLastRow={isLastRow}
            workTime={isWorkTime(hour, workHoursStart, workHoursEnd)}
            style={{
                backgroundColor: isOver ? '#e3f2fd' : '',
            }}
            onDoubleClick={handleOpenClick}
        ></DroppableSlotWrapper>
    );
}
