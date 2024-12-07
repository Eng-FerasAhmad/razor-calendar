import { DateTime } from 'luxon';
import { ReactElement } from 'react';

interface Props {
    selectedDate: DateTime;
    localizedMonths: string[];
    localizedWeekdays: string[];
}

export default function MonthHeader({
    selectedDate,
    localizedMonths,
    localizedWeekdays,
}: Props): ReactElement {
    return (
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
}
