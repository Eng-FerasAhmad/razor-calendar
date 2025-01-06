import { ReactElement, useState } from 'react';
import WeekAppointmentDetails from 'week/details/WeekAppointmentDetails';
import {
    ShortLabelZoomIntervalWrapper,
    ShortTimerZoomIntervalWrapper,
    ZoomIntervalViewContainer,
} from 'week/display-appointment/views/styles';

interface Props {
    start: string;
    end: string;
    title: string;
    color: string;
    // Optional prop to disable double-click functionality to avoid the conflicts with drag and drops
    disableDoubleClick?: boolean;
}

export default function ZoomIntervalView({
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
        <ZoomIntervalViewContainer
            color={color}
            data-testid="zoom-interval-view-container"
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
            <ShortTimerZoomIntervalWrapper>
                {start} - {end}
            </ShortTimerZoomIntervalWrapper>
            <ShortLabelZoomIntervalWrapper>
                {title}
            </ShortLabelZoomIntervalWrapper>
        </ZoomIntervalViewContainer>
    );
}
