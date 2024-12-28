import { DateTime } from 'luxon';
import React from 'react';
import { DroppableTimeSlot } from 'week/drag-and-drop/DroppableTimeSlot';

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
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
    day,
    interval,
    timeSlots,
    config,
}) => {
    return (
        <>
            {timeSlots.map((_, index) => {
                const hour = Math.floor((index * interval) / 60);
                const minute = (index * interval) % 60;

                const slotId = `${day.toISODate()}-${hour}:${minute}`;

                return (
                    <DroppableTimeSlot
                        key={slotId}
                        slotId={slotId}
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
};
