import styled from 'styled-components';
import { color } from 'style/color';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    isToday: boolean;
    color: string;
}

export const MonthDayWrapper = styled.div`
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
