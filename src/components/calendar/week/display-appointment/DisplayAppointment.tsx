import { DateTime } from 'luxon';
import React, { ReactElement } from 'react';
import { DisplayAppointmentContainer } from 'week/display-appointment/styles';

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
        <DisplayAppointmentContainer
            style={{
                ...style,
            }}
        >
            {title} {start}-{end}
        </DisplayAppointmentContainer>
    );
}
