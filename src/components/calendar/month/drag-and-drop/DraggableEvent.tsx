import { useDraggable } from '@dnd-kit/core';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import {
    DraggableEventContainer,
    EventTitleWrapper,
    PointWrapper,
} from 'month/drag-and-drop/styles';
import { Appointment } from 'types/appointment';

interface Props {
    id: string;
    title: string;
    color: string;
    appointment: Appointment;
}

export default function DraggableEvent({
    id,
    title,
    color,
    appointment,
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

    const { onPopperAppointment } = useCalendarContext();

    const popperHandler = (event: React.MouseEvent<HTMLElement>): void => {
        onPopperAppointment({
            open: true,
            id: 'id',
            anchorEl: event.currentTarget,
            appointment,
        });
    };

    return (
        <DraggableEventContainer
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            color={color}
            data-testid="draggable-event-container"
            onClick={popperHandler}
        >
            <PointWrapper color={color} />
            <EventTitleWrapper>{title}</EventTitleWrapper>
        </DraggableEventContainer>
    );
}
