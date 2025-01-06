import { ReactElement } from 'react';
import { DialogCustom } from 'components/shared/dialog/Dialog';
import { WeekAppointmentDetailsContainer } from 'week/details/styles';

interface Props {
    start: string;
    end: string;
    title: string;
    color: string;
    openDialog: boolean;
    handleCloseDialog: () => void;
}

export default function WeekAppointmentDetails({
    start,
    end,
    title,
    color,
    openDialog,
    handleCloseDialog,
}: Props): ReactElement {
    return (
        <DialogCustom
            title={'Appointment Detail'}
            open={openDialog}
            handleClose={handleCloseDialog}
        >
            <WeekAppointmentDetailsContainer>
                <div>{title}</div>
                <div>{start}</div>
                <div>{end}</div>
                <div>{color}</div>
            </WeekAppointmentDetailsContainer>
        </DialogCustom>
    );
}
