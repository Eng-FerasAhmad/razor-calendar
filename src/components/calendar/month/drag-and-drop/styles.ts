import styled from 'styled-components';
import { color } from 'style/color';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    color: string;
    isToday?: boolean;
}

export const DraggableEventContainer = styled.div<Props>`
    font-size: 10px;
    white-space: nowrap;
    height: 24px;
    margin: 1px 0;
    padding: 1px 3px 1px 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    cursor: grab;
    user-select: none;
    border-radius: 3px;

    &:hover {
        cursor: pointer;
        background-color: ${color.hover};
    }

    &:active {
        cursor: grabbing;
    }
`;

export const PointWrapper = styled.span<Props>`
    height: 7px;
    width: 7px;
    min-height: 7px;
    min-width: 7px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
`;

export const EventTitleWrapper = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    width: auto;
`;

// droppable:
export const DroppableDayContainer = styled.div`
    flex: 1;
    min-width: 50px;
    min-height: 100px;
    padding: 0;
    border-left: 1px solid ${color.border};
    border-bottom: 1px solid ${color.border};
    height: 130px;
`;

export const DayNumberContainer = styled.div<Props>`
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;

export const DayNumberButtonContainer = styled.div<Props>`
    border-radius: 50%;
    padding: 5px;
    font-size: 12px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: ${(props) =>
        props.isToday ? props.color : 'transparent'};
    color: ${(props) => (props.isToday ? '#fff' : '')};

    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.isToday ? darkenColor(props.color, 30) : color.hover};
    }
`;
