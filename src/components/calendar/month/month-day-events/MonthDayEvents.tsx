import { useDraggable } from '@dnd-kit/core';
import { ReactElement } from 'react';
import { MonthEventContainer } from 'month/month-day-events/styles';
import { Appointment } from 'types/calendar';

interface Props {
    primaryColor: string;
    appointments: Appointment[];
}

function DraggableEvent({
    id,
    title,
    primaryColor,
}: {
    id: string;
    title: string;
    primaryColor: string;
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
        backgroundColor: primaryColor,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <MonthEventContainer
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            color={primaryColor}
            data-testid="draggable-event"
        >
            {title}
        </MonthEventContainer>
    );
}

export default function DisplayEvents({
    appointments,
    primaryColor,
}: Props): ReactElement {
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
                    primaryColor={primaryColor}
                />
            ))}

            {/* Show remaining events count if applicable */}
            {remainingCount > 0 && (
                <MonthEventContainer
                    color={primaryColor}
                    data-testid="month-event-container-more"
                >
                    {`${remainingCount} more events`}
                </MonthEventContainer>
            )}
        </>
    );
}
