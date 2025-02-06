import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DroppableTimeSlot from 'calendar/_atomic/drag-and-drop/DroppableTimeSlot';

interface TimeSlotsProps {
    day: DateTime;
    interval: number;
    timeSlots: number[];
    config: {
        hour: {
            workHoursStart: number;
            workHoursEnd: number;
            hourIntervalIndex: number;
        };
    };
    userId?: string;
}

export default function TimeSlots({
    day,
    interval,
    timeSlots,
    config,
    userId,
}: TimeSlotsProps): ReactElement {
    return (
        <>
            {timeSlots.map((_, index) => {
                const hour = Math.floor((index * interval) / 60);
                const minute = (index * interval) % 60;

                const slotId = `${day.toISODate()}$${hour}:${minute}$${userId}`;

                return (
                    <DroppableTimeSlot
                        key={slotId}
                        slotId={slotId}
                        userId={userId}
                        hour={hour}
                        minute={minute}
                        isFirstRow={index === 0}
                        isLastRow={index === timeSlots.length - 1}
                        intervalIndex={config.hour.hourIntervalIndex}
                        workHoursStart={config.hour.workHoursStart}
                        workHoursEnd={config.hour.workHoursEnd}
                    />
                );
            })}
        </>
    );
}
