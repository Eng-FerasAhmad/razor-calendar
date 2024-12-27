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
}

export default function StandardView({
    start,
    end,
    title,
}: Props): ReactElement {
    return (
        <StandardViewContainer data-testid="standard-view-container">
            <ShortTimerViewWrapper>
                {start} - {end}
            </ShortTimerViewWrapper>
            <ShortLabelViewWrapper>{title}</ShortLabelViewWrapper>
        </StandardViewContainer>
    );
}
