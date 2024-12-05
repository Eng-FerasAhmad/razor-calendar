import { DateTime } from 'luxon';
import React from 'react';

interface MonthHeaderProps {
    selectedDate: DateTime;
    localizedMonths: string[];
    localizedWeekdays: string[];
}

const MonthHeader: React.FC<MonthHeaderProps> = ({
    selectedDate,
    localizedMonths,
    localizedWeekdays,
}) => (
    <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <h3>
            {localizedMonths[selectedDate.month - 1]} {selectedDate.year}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {localizedWeekdays.map((day, index) => (
                <div
                    key={index}
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    {day}
                </div>
            ))}
        </div>
    </div>
);

export default MonthHeader;
