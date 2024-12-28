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

const calcTimeSlotHeight = (props: Props): string => {
    const offset = props.intervalIndex! * TimeSlotOffset;
    return pixelToRem(commonSize.timeSlotHeight - offset);
};

const calcBorder = (props: Props): string => {
    const currColor = props.isFullHour ? '#ddd' : '#f0f0f0';
    return !props.isFirstRow ? `1px solid ${currColor}` : 'none';
};

const calcBorderBottom = (props: Props): string => {
    return props.isLastRow ? `1px solid #ddd` : 'none';
};

export const AppointmentWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #90caf9;
    color: #fff;
    border-radius: 4px;
    padding: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    z-index: 1;
`;

export const DroppableSlotWrapper = styled.div<Props>`
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
