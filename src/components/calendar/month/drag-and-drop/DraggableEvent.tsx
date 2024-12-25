import { useDraggable } from '@dnd-kit/core';
import { ReactElement } from 'react';
import { DraggableEventContainer } from '../month-day-events/styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    id: string;
    title: string;
}

export default function DraggableEvent({ id, title }: Props): ReactElement {
    const { config } = useCalendarContext();
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id,
        });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        zIndex: isDragging ? 2 : 'auto',
        backgroundColor: darkenColor(config.style.primaryColor, -70),
        color: darkenColor(config.style.primaryColor, 80),
    };

    return (
        <DraggableEventContainer
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {title}
        </DraggableEventContainer>
    );
}
