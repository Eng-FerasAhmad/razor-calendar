import { useDraggable } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { ReactElement, useState, useRef } from 'react';
import { AppointmentWrapper, DraggableZone } from './styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { darkenColor } from 'utils/colorConverter';
import IntervalView from 'week/display-appointment/views/IntervalView';
import StandardView from 'week/display-appointment/views/StandardView';
import ZoomIntervalView from 'week/display-appointment/views/ZoomIntervalView';

interface Props {
    id: string;
    title: string;
    from: string;
    to: string;
    color: string;
    style: { top: string; height: string };
    isOverlay?: boolean;
}

export default function DraggableAppointment({
    id,
    title,
    from,
    to,
    color,
    style,
    isOverlay = false,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const start = DateTime.fromISO(from).toFormat('hh:mm');
    const end = DateTime.fromISO(to).toFormat('hh:mm');
    const [isDragging, setIsDragging] = useState(false);
    const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const diffInMinutes = DateTime.fromISO(to).diff(
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

    const dragStyle = isOverlay
        ? {
              transform: transform
                  ? `translate(${transform.x}px, ${transform.y}px)`
                  : undefined,
              zIndex: isDragging || dndDragging ? 2 : 'auto',
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
                        start={start}
                        end={end}
                        title={title}
                        color={color}
                    />
                ),
            },
            {
                condition: (minutes) => minutes <= 45,
                view: (
                    <ZoomIntervalView
                        start={start}
                        end={end}
                        title={title}
                        color={color}
                        disableDoubleClick={isDragging}
                    />
                ),
            },
        ];

        if (hourIntervalIndex < viewConfig.length) {
            const { condition, view } = viewConfig[hourIntervalIndex];
            if (condition(diffInMinutes!)) return view;
        }

        return (
            <StandardView start={start} end={end} title={title} color={color} />
        );
    };

    return (
        <AppointmentWrapper
            ref={setNodeRef}
            id={id}
            style={dragStyle}
            backgroundColor={darkenColor(color, 30)}
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
