import { ReactElement, useState } from 'react';
import WeekAppointmentDetails from 'week/details/WeekAppointmentDetails';
import {
    IntervalViewContainer,
    ShortLabelIntervalViewWrapper,
    ShortTimerIntervalViewWrapper,
} from 'week/display-appointment/views/styles';

interface Props {
    start: string;
    end: string;
    title: string;
    color: string;
    // Optional prop to disable double-click functionality to avoid the conflicts with drag and drops
    disableDoubleClick?: boolean;
}

export default function IntervalView({
    start,
    end,
    title,
    color,
    disableDoubleClick,
}: Props): ReactElement {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleOpenClick = (): void => {
        if (!disableDoubleClick) {
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = (): void => {
        setOpenDialog(false);
    };

    return (
        <IntervalViewContainer
            color={color}
            data-testid="interval-view-container"
            onClick={handleOpenClick}
        >
            <WeekAppointmentDetails
                color={color}
                title={title}
                start={start}
                end={end}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
            />
            <ShortTimerIntervalViewWrapper data-testid="short-timer-interval-view-wrapper">
                {start} - {end}
            </ShortTimerIntervalViewWrapper>
            <ShortLabelIntervalViewWrapper>
                {title}
            </ShortLabelIntervalViewWrapper>
        </IntervalViewContainer>
    );
}
