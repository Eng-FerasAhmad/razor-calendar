import { useDraggable } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { ReactElement, useState, useRef } from 'react';
import { AppointmentWrapper, DraggableZone } from './styles';
import IntervalView from 'calendar/_atomic/display-appointment/views/IntervalView';
import StandardView from 'calendar/_atomic/display-appointment/views/StandardView';
import ZoomIntervalView from 'calendar/_atomic/display-appointment/views/ZoomIntervalView';
import { useCalendarContext } from 'calendar/_context/CalendarContext';

import { Appointment } from 'types/appointment';

interface Props {
    id: string;
    from: string;
    to: string | undefined;
    color: string;
    style: { top: string; height: string };
    appointment: Appointment;
    isOverlay?: boolean;
}

export default function DraggableAppointment({
    id,
    from,
    to,
    color,
    style,
    appointment,
    isOverlay = false,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const [isDragging, setIsDragging] = useState(false);
    const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const diffInMinutes = DateTime.fromISO(to!).diff(
        DateTime.fromISO(from),
        'minutes'
    ).minutes;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging: dndDragging,
    } = useDraggable({
        id,
    });

    const handlePointerDown = (): void => {
        if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
        setIsDragging(false);
    };

    const handlePointerMove = (): void => {
        setIsDragging(true);
    };

    const handlePointerUp = (): void => {
        dragTimeoutRef.current = setTimeout(() => setIsDragging(false), 150);
    };
    const multiAssignees =
        Array.isArray(appointment.teamMember) &&
        appointment.teamMember.length > 1;
    const colorSelected = multiAssignees
        ? color
        : appointment.teamMember![0].color;

    const dragStyle = isOverlay
        ? {
              backgroundColor: colorSelected,
              transform: transform
                  ? `translate(${transform.x}px, ${transform.y}px)`
                  : undefined,
              zIndex: isDragging || dndDragging ? 10 : 'auto',
              opacity: isDragging || dndDragging ? 0.6 : 1,
              boxShadow:
                  isDragging || dndDragging
                      ? '0px 4px 10px rgba(0,0,0,0.2)'
                      : 'none',
              cursor: 'grabbing',
              ...style,
          }
        : { ...style };

    const getViewComponent = (): ReactElement => {
        const { hourIntervalIndex } = config.hour;
        const viewConfig: {
            condition: (minutes: number) => boolean;
            view: ReactElement;
        }[] = [
            {
                condition: (minutes) => minutes <= 45,
                view: (
                    <IntervalView
                        appointment={appointment}
                        color={colorSelected}
                    />
                ),
            },
            {
                condition: (minutes) => minutes <= 45,
                view: (
                    <ZoomIntervalView
                        appointment={appointment}
                        color={colorSelected}
                    />
                ),
            },
        ];

        if (hourIntervalIndex < viewConfig.length) {
            const { condition, view } = viewConfig[hourIntervalIndex];
            if (condition(diffInMinutes!)) return view;
        }

        return <StandardView appointment={appointment} color={colorSelected} />;
    };

    return (
        <AppointmentWrapper
            ref={setNodeRef}
            id={id}
            style={dragStyle}
            backgroundColor={color}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            data-testid={isOverlay ? 'drag-overlay' : 'draggable-appointment'}
        >
            <DraggableZone
                {...attributes}
                {...listeners}
                data-testid="draggable-zone"
            />
            {getViewComponent()}
        </AppointmentWrapper>
    );
}
