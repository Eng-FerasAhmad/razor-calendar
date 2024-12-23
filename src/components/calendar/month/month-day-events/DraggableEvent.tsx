import { useDraggable } from '@dnd-kit/core';
import { ReactElement } from 'react';
import { DraggableEventContainer } from './styles';

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
        backgroundColor: primaryColor,
        opacity: isDragging ? 0.8 : 1,
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
