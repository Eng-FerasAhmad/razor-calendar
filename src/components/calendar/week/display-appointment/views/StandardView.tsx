import { ReactElement } from 'react';
import {
    ShortLabelViewWrapper,
    ShortTimerViewWrapper,
    StandardViewContainer,
} from 'week/display-appointment/views/styles';

interface Props {
    start: string;
    end: string;
    title: string;
    color: string;
}

export default function StandardView({
    start,
    end,
    title,
    color,
}: Props): ReactElement {
    return (
        <StandardViewContainer
            color={color}
            data-testid="standard-view-container"
        >
            <ShortTimerViewWrapper>
                {start} - {end}
            </ShortTimerViewWrapper>
            <ShortLabelViewWrapper>{title}</ShortLabelViewWrapper>
        </StandardViewContainer>
    );
}
