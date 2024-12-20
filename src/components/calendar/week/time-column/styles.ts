import styled from 'styled-components';
import { calendarConfig } from 'calendar/config';
import { calendarColors } from 'style/color';
import { pixelToRem } from 'utils/common';

interface Props {
    workTime?: boolean;
    intervalIndex?: number;
}

export const TimeColumnContainer = styled.div`
    width: '100px';
`;

export const TimeLabelWrapper = styled.div<Props>`
    height: ${pixelToRem(
        calendarConfig.timeSlotHeight + 1
    )}; // 1px beacuse it do not have a border not like the days columns
    width: 60px;
    margin: auto;
    padding-left: 20px;
    font-size: 12px;
    background-color: ${(props) =>
        props.workTime ? calendarColors.workTime : calendarColors.outOfWork};
`;

export const TimeLabelTextWrapper = styled.span`
    position: relative;
    top: -11px;
`;
