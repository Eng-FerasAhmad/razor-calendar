import { Tooltip } from '@mui/material';
import { MenuOutline } from 'razor-icon-library';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { MoreEventsButtonWrapper } from 'month/display-month-appointment/styles';

import DraggableEvent from 'month/drag-and-drop/DraggableEvent';
import { Appointment } from 'types/appointment';

interface Props {
    appointments: Appointment[];
}

export default function DisplayMonthAppointments({
    appointments,
}: Props): ReactElement {
    const { t } = useTranslation();
    const { config } = useCalendarContext();

    // Limit to first 3 events
    const visibleAppointments = appointments.slice(0, 3);
    const remainingCount = appointments.length - visibleAppointments.length;

    return (
        <>
            {visibleAppointments.map((appointment) => (
                <DraggableEvent
                    key={appointment.id}
                    id={appointment.id}
                    appointment={appointment}
                    title={appointment.title}
                    color={appointment.color!}
                />
            ))}

            {remainingCount > 0 && (
                <Tooltip
                    title={`${remainingCount} ${t('buttons.more', {
                        ns: 'common',
                    })}`}
                >
                    <MoreEventsButtonWrapper
                        color={config.style.primaryColor}
                        data-testid="more-events-button-wrapper"
                    >
                        <MenuOutline size={24} color="#b3b3b3" />
                    </MoreEventsButtonWrapper>
                </Tooltip>
            )}
        </>
    );
}
