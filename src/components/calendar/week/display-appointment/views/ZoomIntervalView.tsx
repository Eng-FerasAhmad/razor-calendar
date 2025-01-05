import { ReactElement } from 'react';
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
}

export default function ZoomIntervalView({
    start,
    end,
    title,
    color,
}: Props): ReactElement {
    return (
        <ZoomIntervalViewContainer
            color={color}
            data-testid="zoom-interval-view-container"
        >
            <ShortTimerZoomIntervalWrapper>
                {start} - {end}
            </ShortTimerZoomIntervalWrapper>
            <ShortLabelZoomIntervalWrapper>
                {title}
            </ShortLabelZoomIntervalWrapper>
        </ZoomIntervalViewContainer>
    );
}
