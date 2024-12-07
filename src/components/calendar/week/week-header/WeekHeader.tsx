import { DateTime } from 'luxon';
import React from 'react';

interface WeekHeaderProps {
    selectedDate: DateTime;
    intervalOptions: number[];
    setIntervalIndex: React.Dispatch<React.SetStateAction<number>>;
    is24HourFormat: boolean;
    setIs24HourFormat: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({
    selectedDate,
    intervalOptions,
    setIntervalIndex,
    is24HourFormat,
    setIs24HourFormat,
}) => {
    return (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3>
                Week {selectedDate.weekNumber} -{' '}
                {selectedDate.toFormat('MMMM yyyy')}
            </h3>
            <button
                type="button"
                onClick={() => setIs24HourFormat((prev) => !prev)}
                style={{ marginRight: '10px' }}
            >
                {is24HourFormat ? 'Switch to 12h' : 'Switch to 24h'}
            </button>
            <button
                type="button"
                onClick={() =>
                    setIntervalIndex((prev) => Math.max(0, prev - 1))
                }
            >
                -
            </button>
            <button
                type="button"
                onClick={() =>
                    setIntervalIndex((prev) =>
                        Math.min(intervalOptions.length - 1, prev + 1)
                    )
                }
            >
                +
            </button>
        </div>
    );
};

export default WeekHeader;
