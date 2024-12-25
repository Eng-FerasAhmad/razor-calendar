import styled from 'styled-components';
import { commonSize } from 'calendar/_config/basicConfig';
import { calendarColors } from 'style/color';
import { pixelToRem } from 'utils/common';

export const TimeSlotOffset = 10;

interface Props {
    workTime?: boolean;
    intervalIndex?: number;
}

export const TimeColumnContainer = styled.div`
    width: '100px';
`;

const calcTimeSlotHeight = (props: Props): string => {
    const offset = props.intervalIndex! * TimeSlotOffset;
    return pixelToRem(commonSize.timeSlotHeight - offset);
};

export const TimeLabelWrapper = styled.div<Props>`
    height: ${calcTimeSlotHeight};
    min-height: 20px;
    border-top: 1px solid transparent;
    width: 60px;
    margin: auto;
    padding-left: 20px;
    font-size: 12px;
    background-color: ${(props) =>
        props.workTime ? calendarColors.workTime : calendarColors.outOfWork};
`;

export const TimeLabelTextWrapper = styled.span`
    position: relative;
    top: -14px;
`;
