import React, { ReactElement } from 'react';

interface Props {
    title: string;
    style: React.CSSProperties;
}

export default function Event({ title, style }: Props): ReactElement {
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
            {title}
        </div>
    );
}
