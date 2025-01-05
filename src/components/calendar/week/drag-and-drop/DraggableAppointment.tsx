import { useDraggable } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { AppointmentWrapper } from './styles';
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
}

export default function DraggableAppointment({
    id,
    title,
    from,
    to,
    color,
    style,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const start = DateTime.fromISO(from).toFormat('hh:mm');
    const end = DateTime.fromISO(to).toFormat('hh:mm');

    const diffInMinutes = DateTime.fromISO(to).diff(
        DateTime.fromISO(from),
        'minutes'
    ).minutes;

    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id,
        });
    const dragStyle = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        zIndex: isDragging ? 2 : 'auto',
        ...style,
    };

    // Helper function to get the appropriate view component
    const getViewComponent = (): ReactElement => {
        const { hourIntervalIndex } = config.hour;

        // Map hourIntervalIndex to conditions and components
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
                    />
                ),
            },
            {
                condition: (minutes) => minutes < 30,
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
                condition: (minutes) => minutes < 20,
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
                condition: (minutes) => minutes < 10,
                view: (
                    <IntervalView
                        start={start}
                        end={end}
                        title={title}
                        color={color}
                    />
                ),
            },
        ];

        // Select the appropriate view component based on the hourIntervalIndex
        if (hourIntervalIndex < viewConfig.length) {
            const { condition, view } = viewConfig[hourIntervalIndex];
            if (condition(diffInMinutes!)) {
                return view;
            }
        }

        return (
            <StandardView start={start} end={end} title={title} color={color} />
        );
    };

    return (
        <AppointmentWrapper
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            id={id}
            style={dragStyle}
            backgroundColor={darkenColor(color, 30)}
            data-testid="draggable-appointment"
        >
            {getViewComponent()}
        </AppointmentWrapper>
    );
}
