import styled from 'styled-components';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    isToday: boolean;
    color: string;
}

export const MonthDayWrapper = styled.div`
    flex: 1;
    width: 50px;
    min-height: 100px;
    padding: 0;
    border-left: 1px solid #dde3ea;
    border-bottom: 1px solid #dde3ea;
    height: 130px;
`;

export const DayNumberContainer = styled.div<Props>`
    font-weight: bold;
    border-bottom-right-radius: 4px;
    padding: 5px;
    font-size: 13px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: ${(props) =>
        props.isToday ? props.color : 'transparent'};
    color: ${(props) => (props.isToday ? '#fff' : '')};

    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.isToday ? darkenColor(props.color, 30) : '#e0e0e0'};
    }
`;
