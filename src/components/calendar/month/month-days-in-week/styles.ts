import styled from 'styled-components';

interface Props {
    isToday: boolean;
    color: string;
}

export const MonthDayWrapper = styled.div`
    flex: 1;
    width: 50px;
    min-height: 100px;
    padding: 0;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 130px;
`;

export const DayNumberContainer = styled.span<Props>`
    font-weight: bold;
    border-bottom-right-radius: 4px;
    padding: 5px;
    font-size: 13px;
    background-color: ${(props) =>
        props.isToday ? props.color : 'transparent'};
    color: ${(props) => (props.isToday ? '#fff' : '')};
`;
