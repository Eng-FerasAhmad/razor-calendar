import { useDraggable } from '@dnd-kit/core';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import {
    EventTitleWrapper,
    MonthEventContainer,
    MoreEventButtonWrapper,
    PointWrapper,
} from 'month/month-day-events/styles';

import { Appointment } from 'types/appointment';

interface Props {
    appointments: Appointment[];
}

function DraggableEvent({
    id,
    title,
    color,
}: {
    id: string;
    title: string;
    color: string;
}): ReactElement {
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
        <MonthEventContainer
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            color={color}
            data-testid="draggable-event"
        >
            <PointWrapper color={color} />
            <EventTitleWrapper>{title}</EventTitleWrapper>
        </MonthEventContainer>
    );
}

export default function DisplayEvents({ appointments }: Props): ReactElement {
    const { config } = useCalendarContext();
    // Limit to first 3 events
    const visibleAppointments = appointments.slice(0, 3);
    const remainingCount = appointments.length - visibleAppointments.length;

    return (
        <>
            {visibleAppointments.map((appointment) => (
                <DraggableEvent
                    key={appointment.id}
                    id={appointment.id}
                    title={appointment.title}
                    color={appointment.color || config.style.primaryColor}
                />
            ))}

            {/* Show remaining events count if applicable */}
            {remainingCount > 0 && (
                <MoreEventButtonWrapper
                    color={config.style.primaryColor}
                    data-testid="month-event-container-more"
                >
                    {`${remainingCount} more events`}
                </MoreEventButtonWrapper>
            )}
        </>
    );
}
