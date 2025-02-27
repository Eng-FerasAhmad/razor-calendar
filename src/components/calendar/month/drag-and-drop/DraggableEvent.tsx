import { useDraggable } from '@dnd-kit/core';
import { MouseEvent, ReactElement } from 'react';
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

    const popperHandler = (event: MouseEvent<HTMLElement>): void => {
        onPopperAppointment({
            open: true,
            id: 'id',
            anchorEl: event.currentTarget,
            appointment,
        });
    };

    const multiAssignees =
        Array.isArray(appointment.assign) && appointment.assign.length > 1;
    const selectedColor = multiAssignees
        ? appointment.color!
        : appointment.assign![0].color;

    return (
        <DraggableEventContainer
            ref={setNodeRef}
            style={style}
            color={color}
            data-testid="draggable-event-container"
            onClick={popperHandler}
        >
            <PointWrapper
                {...attributes}
                {...listeners}
                data-testid="draggable-zone"
                color={selectedColor}
            />

            <EventTitleWrapper>{title}</EventTitleWrapper>
        </DraggableEventContainer>
    );
}
