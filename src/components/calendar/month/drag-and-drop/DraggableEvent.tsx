import { useDraggable } from '@dnd-kit/core';
import { ReactElement } from 'react';
import {
    DraggableEventContainer,
    EventTitleWrapper,
    PointWrapper,
} from 'month/drag-and-drop/styles';

interface Props {
    id: string;
    title: string;
    color: string;
}

export default function DraggableEvent({
    id,
    title,
    color,
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
    };

    return (
        <DraggableEventContainer
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            color={color}
            data-testid="draggable-event-container"
        >
            <PointWrapper color={color} />
            <EventTitleWrapper>{title}</EventTitleWrapper>
        </DraggableEventContainer>
    );
}
