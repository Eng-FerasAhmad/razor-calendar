import { useDroppable } from '@dnd-kit/core';
import { ReactElement, useState } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import AddCircleSymbol from 'components/shared/icons/add-circle/AddCircle';
import { color } from 'style/color';
import { isWorkTime } from 'utils/dateTime';
import {
    DroppableSlotWrapper,
    PopupAreaWrapper,
} from 'week/drag-and-drop/styles';

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
    const { config } = useCalendarContext();
    const { setNodeRef, isOver } = useDroppable({ id: slotId });
    const [isHovered, setIsHovered] = useState(false);
    const [isIconVisible, setIsIconVisible] = useState(true);

    const handleIconClick = (): void => {
        setIsIconVisible(false);
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
                backgroundColor: isOver ? '#e3f2fd' : '', // Highlight when hovered for drag and drop
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <PopupAreaWrapper>
                {isHovered && isIconVisible && (
                    <AddCircleSymbol
                        size={24}
                        color={color.fontPrimaryLight}
                        hoverColor={config.style.primaryColor}
                        onClick={handleIconClick}
                    />
                )}
            </PopupAreaWrapper>
        </DroppableSlotWrapper>
    );
}
