import { ReactElement, useState } from 'react';
import { Appointment } from 'types/appointment';
import WeekAppointmentDetails from 'week/details/WeekAppointmentDetails';
import {
    FullDaysCellContainer,
    FullDayTitleWrapper,
} from 'week/display-appointment/full-days-appointment/full-days-cell/styles';

interface Props {
    appointment: Appointment;
    dayWidth: number;
    visibleStartIndex: number;
    visibleEndIndex: number;
}

export default function FullDaysCell({
    appointment,
    dayWidth,
    visibleStartIndex,
    visibleEndIndex,
}: Props): ReactElement {
    const width = dayWidth * (visibleEndIndex - visibleStartIndex + 1);
    const left = dayWidth * visibleStartIndex;
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleOpenClick = (): void => {
        setOpenDialog(true);
    };

    const handleCloseDialog = (): void => {
        setOpenDialog(false);
    };
    return (
        <FullDaysCellContainer
            width={width}
            left={left}
            onDoubleClick={handleOpenClick}
        >
            <WeekAppointmentDetails
                color={appointment.color || ''}
                title={appointment.title}
                start={appointment.start}
                end={appointment.end}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
            />
            <FullDayTitleWrapper color={appointment.color || ''}>
                {appointment.title}
            </FullDayTitleWrapper>
        </FullDaysCellContainer>
    );
}
