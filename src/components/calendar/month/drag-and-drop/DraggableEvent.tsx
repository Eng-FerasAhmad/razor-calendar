import { useDraggable } from '@dnd-kit/core';
import { ReactElement } from 'react';
import { DraggableEventContainer } from '../month-day-events/styles';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    id: string;
    title: string;
    primaryColor: string;
}

export default function DraggableEvent({
    id,
    title,
    primaryColor,
}: Props): ReactElement {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id,
        });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        zIndex: isDragging ? 2 : 'auto',
        backgroundColor: darkenColor(primaryColor, -70),
        color: darkenColor(primaryColor, 80),
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
