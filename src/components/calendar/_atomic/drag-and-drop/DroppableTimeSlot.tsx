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
    userId?: string;
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
    userId,
}: Props): ReactElement {
    const { setNodeRef, isOver } = useDroppable({ id: slotId });
    const { onDialogAppointment, teamModel } = useCalendarContext();

    // Find user safely (handle case where userId is undefined)
    const currUser = userId
        ? teamModel?.users.find((user) => user.id === userId)
        : undefined;

    // Check if user is not available or passive (avoid accessing undefined properties)
    const isNotAvailable = currUser?.notAvailable ?? false;
    const isPassive = currUser?.isPassive ?? false;

    // Background color logic
    const getBackgroundColor = (): string | undefined => {
        if (isOver) return '#e3f2fd';
        if (isNotAvailable || isPassive) return '#f8f8f8';
        return undefined;
    };

    const handleOpenClick = (): void => {
        if (isNotAvailable || isPassive) return;
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
            isPassive={isPassive} // Use checked value
            workTime={isWorkTime(hour, workHoursStart, workHoursEnd)}
            style={{ backgroundColor: getBackgroundColor() }}
            onDoubleClick={handleOpenClick}
        />
    );
}
