import { ReactElement } from 'react';
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
}

export default function IntervalView({
    start,
    end,
    title,
    color,
}: Props): ReactElement {
    return (
        <IntervalViewContainer
            color={color}
            data-testid="interval-view-container"
        >
            <ShortTimerIntervalViewWrapper data-testid="short-timer-interval-view-wrapper">
                {start} - {end}
            </ShortTimerIntervalViewWrapper>
            <ShortLabelIntervalViewWrapper>
                {title}
            </ShortLabelIntervalViewWrapper>
        </IntervalViewContainer>
    );
}
