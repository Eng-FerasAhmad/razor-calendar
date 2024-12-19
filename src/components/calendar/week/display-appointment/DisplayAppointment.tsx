import { DateTime } from 'luxon';
import React, { ReactElement } from 'react';

interface Props {
    title: string;
    from: string;
    to: string;
    style: React.CSSProperties;
}

export default function DisplayAppointment({
    title,
    from,
    to,
    style,
}: Props): ReactElement {
    const start = DateTime.fromISO(from).hour;
    const end = DateTime.fromISO(to).hour;
    return (
        <div
            style={{
                position: 'absolute',
                left: '5px',
                right: '5px',
                backgroundColor: '#007bff',
                color: '#fff',
                borderRadius: '4px',
                fontSize: '10px',
                padding: '2px',
                ...style,
            }}
        >
            {title} {start}-{end}
        </div>
    );
}
