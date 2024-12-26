import styled from 'styled-components';
import { commonSize } from 'calendar/_config/basicConfig';
import { calendarColors, color } from 'style/color';
import { pixelToRem } from 'utils/common';
import { TimeSlotOffset } from 'week/time-column/styles';

interface Props {
    workTime?: boolean;
    timSlotsCount?: number;
    isFullHour?: boolean;
    intervalIndex?: number;
    isFirstRow?: boolean;
    isLastRow?: boolean;
}

const calcColumnHeight = (props: Props): string => {
    let offset = 0;
    let slotHeight = commonSize.timeSlotHeight;
    switch (props.intervalIndex) {
        case 0:
            offset = 24;
            break;
        case 1:
            offset = props.intervalIndex! * 24 + 24;
            slotHeight = commonSize.timeSlotHeight - props.intervalIndex! * 10;
            break;
        case 2:
            offset = props.intervalIndex! * 36 + 24;
            slotHeight = commonSize.timeSlotHeight - props.intervalIndex! * 10;
            break;
        case 3:
            offset = props.intervalIndex! * 40 + 24;
            slotHeight = 20;
            break;
        case 4:
            offset = props.intervalIndex! * 66 + 24;
            slotHeight = 20;
            break;
        default:
            offset = 0;
            break;
    }

    const height = props.timSlotsCount! * slotHeight + offset;
    return `${height}px`;
};

const calcTimeSlotHeight = (props: Props): string => {
    const offset = props.intervalIndex! * TimeSlotOffset;
    return pixelToRem(commonSize.timeSlotHeight - offset);
};

const calcBorder = (props: Props): string => {
    const color = props.isFullHour ? '#ddd' : '#f0f0f0';
    return !props.isFirstRow ? `1px solid ${color}` : 'none';
};

const calcBorderBottom = (props: Props): string => {
    return props.isLastRow ? `1px solid #ddd` : 'none';
};

export const DaysColumnsContainer = styled.div<Props>`
    flex: 1;
    position: relative;
    border-left: 1px solid ${color.border};
    height: ${calcColumnHeight};
`;

export const TimeSlotWrapper = styled.div<Props>`
    height: ${calcTimeSlotHeight};
    min-height: ${pixelToRem(20)};
    border-top: ${calcBorder};
    border-bottom: ${calcBorderBottom};
    background-color: ${(props) =>
        props.workTime ? calendarColors.workTime : calendarColors.outOfWork};
    &:hover {
        background-color: ${color.hover};
        cursor: pointer;
    }
`;
