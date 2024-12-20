import styled from 'styled-components';
import { calendarConfig } from 'calendar/config';
import { calendarColors } from 'style/color';
import { pixelToRem } from 'utils/common';

interface Props {
    workTime?: boolean;
    timSlotsCount?: number;
}

const calcColumnHeight = (props: Props): string => {
    return `calc(${props.timSlotsCount} * ${pixelToRem(calendarConfig.timeSlotHeight)} + 24px)`;
};

export const DaysColumnsContainer = styled.div<Props>`
    flex: 1;
    position: relative;
    border-left: 1px solid #ccc;
    height: ${calcColumnHeight};
`;

export const TimeSlotWrapper = styled.div<Props>`
    height: ${pixelToRem(calendarConfig.timeSlotHeight)};
    border-bottom: 1px solid #ddd;
    background-color: ${(props) =>
        props.workTime ? calendarColors.workTime : calendarColors.outOfWork};
`;
