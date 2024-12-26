import styled from 'styled-components';
import { commonSize } from 'calendar/_config/basicConfig';
import { calendarColors, color } from 'style/color';
import { pixelToRem } from 'utils/common';

export const TimeSlotOffset = 10;

interface Props {
    workTime?: boolean;
    intervalIndex?: number;
}

export const TimeColumnContainer = styled.div`
    width: 70px;
`;

const calcTimeSlotHeight = (props: Props): string => {
    const offset = props.intervalIndex! * TimeSlotOffset;
    return pixelToRem(commonSize.timeSlotHeight - offset);
};

export const TimeLabelWrapper = styled.div<Props>`
    height: ${calcTimeSlotHeight};
    min-height: 20px;
    border-top: 1px solid transparent; // do not remove, need it because the time slots has borders
    width: 60px;
    margin: auto;
    padding-left: 10px;
    font-size: 12px;
    background-color: ${(props) =>
        props.workTime ? calendarColors.workTime : calendarColors.outOfWork};
    color: ${color.fontPrimaryLight};
`;

export const TimeLabelTextWrapper = styled.span`
    position: relative;
    top: -14px;
`;
